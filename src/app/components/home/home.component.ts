import {  OnInit } from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    console.log('home');
    }

  ngOnInit() {
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
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  showCars = () =>{
    this.router.navigateByUrl('/cars');
  }


}
