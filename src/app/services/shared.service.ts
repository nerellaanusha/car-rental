import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  req;
  constructor() { }

  setRequest(req){
    this.req = req;
  }

  getRequest(req){
   return this.req;
  }

}
