import { Link } from "react-router-dom"
import { ArrowRight, Leaf, Cloud, Calculator, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {

    const features = [
        {
            title: "Disease Detection",
            description: "AI-powered plant disease detection with 99% accuracy",
            icon: Leaf,
        },
        {
            title: "Weather Insights",
            description: "Real-time weather data for optimal farming decisions",
            icon: Cloud,
        },
        {
            title: "Fertilizer Calculator",
            description: "Precise fertilizer recommendations for your crops",
            icon: Calculator,
        },
        {
            title: "Agricultural Shop",
            description: "One-stop shop for all your farming needs",
            icon: ShoppingCart,
        },
    ]

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center md:gap-10 py-12 md:py-16 xl:px-0 px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                        Smart Agriculture Solutions
                    </div>
                    <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
                        Grow Smarter, <br className="hidden sm:inline" />
                        Harvest Better
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Revolutionize your farming with AI-powered disease detection, smart recommendations, and precision
                        agriculture tools. Your complete farming companion.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link to="/detect">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link to="/contact">Learn More</Link>
                    </Button>
                </div>

            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 mb-7 xl:px-2 px-4">
                {features.map((feature) => (
                    <div key={feature.title} className="group relative rounded-lg border sm:p-6 p-4 hover:shadow-md transition-shadow">
                        <div className="flex h-10 w-10 items-center justify-center mx-auto rounded-lg bg-primary/10 group-hover:bg-primary/20">
                            <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold text-center">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground text-center">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

