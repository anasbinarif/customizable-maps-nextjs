import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles(() => ({
    box: {
        minHeight: '40rem',
        width: '27rem',
        position: 'relative',
        perspective: '150rem',
        cursor: 'pointer',

        '&.selected': {
            '& .tab__side--back': {
                transform: 'rotateY(0)',
            },

            '& .tab__side--front': {
                transform: 'rotateY(-180deg)',
            },
        },

        '& .tab__side': {
            textAlign: 'left',
            height: '100%',
            width: '100%',
            transition: 'all 0.8s ease',
            position: 'absolute',
            top: 0,
            left: 0,
            backfaceVisibility: 'hidden',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.15)',

            '&--front': {
                backdropFilter: 'blur(30px)',
            },

            '&--back': {
                transform: 'rotateY(180deg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                '&-1': {
                    backgroundImage:
                        'linear-gradient(to right bottom, #7ed56f, #28b485)',
                },
                '&-2': {
                    backgroundImage:
                        'linear-gradient(to right bottom, #2998ff, #5643fa)',
                },
                '&-3': {
                    backgroundImage:
                        'linear-gradient(to right bottom, #ffb900, #ff7730)',
                },
            },
        },

        '& .tab__picture': {
            backgroundSize: 'cover',
            height: '12rem',
            backgroundBlendMode: 'screen',
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            borderRadius: '3px 3px 0 0',

            '&--1': {
                backgroundImage:
                    'linear-gradient(to right bottom, #7ed56f, #28b485),url(/img/home_map7.jpg)',
            },
            '&--2': {
                backgroundImage:
                    'linear-gradient(to right bottom, #2998ff, #5643fa),url(/img/home_map6.jpg)',
            },
            '&--3': {
                backgroundImage:
                    'linear-gradient(to right bottom, #ffb900, #ff7730),url(/img/home_map5.jpg)',
            },
        },

        '& .MuiTypography-root.heading': {
            fontSize: '1.5rem',
            fontWeight: 300,
            textTransform: 'uppercase',
            textAlign: 'right',
            color: '#fff',
            position: 'absolute',
            top: '8rem',
            right: '0rem',
            width: '75%',

            '& .heading--span': {
                padding: '1rem 1.5rem',
                '&-1': {
                    backgroundImage:
                        'linear-gradient(to right bottom, rgba(126, 213, 111, 0.85), rgba(40, 180, 133, 0.85))',
                },
                '&-2': {
                    backgroundImage:
                        'linear-gradient(to right bottom, rgba(41, 152, 255, 0.85), rgba(86, 67, 250, 0.85))',
                },
                '&-3': {
                    backgroundImage:
                        'linear-gradient(to right bottom, rgba(255,185,0,0.85), rgba(255,119,48,0.85))',
                },
            },
        },

        '& .tab__cta': {
            textAlign: 'center',
            color: '#fff',
            marginBottom: '4rem',

            '& .tab__price': {
                fontSize: '1rem',
                textTransform: 'uppercase',
            },

            '& .tab__value': {
                fontSize: '1rem',
                fontWeight: '100',
            },
        },
    },
}));
