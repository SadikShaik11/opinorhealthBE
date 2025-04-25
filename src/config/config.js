import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
// Load the environment variables from the .env file
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define the schema for your environment variables
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    AWS_REGION: Joi.string(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_BUCKET_NAME: Joi.string().required()
    // Add other variables as needed
}).unknown();

// Validate the environment variables against the schema
const { error, value: envVars } = envVarsSchema.validate(process.env);

// Throw an error if validation fails
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
// Export the validated configurations
export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    saltRounds: envVars.SALT_ROUNDS,
    tokenExpiry: envVars.TOKEN_EXPIRY,
    JWT_SECRET: envVars.JWT_SECRET,
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'development' ? 'op_health' : ''),
        options: {
            //  useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
    },

    AWS_ACCESS_KEY_ID: envVars.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: envVars.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: envVars.AWS_BUCKET_NAME
};
