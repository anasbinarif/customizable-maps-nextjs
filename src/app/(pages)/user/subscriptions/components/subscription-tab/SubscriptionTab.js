'use client';

import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, List, Typography } from '@mui/material';
import React from 'react';

import { useStyles } from '../carouser-section/CarouselSection.style';
import SubscribeButtons from '../subscribe-buttons/SubscribeButtons';
// import SubscriptionDurationOptions from '../subscription-duration-options/SubscriptionDurationOptions';

const SubscriptionTab = ({ pkg, index, color }) => {
  // const [duration, setDuration] = useState(false);
  const classes = useStyles();

  // console.log(pkg);

  return (
    <Box className={classes.box}>
      <div
        className="tab__side tab__side--front"
        style={{ position: 'relative' }}
      >
        <div className={`tab__picture tab__picture--${index + 1}`}></div>
        <Typography className="heading">
          <span className={`heading--span heading--span-${index + 1}`}>
            {pkg.name}
          </span>
        </Typography>

        <Box sx={{ marginBottom: '8px' }}>
          {/* <Typography
            sx={{
              color: 'primary.text1',
              fontSize: '1.2rem',
              textAlign: 'center',
              transform: 'translateY(10px)',
            }}
          >
            FROM
          </Typography> */}
          <Typography
            sx={{
              fontSize: '2rem',
              textAlign: 'center',
              fontWeight: '900',
            }}
          >
            {pkg.price}
          </Typography>
          <Typography
            sx={{
              color: 'primary.text1',
              fontSize: '1.5rem',
              textAlign: 'center',
            }}
          >
            {pkg.duration}
          </Typography>
        </Box>
        {pkg.name === 'Pro' && <SubscribeButtons pkgId={pkg.id} />}

        <Box
          sx={{
            marginTop: 'auto',
            marginBottom: '1rem',
          }}
        >
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',

              '& li': {
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '1.5rem',
                padding: '1rem',

                '&:not(:last-child)': {
                  borderBottom: '1px solid #eee',
                },
              },
              margin: '0 2rem',
              width: '100%',
              // height: '100%',
              justifyContent: 'center',
            }}
          >
            {pkg?.features &&
              pkg.features.map((item) => {
                const isDisabled = item.includes('(disabled)');

                return (
                  <Box
                    key={item}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      // justifyContent: 'center',
                      padding: '2px 0',
                    }}
                  >
                    <FontAwesomeIcon
                      icon={isDisabled ? faTimesCircle : faCheckCircle}
                      style={{
                        color: isDisabled ? '#ff4d4f' : color,
                        marginRight: '1rem',
                        transform: 'translateY(2px)',
                      }}
                    />
                    <Typography sx={{ textAlign: 'left' }}>
                      {item.replace(' (disabled)', '')}
                    </Typography>
                  </Box>
                );
              })}
          </List>
        </Box>

        {/* {pkg.durationOptions && (
          <SubscriptionDurationOptions
            duration={duration}
            durationOptions={pkg.durationOptions}
            setDuration={setDuration}
          />
        )} */}
      </div>
    </Box>
  );
};

export default SubscriptionTab;
