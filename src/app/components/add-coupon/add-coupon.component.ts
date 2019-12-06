import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddCouponComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCouponComponent>,
  private restService: RestService,private snackbar:SnackbarService) { }

  ngOnInit() {
  }

  couponForm: FormGroup = new FormGroup({
    couponCode: new FormControl('',[Validators.required]),
    discountPercentage: new FormControl(''),
    dollarDiscount: new FormControl(''),
    expiryDate: new FormControl('')
  });

  addCoupon () {
    if (this.couponForm.valid) {
        this.restService.postData('admin/addCoupon',this.couponForm.value).subscribe((resp: any) =>{
        if(resp.status === 200){
          this.snackbar.openSnackBar(resp.body.message,'Success');
          this.couponForm.reset();
          this.dialogRef.close();
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');

        }
        );
    }
  }

  checkDiscountPercentage(){
    return this.couponForm.value.dollarDiscount ? true: false;
  }

  checkDollarDiscount(){
    return this.couponForm.value.discountPercentage ? true: false;
  }

}
