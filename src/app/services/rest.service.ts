import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private endpoint = 'http://localhost:8080/';
   private httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json'
   })
   };

   postData(url, reqObj){
       return this.http.post(this.endpoint+url,reqObj,{ observe: 'response' });
   };

   getData(url){
      return this.http.get(this.endpoint+url,{ observe: 'response' });
   };

}
