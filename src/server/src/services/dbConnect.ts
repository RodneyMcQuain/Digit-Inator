import { mongoose } from '@typegoose/typegoose';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/Detections';

export async function run() {
    mongoose.connect(MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connected to database');
    });
}

run().catch(console.dir);