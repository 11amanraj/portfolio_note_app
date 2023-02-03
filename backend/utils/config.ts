import dotenv from 'dotenv';
dotenv.config();

//look into this later//
declare const process : {
    env: {
      MONGO_URL: string,
      PORT: number
    }
  }

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

module.exports = {
    MONGO_URL,
    PORT
}