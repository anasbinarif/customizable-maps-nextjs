import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {v4 as uuidv4} from 'uuid';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export const uploadImageToS3 = async (file) => {
    const fileName = `${uuidv4()}-${file.name}`;
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error) {
        throw new Error('Error uploading file');
    }
};
