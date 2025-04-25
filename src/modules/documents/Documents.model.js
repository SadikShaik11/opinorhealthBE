import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
    {
        fileKey: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        url: { type: String, required: true },
    },
    { timestamps: true }
);

const documentsModel = mongoose.model("document", DocumentSchema);

export { documentsModel }