import Master from '../../../config/Master.class.js';
import Models from '../../../Models.js';
import jwt from 'jsonwebtoken';
import config from '../../../config/index.js';

/**
 * @name : AdminService
 */
class AdminService extends Master {
    constructor() {
        super();
        Object.freeze(this);
    }

    /**
     * Login admin and return JWT token
     * @param {Object} loginObj - { username, password }
     * @returns {Object} - { success: true, token }
     */
    async loginAdmin(loginObj) {
        try {
            this.logger.info("AdminService: Inside loginAdmin Method");

            const { username, password } = loginObj;

            if (!username || !password) {
                throw this.API_ERROR(this.HTTP_STATUS.BAD_REQUEST, 'Username and password are required');
            }

            const admin = await Models.ADMIN_MODEL.findOne({ username });

            if (!admin) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid username or password');
            }

            const encodedPassword = Buffer.from(password).toString('base64');

            if (admin.password !== encodedPassword) {
                throw this.API_ERROR(this.HTTP_STATUS.UNAUTHORIZED, 'Invalid username or password');
            }

            const payload = {
                adminId: admin._id,
                username: admin.username,
                type: admin.type
            };

            const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });

            return { success: true, token };

        } catch (error) {
            this.logError("AdminService: Error in loginAdmin", error);
            throw error;
        }
    }
}

export const adminService = new AdminService();
