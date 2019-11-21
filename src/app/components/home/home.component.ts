import {  OnInit } from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private sharedService:SharedService,
  private restService:RestService) {
    console.log('home');
    }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    pickUpLoc: new FormControl(''),
    dropOffLoc: new FormControl(''),
    pickUpDate: new FormControl(''),
    dropOffDate: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  showCars = () =>{
    this.sharedService.setRequest(this.form.value);
    this.router.navigateByUrl('/cars');
  }


}
