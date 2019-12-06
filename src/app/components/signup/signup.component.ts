import { OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { CookieService } from 'ngx-cookie-service';
import {SnackbarService } from '../../services/snackbar.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private restService: RestService,private cookieService: CookieService,
  private router: Router,
  private snackbar:SnackbarService) {
  console.log(this.restService);
  }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {

      this.restService.postData('api/signup',this.form.value).subscribe((resp) =>{
      if(resp.status === 200){
          this.cookieService.set('token', resp.body.accessToken);
          this.cookieService.set('id',resp.body.id);
          this.cookieService.set('role', resp.body.authorities[0].authority);
          this.cookieService.set('firstName', resp.body.firstName);
          this.snackbar.openSnackBar('User successfully Logged-in','Success');
          this.router.navigateByUrl('/home');
        }else{
          this.snackbar.openSnackBar(resp.body,'Failure');
        }

      });

    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}
