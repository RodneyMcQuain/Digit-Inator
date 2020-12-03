import { Request, Response } from 'express';
import { Detection } from '../models/detectionModel';
import { createEntry, readLastFiveEntries } from '../repositories/detectionRepo';

const create = async (req: Request, res: Response) => {
    createEntry(new Detection(req.body)).then(() => {
        res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        res.status(400).send('Bad Request');
    });
}

const readEntries = async (_: any, res: Response) => {
    await readLastFiveEntries().then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log(err);
        res.status(500).send('server error');
    });
}

export { create, readEntries };