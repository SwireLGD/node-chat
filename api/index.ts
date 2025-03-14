import express from "express";
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/messages', messagesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`); 
    });
};

void run();