"use client"
import Navbar from "@/components/Navbar";
import {Box} from "@mui/material";
import {SessionProvider} from "next-auth/react";
import Footer from "@/components/Footer";
import CreateGoogleMap from "./DisplayAndCreateMaps/CreateGoogleMap";

export default function ListMaps() {
    return (<>
    <SessionProvider>
        <Box
            sx={{
                backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem 2rem',
            }}
        >
            <Box sx={{ marginBottom: '2rem' }}>
                    <Navbar />
            </Box>
            <CreateGoogleMap />
        </Box>
    </SessionProvider>
        <Footer />
    </>
    );
}
