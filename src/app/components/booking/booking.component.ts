import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators,FormBuilder} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  car;
  constructor(private _formBuilder: FormBuilder,public activatedRoute: ActivatedRoute,private router: Router) {
     let obj = this.router.getCurrentNavigation().extras.state;
     this.car = obj ? obj.car : null;

  }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


}
