// lib/middleware/upload.js

import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory temporarily

const upload = multer({ storage: storage });

const uploadMiddleware = upload.array('files'); // Change 'files' to your form field name if different

export default uploadMiddleware;
