export interface Message {
    datetime: string;
    id: string;
    author: string;
    message: string;
}

export type MessageWithoutId = Omit<Message, 'id'>; 