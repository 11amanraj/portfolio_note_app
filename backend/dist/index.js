"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config = require('./utils/config');
const cors = require('cors');
const app = (0, express_1.default)();
const noteSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    author: String
});
const Note = (0, mongoose_1.model)('Note', noteSchema);
//connecting to mongodb
(0, mongoose_1.connect)(config.MONGO_URL);
app.use(cors());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Server Running');
});
app.get('/api/notes', (request, response) => {
    Note
        .find({})
        .then(notes => {
        response.json(notes);
    });
});
app.post('/api/notes', (request, response) => {
    const blog = new Note(request.body);
    blog
        .save()
        .then(result => {
        response.status(201).json(result);
    });
});
app.listen(config.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${config.PORT}`);
});
