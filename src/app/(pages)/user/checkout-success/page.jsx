'use client';

import { Box, Typography } from '@mui/material';
import {useRouter} from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function CheckoutSuccess() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      handleLogout();
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        🎉 Congratulations!
      </Typography>
      <Typography variant="h6" gutterBottom>
        You have successfully purchased a subscription.
      </Typography>
      <Typography variant="body1" gutterBottom>
        You will be signed out in {countdown} seconds.
      </Typography>
    </Box>
  );
}
