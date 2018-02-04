import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

export class ChatService {
    private url = 'http://192.168.108.130:8081/';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public EnterRoom(room: any) {
      this.socket.emit('setUserChatroom', room);
    }

    public QuitRoom(username: any) {
      this.socket.emit('exitChatroom', username);
    }

    public sendMessage(message) {
        this.socket.emit('chatMessage', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('chatMessage', (message) => {
                observer.next(message);
            });
        });
    }
}