import bodyParser from 'body-parser';
import express from 'express';
import router from './routes';
import './services/dbConnect';

const app = express();

// Middleware
app.use(express.static("../client/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));