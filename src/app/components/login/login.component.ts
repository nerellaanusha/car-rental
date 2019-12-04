import { OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { CookieService } from 'ngx-cookie-service';
import {SnackbarService } from '../../services/snackbar.service';
import {Router} from '@angular/router';
import { SharedService} from '../../services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private restService: RestService,
  private cookieService: CookieService,
  private router: Router,
  private snackbar:SnackbarService,
  private sharedService:SharedService) {
    console.log('login');
  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
    this.restService.postData('api/signin',this.form.value).subscribe((resp) =>{
    if(resp.status === 200){
      this.cookieService.set('token', resp.body.accessToken);
      this.cookieService.set('id',resp.body.id);
      this.cookieService.set('role', resp.body.authorities[0].authority);
      this.cookieService.set('firstName', resp.body.firstName);
      this.snackbar.openSnackBar('User successfully Logged-in','Sucess');
      var obj = {};
      obj.firstName = resp.body.firstName;
      obj.role = resp.body.authorities[0].authority
      this.sharedService.setUserInfo(obj);
      this.router.navigateByUrl('/home');

      }
    });
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}
