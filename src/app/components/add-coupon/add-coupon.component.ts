import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddCouponComponent implements OnInit {

  constructor(private restService: RestService,private snackbar:SnackbarService) { }

  ngOnInit() {
  }

  couponForm: FormGroup = new FormGroup({
    couponCode: new FormControl('',[Validators.required]),
    dicountPercentage: new FormControl(''),
    dollarDiscount: new FormControl('')
  });

  addCoupon () {
    if (this.couponForm.valid) {
        this.restService.postData('admin/addCoupon',this.couponForm.value).subscribe((resp: any) =>{
        if(resp.status === 200){
          this.snackbar.openSnackBar(resp.body.message,'Success');
          this.couponForm.reset();
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');

        }
        );
    }

  }

}
