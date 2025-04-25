/**
 * @author : sadik <sadikshaik139@gmail.com>
 */

import Master from '../../config/Master.class.js';
import { uploadMiddleware, getFileUrl } from '../../microservice/fileupload.service.js';
import Models from '../../Models.js';


class DocumentController extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    /**
     * Uploads an image and saves its details in the database.
     * @param {*} req 
     * @param {*} res 
     * @returns File upload response with a link to access the image
     */
    async uploadImage(req, res) {
        try {
            console.log("Inside uploadImage", req.headers.filename)
            const allowedFileNames = new Set(['ADHAAR', 'PAN', 'LICENSE', 'HOSPITAL_ID']);

            if (!req.headers.filename || !allowedFileNames.has(req.headers.filename.toUpperCase())) {
                return res.status(this.HTTP_STATUS.BAD_REQUEST).json({
                    error: `Invalid file name. Allowed values: ${Array.from(allowedFileNames).join(', ')}`
                });
            }

            uploadMiddleware(req, res, async (err) => {
                if (err) {
                    return res.status(this.HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
                }

                if (!req.file) {
                    return res.status(this.HTTP_STATUS.BAD_REQUEST).json({ error: "No file uploaded" });
                }

                const fileKey = req.file.key;
                const fileUrl = await getFileUrl(fileKey);

                const document = new Models.DOCUMENTS_MODEL({
                    name: req.headers.filename,
                    fileKey,
                    url: fileUrl,
                    uploadedBy: req.user ? req.user._id : null,
                });
                await document.save();

                res.status(this.HTTP_STATUS.CREATED).json({ message: "File uploaded successfully", fileUrl });
            });
        }
        catch (error) {
            this.logError("Error uploadImage:", error);
            if (error instanceof ApiError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                res.status(this.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
            }
        }
    }
}

const documentController = new DocumentController();

export { documentController }
