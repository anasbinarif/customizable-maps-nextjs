import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Box, List, Typography} from '@mui/material';
import React from 'react';

const SubscriptionDurationOptions = ({setDuration, duration, durationOptions }) => (
    <Box
        sx={{
            borderTop: '1px solid #00000020',
            margin: '0 2rem',
            padding: '2rem 0 1rem',
        }}
    >
        <Typography
            onClick={() => setDuration(!duration)}
            sx={{
                fontSize: '1.5rem',
                textAlign: 'center',
                fontWeight: '900',
            }}
        >
            Extra options
            {duration ? (
                <FontAwesomeIcon
                    icon={faChevronUp}
                    style={{ marginLeft: '6px' }}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: '6px' }}
                />
            )}
        </Typography>
        {duration && (
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

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
                    padding: '8px 0',
                    margin: '0',
                    width: '100%',
                }}
            >
                {durationOptions && durationOptions?.map((item) => (
                    <Box
                        key={item.duration}
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: '',
                            padding: '4px 0',
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: 'left',
                                textWrap: 'nowrap',
                            }}
                        >
                            {item.duration}
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: 'right',
                                width: '100%',
                                fontWeight: 'bold',
                                color: 'primary.accent',
                            }}
                        >
                            {item.additionalCost === 0 ? '' : `+ `}€{' '}
                            {item.additionalCost.toFixed(1)}
                        </Typography>
                    </Box>
                ))}
            </List>
        )}
    </Box>
);

export default SubscriptionDurationOptions;