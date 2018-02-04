import { UserModel } from "./user";

export class ChatModel {
    messages: Message[];
    id: number;
    user: UserModel;
}

export class Message {
    message: string;
    date: Date;
    sender_id: number;
}