import express from "express";
import 'express-async-errors'
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";
import tweetRoute from './router/tweets.js'

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use('/tweets',tweetRoute);


app.use((req, res, next) => {
    res.status(404).send('Not found')
})

app.use((error,req, res, next) => {
    console.log(error);
    res.status(500).send('internal server Error')
})
app.listen(8080);