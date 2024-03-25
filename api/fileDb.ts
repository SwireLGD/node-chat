import {promises as fs} from 'fs';
import { Message, MessageWithoutId } from './types';
import crypto from 'crypto';

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (err) {
            data = [];
            console.error(err);
        }
    },
    async getItems() {
        return data;
    },
    async getItemById(id: string) {
        return data.find(message => message.id === id);
    },
    async addItem(item: MessageWithoutId) {
        const message = {
            id: crypto.randomUUID(),
            ...item
        }

        data.push(message);
        await this.save();

        return message;
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }
};

export default fileDb;