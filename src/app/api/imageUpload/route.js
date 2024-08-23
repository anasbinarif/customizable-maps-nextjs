import { PrismaClient } from '@prisma/client';
import {uploadImageToS3} from "@/lib/aws-s3";
import uploadMiddleware from "@/lib/middleware";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error' });
        }

        try {
            const { mapId, pinName } = req.body;
            const files = req.files; // Assuming you're using middleware like multer to handle multipart form-data

            const savedImages = await Promise.all(
                files.map(async (file) => {
                    const imageUrl = await uploadImageToS3(file);
                    const newLocation = await prisma.location.create({
                        data: {
                            mapId: parseInt(mapId, 10),
                            name: pinName,
                            latitude: 0, // Replace with actual latitude
                            longitude: 0, // Replace with actual longitude
                            pinImageUrl: imageUrl,
                        },
                    });
                    return { url: imageUrl, locationId: newLocation.id };
                })
            );

            res.status(200).json({ message: 'Images uploaded successfully', savedImages });
        } catch (error) {
            console.error('Error uploading images:', error);
            res.status(500).json({ message: 'Error uploading images' });
        }
    });
}
