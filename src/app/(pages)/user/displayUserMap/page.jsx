import {Box} from "@mui/material";
import DiaplayUserMaps from "./components/DiaplayUserMaps";

export default function displayUserMap() {
    return (<>
                <Box
                    sx={{
                        backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        padding: '1rem 2rem',
                    }}
                >
                    <DiaplayUserMaps />
                </Box>
        </>
    );
}
