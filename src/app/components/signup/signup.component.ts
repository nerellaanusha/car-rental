import { OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestService } from '../../services/rest.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private restService: RestService) {
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

      this.restService.postData('signup',this.form.value).subscribe((resp) =>{
        console.log(resp);

      });

    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}
