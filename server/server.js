import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import routers from './routes';
import config from './config';

const app = express();

// DB Setup
mongoose.connect(config.mongoose.uri, err => {
    console.log(err || `Connected to MongoDB: ${config.mongoose.uri}`);
});
mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routers);

app.use((err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `Server listening on: ${port}`, `\x1b[0m`)
});
