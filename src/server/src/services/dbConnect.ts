import { mongoose } from '@typegoose/typegoose';

export async function run() {
    mongoose.connect('mongodb://localhost:27017/Detections', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connected to database');
    });
}

run().catch(console.dir);