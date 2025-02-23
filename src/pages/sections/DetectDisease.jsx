import { useState, useRef, useEffect } from "react"
import { Camera, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function DetectPage() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [diseasePrediction, setDiseasePrediction] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isCameraActive, setIsCameraActive] = useState(false)
    const videoRef = useRef(null)
    const fileInputRef = useRef(null)

    // Handle file upload
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
            } else {
                toast.error("Please upload an image file")
            }
        }
        // Reset file input value to allow selecting the same file again
        event.target.value = ''
    }

    // Handle drag and drop
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
            // Reset file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } else {
            toast.error("Please drop an image file")
        }
    }

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                setIsCameraActive(true)
            }
        } catch (error) {
            toast.error("Unable to access camera")
            console.error(error)
        }
    }

    const stopCamera = () => {
        if (videoRef.current?.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks()
            tracks.forEach((track) => track.stop())
            videoRef.current.srcObject = null
            setIsCameraActive(false)
        }
    }

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement("canvas")
            const video = videoRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageDataUrl = canvas.toDataURL("image/jpeg")
                setSelectedImage(imageDataUrl)
                stopCamera()
            }
        }
    }

    const detectDisease = async () => {
        if (!selectedImage) return

        setIsLoading(true)
        try {
            // TODO: Implement actual disease detection API call
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
            toast.success("Disease detection completed!")
        } catch (error) {
            toast.error("Error detecting disease")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Clean up camera stream when component unmounts
    useEffect(() => {
        return () => {
            if (isCameraActive) {
                stopCamera()
            }
        }
    }, [isCameraActive])

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
                        <div className="relative min-h-[200px] rounded-lg border-2 border-dashed">
                            {isCameraActive ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="h-[200px] w-full rounded-lg object-cover"
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
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="relative">
                            <CardTitle>Selected Image</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-3 -top-3"
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
                        <Card>
                            <CardHeader className="relative">
                                <CardTitle>Results</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-3 -top-3"
                                    onClick={() => setDiseasePrediction(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent></CardContent>
                        </Card>
                    )}
                </div>
            )}
        </div>
    )
}