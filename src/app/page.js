import Hero from "@/components/Hero";
import CarouselSection from "@/components/CarouselSection";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import { Box } from "@mui/material";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Box
        sx={{
          // backgroundImage: "primary.pageBg",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "1rem 0",
        }}
      >
        <Hero />
        <CarouselSection />
        <Testimonials />
        <CTA />
      </Box>
      {/* <Footer /> */}
    </>
  );
}
