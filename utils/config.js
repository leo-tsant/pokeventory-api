import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI } = process.env;
const { PORT } = process.env;
const { ADMIN_PASSWORD } = process.env;

export default {
  MONGO_URI,
  PORT,
  ADMIN_PASSWORD,  
};
