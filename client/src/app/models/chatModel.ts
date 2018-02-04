export class ChatModel {
    messages: Message[];
    id: number;
}

export class Message {
    message: string;
    date: Date;
}