import React from 'react'

import Hero from './src/portfolio/components/Hero'
import Services from './src/portfolio/components/Services'

import TestimonialsSlider from './src/portfolio/components/Testimonials'
import FAQ from './src/portfolio/components/FAQ'


import PartnersSlider from './src/portfolio/components/ProductsSlider'
// import ProductsPage from './src/portfolio/components/Products'
import Home from './src/portfolio/components/IndustriesSection'
import ProjectsSection from './src/portfolio/components/Products'
// import PuzzleIndustries from './src/portfolio/components/IndustriesSection'


function page() {
  return (
    <div>
    
      
      <Hero/>
      <PartnersSlider/>
      
      <Services/>
      <Home/>
     <ProjectsSection/>
      
      <TestimonialsSlider/>
      {/* <WhyChooseUs/> */}
      <FAQ/>


      
    </div>
  )
}

export default page
