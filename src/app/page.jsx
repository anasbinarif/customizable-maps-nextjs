import {Box} from '@mui/material';

import CarouselSection from '@/components/CarouselSection';
import CTA from '@/components/CTA';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';

export default function Home() {
    return (
        <>
            {/* <Navbar /> */}
            <Box
                sx={{
                    // backgroundImage: "primary.pageBg",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '1rem 0',
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
