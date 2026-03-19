import { BookingSection } from "@/components/sections/BookingSection";
import { DoctorSection } from "@/components/sections/DoctorSection";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DoctorSection />
        <ServicesSection />
        <TrustSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
