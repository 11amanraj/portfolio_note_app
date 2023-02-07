"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;
// const MONGO_URL = process.env.MONGO_URL
const config = {
    MONGO_URL,
    PORT
};
exports.default = config;
// module.exports = {
//     MONGO_URL,
//     PORT
// }
