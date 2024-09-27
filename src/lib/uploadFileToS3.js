import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadFileToS3 = async (file) => {

    const fileType = file.type;
    const fileName = `${uuidv4()}.${fileType.split('/')[1]}`;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: fileName,
        ContentType: fileType,
    };

    try {
        const command = new PutObjectCommand(params);
        const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': fileType,
            },
            body: file,
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload file to S3');
        }

        // Return the file URL
        return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw new Error('Error uploading file to S3');
    }
};
