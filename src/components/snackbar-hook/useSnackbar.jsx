import {useContext} from 'react';

import {SnackbarContext} from './SnackBarContext';

const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackBarProvider');
    }
    return context;
};

export default useSnackbar;
