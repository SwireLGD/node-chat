import express from 'express';
import { MessageWithoutId } from '../types';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const datetime = req.query.datetime;
    let messages = await fileDb.getItems();
    
    if (datetime) {
        const date = new Date(datetime as string);
        if (isNaN(date.getTime())) {
            return res.status(400).json({error: "Wrong datetime format"});
        }
        messages = messages.filter(m => new Date(m.datetime) > date);
    }

    messages = messages.slice(-30);
    return res.json(messages);
});

messagesRouter.post('/', async (req, res) => {
    const { author, message } = req.body;

    if (!author || !message) {
        return res.status(400).json({"error": "Author and message must be present in the request"});
    }

    const messageData = {
        author,
        message,
        datetime: new Date().toISOString()
    };

    const savedMessages = await fileDb.addItem(messageData);

    return res.json(savedMessages);
});

export default messagesRouter;