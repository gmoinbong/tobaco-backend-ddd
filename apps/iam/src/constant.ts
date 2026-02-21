import * as dotenv from 'dotenv';
dotenv.config();

export const JWT_CONSTANTS = {
    secret: 'secretKey',
    expiresIn: '1h',
};