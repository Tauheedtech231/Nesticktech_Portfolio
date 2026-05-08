import React from 'react'

import Hero from './src/portfolio/components/Hero'
import Services from './src/portfolio/components/Services'

import TestimonialsSlider from './src/portfolio/components/Testimonials'
import FAQ from './src/portfolio/components/FAQ'

import IndustriesSection from './src/portfolio/components/IndustriesSection'
import PartnersSlider from './src/portfolio/components/ProductsSlider'
import ProductsPage from './src/portfolio/components/Products'


function page() {
  return (
    <div>
    
      
      <Hero/>
      <PartnersSlider/>
      
      <Services/>
      <IndustriesSection/>
     <ProductsPage/>
      
      <TestimonialsSlider/>
      {/* <WhyChooseUs/> */}
      <FAQ/>


      
    </div>
  )
}

export default page
