import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  req;
  userInfo = {};
  @Output()
  loader = {
    on: false,
    msg:''
  }

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

  turnOnLoader(obj){
    this.loader.on = obj.on;
    this.loader.msg = obj.msg;
  }

  turnOffLoader(){
  this.loader.on = false;
  this.loader.msg = '';
  }



  getLoader(){
  return this.loader;
  }

}
