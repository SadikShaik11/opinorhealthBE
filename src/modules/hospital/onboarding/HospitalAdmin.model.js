import mongoose, { Mongoose } from "mongoose";
/**
 * @author : Sadik shaik
 */
const hospitalAdminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        idProof: [
            {
                name: {
                    type: String,
                    required: true,
                    enum: ['ADHAAR', 'PAN', 'LICENSE', 'HOSPITAL_ID'],
                },
                documentId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'documents',
                    required: true
                }
            }

        ],
        contact: {
            type: String,
            required: true
        },
        designation: String,
        /**
         * unique id we will generate for hospital_admin
         */
        adminId: {
            type: String,
            required: true
        }
    }, { timestamps: true })

const hospitalAdminModel = mongoose.model('hospital_admin', hospitalAdminSchema)
export { hospitalAdminModel }