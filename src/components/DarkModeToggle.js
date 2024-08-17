import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function DarkModeToggle() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <IconButton
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                backgroundColor: (theme) => theme.palette.background.paper,
            }}
            onClick={toggleTheme}
        >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}
