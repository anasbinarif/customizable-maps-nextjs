import Hero from "@/components/Hero";
import {Box} from "@mui/material";

export default function Home() {
    return (<>
        <Box
            sx={{
                backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem 0',
            }}
        >
            <Hero />
        </Box>
        </>
    );
}
