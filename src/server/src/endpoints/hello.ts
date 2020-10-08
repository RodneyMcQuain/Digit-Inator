// This is a file purely for example, remove it once we add a real endpoint
import express from 'express';

const router = express.Router();

router.route('/hello').get((_, res) => {
    console.log('Hello');
    res.send({ express: 'Hello From Express' });
});

export default router;