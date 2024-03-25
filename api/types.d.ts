export interface Message {
    id: string;
    author: string;
    message: string;
}

export type MessageWithoutId = Omit<Product, 'id'>; 