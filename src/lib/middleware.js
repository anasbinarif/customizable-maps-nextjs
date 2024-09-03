// lib/middleware/upload.js

import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const uploadMiddleware = upload.array('files');

export default uploadMiddleware;
