import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  req;
  userInfo = {};
  @Output()

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  setRequest(req){
    this.req = req;
  }

  getRequest(){
   return this.req;
  }

  setUserInfo(obj){
    this.userInfo = obj;
    this.messageSource.next(obj);
  }

  getUserInfo(){
    return this.userInfo;
  }

}
