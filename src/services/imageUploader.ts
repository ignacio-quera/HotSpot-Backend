import AWS from 'aws-sdk';
import { Request, Response } from 'express';


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export const generatePresignedUrl = async (fileName: string, fileType: string) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Expires: 6000,
        ContentType: fileType
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        return url;
    } catch (error) {
        console.error(error);
        return "error";
    }
};
