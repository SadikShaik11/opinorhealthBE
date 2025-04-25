

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});


/**
 * 
 * @abstract
 * @author:Sadik [ sadikshaik139@gmial.com]
 * @name : upload
 * @description: to upload files to aws s3 bucket .File size must be less than 5 mb
 * @version :1 
 */

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "private",
        serverSideEncryption: "aws:kms",
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/png", "image/jpeg", "application/pdf"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only PNG, JPG, and PDF are allowed."), false);
        }
    },
});

export const uploadMiddleware = upload.single("file");

export const getFileUrl = async (fileKey, alias) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            ResponseContentDisposition: "inline", // Open file in browser
        });

        const signedUrl = await getSignedUrl(s3, command); // 5 min expiry

        return signedUrl;
    } catch (err) {
        console.error("Error generating signed URL:", err);
        throw err;
    }
};
