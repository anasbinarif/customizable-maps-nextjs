export const packages = [
  {
    id: 1,
    name: 'Basic',
    features: [
      'Create & Edit a Map',
      'Export Map PDF',
      'Create & Edit Multiple Maps (disabled)',
      'Upload Thumbnails (disabled)',
      'Upload Company Logo (disabled)',
      'Use Text editor (disabled)',
      'Collaborate with a Team (disabled)',
    ],
    price: 'Free',
    durationOptions: [],
  },
  {
    id: 2,
    name: 'Pro',
    features: [
      'Create & Edit a Map',
      'Export Map PDF',
      'Create & Edit Multiple Maps',
      'Upload Thumbnails',
      'Upload Company Logo',
      'Use Text editor',
      'Collaborate with a Team (disabled)',
    ],
    price: '$5 / month',
    durationOptions: [
      { duration: 'Monthly', additionalCost: 0 },
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    features: [
      'Create & Edit a Map',
      'Export Map PDF',
      'Create & Edit Multiple Maps',
      'Upload Thumbnails',
      'Upload Company Logo',
      'Use Text editor',
      'Collaborate with a Team',
    ],
    price: 'Coming Soon',
    durationOptions: [],
  },
];
