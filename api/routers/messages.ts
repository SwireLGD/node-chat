import express from 'express';
import { MessageWithoutId } from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages = await fileDb.getItems();
    return res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const messageData: MessageWithoutId = {
        author: req.body.title,
        message: req.body.price,
    };

    const message = await fileDb.addItem(messageData);

    return res.json(message);
});

export default messagesRouter;