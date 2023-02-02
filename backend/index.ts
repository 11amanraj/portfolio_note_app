import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config();
import { Schema, model, connect } from 'mongoose';
const cors = require('cors')
const app: Express = express();

interface notes {
    title: string;
    content: string;
    author: string
}

const noteSchema = new Schema<notes>({
    title: String,
    content: String,
    author: String
})

const Note = model<notes>('Note', noteSchema)

//look into this later//
declare const process : {
    env: {
      MONGO_URL: string,
      PORT: number
    }
  }

const mongoUrl = process.env.MONGO_URL
connect(mongoUrl)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Server Running');
});

app.get('/api/notes', (request: Request, response: Response) => {
    Note
        .find({})
        .then(notes => {
            response.json(notes)
        })
})

app.post('/api/notes', (request,response) => {
    const blog = new Note(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})
  
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});