"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app_module = require('./app')
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
// const configs_module = require('./utils/config')
const http = require("http");
const server = http.createServer(app_1.default);
app_1.default.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
// import express, { Express, Request, response, Response } from 'express';
// import { Schema, model, connect } from 'mongoose';
// const config = require('./utils/config')
// const cors = require('cors')
// const app: Express = express();
// interface notes {
//     title: string;
//     content: string;
//     author: string
// }
// const noteSchema = new Schema<notes>({
//     title: String,
//     content: String,
//     author: String
// })
// const Note = model<notes>('Note', noteSchema)
// //connecting to mongodb
// connect(config.MONGO_URL)
// app.use(cors())
// app.use(express.json())
// app.get('/', (req: Request, res: Response) => {
//     res.send('Server Running');
// });
// app.get('/api/notes', (request: Request, response: Response) => {
//     Note
//         .find({})
//         .then(notes => {
//             response.json(notes)
//         })
// })
// app.post('/api/notes', (request,response) => {
//     const blog = new Note(request.body)
//     blog
//         .save()
//         .then(result => {
//             response.status(201).json(result)
//         })
// })
// app.listen(config.PORT, () => {
//     console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
// });
