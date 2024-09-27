import {TextField} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '16px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        backgroundColor: '#FFFFFF',
        '& fieldset': {
            border: 'none',
        },
        '&:hover fieldset': {
            //   border: "none",
        },
        '&.Mui-focused fieldset': {
            // boxShadow:
            //   "rgba(0, 0, 0, 0.1) 3px 4px 12px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            //   border: "none",
        },
    },
    '& .MuiInputLabel-root': {
        color: '#6D6D6D',
    },
    '& .MuiInputLabel-shrink': {
        color: theme.palette.primary.main,
    },
    '& .MuiFormHelperText-root': {
        marginTop: '4px',
        color: theme.palette.error.main,
    },
    '& .MuiInputBase-input': {
        padding: '16px',
        color: '#000000',
    },
}));
