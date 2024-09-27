import {NextResponse} from 'next/server';

import {uploadImageToS3} from '@/lib/aws-s3';
import uploadMiddleware from '@/lib/middleware';
import prisma from '@/lib/prisma';

export async function POST(req) {
  return new Promise((resolve) => {
    uploadMiddleware(req, {}, async (err) => {
      if (err) {
        resolve(
          NextResponse.json(
            { message: 'File upload error' },
            { status: 500 }
          )
        );

        return;
      }

      try {
        const { mapId, pinName } = req.body;
        const files = req.files;

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

        resolve(
          NextResponse.json(
            { message: 'Images uploaded successfully', savedImages },
            { status: 200 }
          )
        );
      } catch (error) {
        resolve(
          NextResponse.json(
            { message: 'Error uploading images' },
            { status: 500 }
          )
        );
      }
    });
  });
}
