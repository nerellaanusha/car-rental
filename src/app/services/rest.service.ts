import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient,private cookieService: CookieService ) { }

  private endpoint = 'http://localhost:8080/';
   private httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json',
     'Authorization': 'Bearer '+this.cookieService.get('token')
   })
   };

   postData(url, reqObj){
     let httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer '+this.cookieService.get('token')
     })
     };
   return this.http.post(this.endpoint+url,reqObj,{ observe: 'response',headers:httpOptions.headers });
   };

   getData(url){
     let httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer '+this.cookieService.get('token')
     })
     };
      return this.http.get(this.endpoint+url,{ observe: 'response',headers:httpOptions.headers  });
   };

   deleteData(url){
     let httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer '+this.cookieService.get('token')
     })
     };
    return this.http.delete(this.endpoint+url,{ observe: 'response',headers:httpOptions.headers  });
   }

}
