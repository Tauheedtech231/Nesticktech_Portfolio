"use client";

import Hero from "./src/portfolio/components/Hero";
import Services from "./src/portfolio/components/Services";
import TestimonialsSlider from "./src/portfolio/components/Testimonials";
import FAQ from "./src/portfolio/components/FAQ";
import PartnersSlider from "./src/portfolio/components/ProductsSlider";
import Home from "./src/portfolio/components/IndustriesSection";
import ProjectsSection from "./src/portfolio/components/Products";
import CinematicLoader from "./src/portfolio/components/CinematicLoader";

function Page() {
  return (
    <CinematicLoader>
      <main className="relative w-full overflow-hidden bg-black">
        <Hero />

        <div className="relative z-10">
          <PartnersSlider />
          <Services />
          <Home />
          <ProjectsSection />
          <TestimonialsSlider />
          <FAQ />
        </div>
      </main>
    </CinematicLoader>
  );
}

export default Page;