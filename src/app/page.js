import Hero from "@/components/Hero";
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
      </Box>
      {/* <Footer /> */}
    </>
  );
}
