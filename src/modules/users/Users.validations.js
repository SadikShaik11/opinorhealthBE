import joi from 'joi'
/**
 * signup a user
 */
const userValidationSchema = {
    body: joi.object().keys({
        email: joi.string().required().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/),
        mobileNumber: joi.number().required().min(1111111111).max(9999999999),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
        name: joi.string().required(),
        type: joi.string().required().valid('DOCTOR', 'USER', 'LAB_ASSISTANT')
    })
}

const login = {
    body: joi.object().keys({
        email: joi.string().required().regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/),
        password: joi.string().required(),
    })
}

export {
    userValidationSchema,
    login
}