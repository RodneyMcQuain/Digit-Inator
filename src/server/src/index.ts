import bodyParser from 'body-parser';
import express from 'express';
import router from './routes';
import './services/dbConnect';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(express.static("../client/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(port, () => console.log(`Server started on port: ${port}`));