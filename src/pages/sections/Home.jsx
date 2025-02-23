import React from 'react'
import HeroSection from '../../components/basic/HeroSection'
import HowItWorks from '../../components/basic/HowItWorks'
import DiseasePreview from '../../components/basic/DiseaseSection'

const Home = () => {
    return (
        <main>
            <HeroSection />
            <HowItWorks />
            <DiseasePreview />
        </main>
    )
}

export default Home