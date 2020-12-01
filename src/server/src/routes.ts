import express from 'express';
import { create, readEntries } from './controllers/detectionController';

const router = express.Router();

router.route('/create').post(create);

router.route('/get-entry').get(readEntries);

export default router;