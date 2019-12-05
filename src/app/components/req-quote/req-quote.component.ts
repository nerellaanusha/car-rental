import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-req-quote',
  templateUrl: './req-quote.component.html',
  styleUrls: ['./req-quote.component.css']
})
export class ReqQuoteComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<ReqQuoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private cookieService: CookieService,
    private restService: RestService,
    private sharedService:SharedService,private snackbar:SnackbarService) { }

  ngOnInit() {
  }

  form: any = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  email: new FormControl(''),
  contactNumber: new FormControl(''),
  actualPrice: new FormControl(this.data.car.totalPrice),
  userPrice: new FormControl('')
  });

  reqQuote = () => {
  let userReq = this.sharedService.getRequest();

  var req = this.form.value;
  req.vin = this.data.car.vin;
  req.customerId = this.cookieService.get('id');
  req.dropOffLoc = userReq.dropOffLoc.name.split(",")[1];
  req.pickUpLoc = userReq.pickUpLoc.name.split(",")[1];
  req.pickUpDate  = userReq.pickUpDate;
  req.dropOffDate = userReq.dropOffDate;


  this.restService.postData('user/submitQuote',req).subscribe((resp: any) =>{
      if(resp.status === 200){
        this.snackbar.openSnackBar('Quote submitted successfully','Success');
      }
      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');
      }
  );
  }


}
