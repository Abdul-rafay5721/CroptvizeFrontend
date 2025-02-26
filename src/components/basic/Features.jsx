import React from 'react'
import { Leaf, Cloud, Calculator, ShoppingCart } from 'lucide-react'

const Features = () => {

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
        <div className='w-full'>
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 mb-3 xl:px-2 px-4">
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

export default Features