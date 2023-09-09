import * as dotenv from 'dotenv';

dotenv.config();
export const env = {
  dbEnvironment: process.env.DB_ENVIRONMENT || 'Sin Asignar',
  dbHost1: process.env.DB_HOST_1 || '',
  dbUser1: process.env.DB_USER_1 || '',
  dbPass1: process.env.DB_PASS_1 || '',
  dbPort1: parseInt(process.env.DB_PORT_1) || 3306,
  dbApis: process.env.DB_APIS || '',
  dbHermes: process.env.DB_HERMES || '',
};
