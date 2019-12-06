import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private cookieService: CookieService, private router: Router) {
}

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

  if(next.routeConfig.path === 'admin'){
    if(this.cookieService.get('role') === 'ROLE_ADMIN'){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }else{
      if(this.cookieService.get('token')){
          return true;
      }else{
        this.router.navigateByUrl('/login');
        return false;
      }
  }


}
}
