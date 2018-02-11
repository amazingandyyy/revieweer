import express from 'express';
import {createServer} from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import routers from './routes';
import config from './config';

const app = express();

// DB Setup
mongoose.connect(config.mongoose.uri);
mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routers);
app.use(errorHandler);

function errorHandler (err, req, res, next) {
    const error = ((typeof err) == 'string')?err.split(':'):err;
    console.log('errrrr', err)
    let [statusCode, msg] = (error.length > 1)?error:[500, err];
    (res.headersSent)?next(msg):res.status(statusCode).send(msg);
}

// Server Setup
const port = process.env.PORT || 8000;
createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `> Server listening on ${port}`, `\x1b[0m`)
});
