export const metadata = {
  title: "Landaeta Studio | Ads y Analítica para eCommerce",
  description: "Mejroamos performance en Meta/Google Ads y transformamos datos en decisiones con tracking, dahsboards y optimización de embudos de venta para eCommerce.",
};

import HeroHome from "@/components/hero-home";
import BusinessCategories from "@/components/business-categories";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";
import Cta from "@/components/cta";
import Process from "@/components/process";
import Cases from "@/components/cases";
import Contact from "@/components/contact";
import About from "@/components/about"; 

export default function Home() {
  return (
    <>
      <HeroHome />
      <BusinessCategories />
      <Process />
      <FeaturesPlanet />
      <Cases />
      <About />        
      <LargeTestimonial />
      <Contact />
      <Cta />
    </>
  );
}
