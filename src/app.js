import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Route from './routes/index';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/soma', Route);
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to Soma!' }));

export default app;
