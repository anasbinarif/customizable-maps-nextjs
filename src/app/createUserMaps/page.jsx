import {Box} from "@mui/material";
import CreateGoogleMap from "@/app/createUserMaps/components/CreateGoogleMap";

export default function ListMaps() {
    return (<>
        <Box
            sx={{
                backgroundImage: "linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '1rem 2rem',
            }}
        >
            <CreateGoogleMap />
        </Box>
    </>
    );
}
