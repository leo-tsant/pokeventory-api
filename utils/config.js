import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI } = process.env;

export default {
    MONGO_URI,
};