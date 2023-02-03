const app_module = require('./app')
const configs_module = require('./utils/config')
const http = require('http')

const server = http.createServer(app_module)

app_module.listen(configs_module.PORT, () => {
    console.log(`Server running on port ${configs_module.PORT}`)
})

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