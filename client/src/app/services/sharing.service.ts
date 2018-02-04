import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel } from '../models/user';
@Injectable()
export class SharingService {
  private messageSource = new BehaviorSubject<UserModel>(null);
  currentMessage = this.messageSource.asObservable();

  private room = new BehaviorSubject<string>(null);
  roomCurrent = this.room.asObservable();

  constructor() { }
  changeMessage(message: UserModel) {
    this.messageSource.next(message)
  }

  ChangeRoom(message: string) {
    this.room.next(message)
  }
}