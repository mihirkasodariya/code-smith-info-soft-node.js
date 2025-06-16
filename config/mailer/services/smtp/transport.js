import { createTransport } from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

const transport = createTransport({
  pool: true,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE?.toLowerCase() === 'true',
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transport;
