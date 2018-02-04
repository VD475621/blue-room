import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserModel } from '../models/user';
@Injectable()
export class SharingService {
  private messageSource = new BehaviorSubject<UserModel>(null);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: UserModel) {
    this.messageSource.next(message)
  }
}