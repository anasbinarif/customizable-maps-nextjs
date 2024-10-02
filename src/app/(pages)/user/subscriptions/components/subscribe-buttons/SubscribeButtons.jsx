import {Box, Button} from '@mui/material';
import {loadStripe} from '@stripe/stripe-js';
import {useSession} from 'next-auth/react';
import React, {useState} from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import useCustomSnackbar from '@/components/snackbar-hook/useCustomSnackbar';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const SubscribeButtons = ({pkgId}) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { openSnackbar } = useCustomSnackbar();

  const handleCheckout = async () => {
    setLoading(true);
    const userEmail = session?.user.email;
    const userId = session?.user.id;

    if (!userId) {
      openSnackbar(`Kindly login or signup`);
      setLoading(false);

      return null;
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          userId: userId,
          userEmail: userEmail,
        }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        openSnackbar(`Error creating Stripe checkout session: ${error}`);
      }
    } catch (error) {
      openSnackbar(`Error creating Stripe checkout session: ${error.message}`);
    }

    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="contained"
        disabled={pkgId !== 5}
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '20px',
        }}
        onClick={handleCheckout}
      >
              Subscribe
      </Button>
    </Box>
  );
};

export default SubscribeButtons;