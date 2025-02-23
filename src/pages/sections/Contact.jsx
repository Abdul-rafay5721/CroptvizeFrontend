import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "sonner"

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate form submission
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Message sent successfully!")
            // Reset form
            const form = e.target
            form.reset()
        } catch (error) {
            toast.error("Failed to send message")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-2 py-8 md:py-12">
            <div className="mx-auto max-w-[58rem] text-center">
                <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have questions? We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.
                </p>
            </div>

            <div className="mx-auto mt-8 grid max-w-6xl gap-6 md:grid-cols-2 lg:gap-12">
                {/* Contact Information */}
                <div className="space-y-6">
                    <div className="grid gap-6">
                        {contactInfo.map((item) => (
                            <Card key={item.title}>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <item.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle>{item.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{item.details}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Social Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Follow Us</CardTitle>
                            <CardDescription>Stay connected on social media</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-lg bg-primary/10 p-2 transition-colors hover:bg-primary/20"
                                    >
                                        <social.icon className="h-5 w-5 text-primary" />
                                        <span className="sr-only">{social.name}</span>
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible>
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`faq-${index}`}>
                                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>
                                Fill out the form below and we&apos;ll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">
                                            Name
                                        </label>
                                        <Input id="name" placeholder="Enter your name" required disabled={isLoading} />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input id="email" type="email" placeholder="Enter your email" required disabled={isLoading} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">
                                        Subject
                                    </label>
                                    <Input id="subject" placeholder="Enter subject" required disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <Textarea id="message" placeholder="Enter your message" required disabled={isLoading} rows={6} />
                                </div>
                                <Button className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Map */}
                    <Card className="mt-6 p-0">
                        <CardContent className="py-0 px-0">
                            <div className="w-full overflow-hidden rounded-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3325395304414!2d-122.01116148467422!3d37.33463524513264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb59127ce078f%3A0x18e1c3ce7becf1b!2sApple%20Park!5e0!3m2!1sen!2sin!4v1637309850935!5m2!1sen!2sin"
                                    width="100%"
                                    height="330"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const contactInfo = [
    {
        icon: MapPin,
        title: "Our Location",
        details: "123 Agriculture Street, Farmington, FA 12345",
    },
    {
        icon: Phone,
        title: "Phone",
        details: "+1 (234) 567-8900\n+1 (234) 567-8901",
    },
    {
        icon: Mail,
        title: "Email",
        details: "support@croptivize.com\ninfo@croptivize.com",
    },
    {
        icon: Clock,
        title: "Working Hours",
        details: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM",
    },
]

const socialLinks = [
    {
        name: "Facebook",
        url: "https://facebook.com",
        icon: Facebook,
    },
    {
        name: "Twitter",
        url: "https://twitter.com",
        icon: Twitter,
    },
    {
        name: "Instagram",
        url: "https://instagram.com",
        icon: Instagram,
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com",
        icon: Linkedin,
    },
]

const faqs = [
    {
        question: "How accurate is the disease detection?",
        answer:
            "Our AI-powered disease detection system has an accuracy rate of over 95% for most common plant diseases. The system is continuously learning and improving.",
    },
    {
        question: "What types of plants can be diagnosed?",
        answer:
            "We support a wide range of crops and plants including wheat, rice, corn, tomatoes, potatoes, and many more. Our database is constantly expanding.",
    },
    {
        question: "How long does it take to get results?",
        answer:
            "Disease detection results are typically available within seconds of uploading an image. Detailed recommendations follow shortly after.",
    },
    {
        question: "Do you offer technical support?",
        answer:
            "Yes, we provide technical support via email and phone during business hours. Premium users get access to 24/7 priority support.",
    },
]

