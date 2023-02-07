import dotenv from 'dotenv'
dotenv.config()

//look into this later//
declare const process : {
    env: {
      MONGO_URL: string,
      PORT: number,
      TEST_MONGO_URL: string,
      NODE_ENV: string
    }
  }

const PORT = process.env.PORT
const MONGO_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL
// const MONGO_URL = process.env.MONGO_URL

const config = {
    MONGO_URL,
    PORT
}

export default config

// module.exports = {
//     MONGO_URL,
//     PORT
// }