import { useState, useRef, useEffect } from "react"
import { Camera, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import DiseaseResult from "../../components/basic/DiseaseResult"

export default function DetectPage() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [diseasePrediction, setDiseasePrediction] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [cameraStream, setCameraStream] = useState(null)
    const videoRef = useRef(null)
    const fileInputRef = useRef(null)
    const containerRef = useRef(null)

    const scrollIntoView = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleFileUpload = (event) => {
        event.preventDefault()
        const file = event.target.files?.[0]
        if (file) {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader()
                reader.onload = () => {
                    setSelectedImage(reader.result)
                }
                reader.readAsDataURL(file)
                scrollIntoView("imgContainer")
            } else {
                toast.error("Please upload an image file")
            }
        }
        event.target.value = ''
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()
            reader.onload = () => {
                setSelectedImage(reader.result)
            }
            reader.readAsDataURL(file)
            scrollIntoView("imgContainer")
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } else {
            toast.error("Please drop an image file")
        }
    }

    const startCamera = async () => {
        try {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop())
            }

            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            })

            setCameraStream(stream)
            setIsCameraActive(true)

        } catch (error) {
            console.error("Camera access error:", error)
            toast.error("Unable to access camera: " + error.message)
            setIsCameraActive(false)
        }
    }

    useEffect(() => {
        if (isCameraActive && cameraStream && videoRef.current) {
            console.log("Attaching stream to video element")
            videoRef.current.srcObject = cameraStream

            videoRef.current.onloadedmetadata = () => {
                console.log("Video metadata loaded")
                videoRef.current.play().catch(e => {
                    console.error("Error playing video:", e)
                    toast.error("Error playing video: " + e.message)
                })
            }

            videoRef.current.onerror = (e) => {
                console.error("Video error:", e)
                toast.error("Video error: " + e.target.error.message)
            }
        }
    }, [isCameraActive, cameraStream])

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => {
                track.stop()
            })
            setCameraStream(null)
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
        setIsCameraActive(false)
    }

    const captureImage = () => {
        if (videoRef.current) {
            try {
                const canvas = document.createElement("canvas")
                const video = videoRef.current

                if (video.videoWidth === 0 || video.videoHeight === 0) {
                    toast.error("Cannot capture image - video stream not ready")
                    return
                }

                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                const ctx = canvas.getContext("2d")
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                    const imageDataUrl = canvas.toDataURL("image/jpeg")
                    setSelectedImage(imageDataUrl)
                    scrollIntoView("imgContainer")
                    stopCamera()
                } else {
                    toast.error("Could not get canvas context")
                }
            } catch (error) {
                console.error("Error capturing image:", error)
                toast.error("Error capturing image: " + error.message)
            }
        } else {
            toast.error("Video element not available")
        }
    }

    const detectDisease = async () => {
        if (!selectedImage) return

        setIsLoading(true)
        try {
            const apiKey = 'jlCCUReGnuhSYJeGy6dOPFtv35YxYfg4xev0XdpRRbF7Smeo7I'
            const response = await fetch('https://plant.id/api/v3/health_assessment?details=description,treatment,cause', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Key': apiKey
                },
                body: JSON.stringify({
                    images: [selectedImage]
                })
            })

            if (!response.ok) {
                toast.error("Error detecting disease")
                console.error("Error response:", response)
                return
            }

            const data = await response.json()
            console.log(data)

            if (data.result.is_plant.binary === false) {
                toast.error("No plant detected in the image")
                return
            }
            setDiseasePrediction(data.result.disease.suggestions)

            toast.success("Disease detection completed!")
            scrollIntoView("results")
        } catch (error) {
            toast.error("Error detecting disease")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop())
            }
        }
    }, [cameraStream])

    return (
        <div className="max-w-4xl mx-auto lg:px-0 px-4 py-8 md:py-12">
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold md:text-4xl">Plant Disease Detection</h1>
                <p className="mt-4 text-lg text-muted-foreground">Upload a photo or use your camera to detect plant diseases</p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Upload Option */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Image</CardTitle>
                        <CardDescription>Drag and drop an image or click to upload</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div
                            className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 hover:bg-muted/50"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Drag and drop your image here or click to browse</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Camera Option */}
                <Card>
                    <CardHeader>
                        <CardTitle>Use Camera</CardTitle>
                        <CardDescription>Take a photo using your device camera</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative min-h-[200px] rounded-lg border-2 border-dashed" ref={containerRef}>
                            {isCameraActive ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className="h-[200px] w-full rounded-lg object-cover"
                                        style={{ maxHeight: "200px" }}
                                    />
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                        <Button onClick={captureImage}>Capture</Button>
                                        <Button variant="outline" onClick={stopCamera}>
                                            Cancel
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div
                                    className="flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center p-4"
                                    onClick={startCamera}
                                >
                                    <Camera className="mb-4 h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Click to activate camera</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Image Preview and Detection */}
            {selectedImage && (
                <div className="mt-8 grid gap-6 md:grid-cols-2" id="imgContainer">
                    <Card>
                        <CardHeader className="relative">
                            <CardTitle>Selected Image</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-3 sm:-top-3 -top-2"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={selectedImage}
                                    alt="Selected plant"
                                    className="object-cover h-72 w-full"
                                />
                            </div>
                            <Button className="mt-4 w-full" onClick={detectDisease} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Detecting...
                                    </>
                                ) : (
                                    "Detect Disease"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Disease Prediction */}
                    {diseasePrediction && (
                        <DiseaseResult
                            diseases={diseasePrediction}
                            onClose={() => setDiseasePrediction(null)}
                        />
                    )}
                </div>
            )}
        </div>
    )
}