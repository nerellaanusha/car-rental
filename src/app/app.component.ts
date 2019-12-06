import { Input, Component, Output, EventEmitter,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';
import { SharedService} from './services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'rental';

  userInfo = {};
  loader;

  constructor(private router: Router,private sharedService:SharedService,
    private cookieService: CookieService){
    this.loader = this.sharedService.getLoader();
  }

  ngOnInit() {
    this.sharedService.currentMessage.subscribe((userInfo) => {
      if(typeof userInfo === 'object'){
        this.userInfo = userInfo;
      }
      }
    );
    if(this.cookieService.get('firstName') !== null){
      this.userInfo.firstName = this.cookieService.get('firstName');
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  signout(){
      this.cookieService.delete('token');
      this.cookieService.delete('id');
      this.cookieService.delete('role');
      this.cookieService.delete('firstName');
      this.router.navigateByUrl('/login');
  }

  canShowAdmin () {
    return this.cookieService.get('role') === 'ROLE_ADMIN'
  }

  canShowSignIn(){
    return !this.cookieService.get('role')
  }

  canShowRegister(){
    return !this.cookieService.get('role')
  }

  getUserName(){
    if(this.cookieService.get('firstName')){
      return this.cookieService.get('firstName')
    }
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}
