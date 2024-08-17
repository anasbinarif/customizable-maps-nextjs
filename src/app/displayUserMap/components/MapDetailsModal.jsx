import { Modal, Box, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};

const MapDetailsModal = ({ open, onClose, map }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container justifyContent="space-between">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {map.title}
                    </Typography>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Pin Location: {map.pinName} ({map.pinLatitude}, {map.pinLongitude})
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                    Number of Locations: {map.locations.length}
                </Typography>
                <List sx={{ mt: 2 }}>
                    {map.locations.map((loc) => (
                        <ListItem key={loc.id}>
                            <ListItemText primary={`${loc.name} - ${loc.tag}`} secondary={`Lat: ${loc.latitude}, Lng: ${loc.longitude}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    );
};

export default MapDetailsModal;
