import {useContext} from 'react';

import {SnackbarContext} from './SnackBarContext';

const useCustomSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackBarProvider');
  }

  return context;
};

export default useCustomSnackbar;
