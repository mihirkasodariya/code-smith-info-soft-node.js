'use strict'
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGOURL, {});
    console.debug(`\x1b[32m✔ MongoDB Database:\x1b[0m \x1b[36m${conn.connection.name}\x1b[0m \x1b[32mConnected Successfully!\x1b[0m`);
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  };
};

export default connectDB;