import { OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private restService: RestService) {
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
      console.log(resp);

    });
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}
