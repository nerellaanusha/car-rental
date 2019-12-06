import { Component, OnInit, ViewChild,ViewChildren} from '@angular/core';
import { FormGroup, FormControl ,Validators,FormBuilder} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import { CookieService } from 'ngx-cookie-service';
import {SnackbarService } from '../../services/snackbar.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @ViewChild('stepper') stepper:MatStepper;
  car;
  coupon ='';
  couponInfo;
  coupons = [];
  couponsDup = [];
  bookingNum=null;
  constructor(private _formBuilder: FormBuilder,public activatedRoute: ActivatedRoute,
  private router: Router,private sharedService:SharedService,private restService: RestService,
  private cookieService: CookieService,private snackbar:SnackbarService,) {
     let obj = this.router.getCurrentNavigation().extras.state;
     this.car = obj ? obj.car : null;
     this.req = this.sharedService.getRequest();

     this.pickLoc = this.req.pickUpLoc.name.split(",")[0];
    this.dropLoc = this.req.dropOffLoc.name.split(",")[0];
     let pickDate = new Date(this.req.pickUpDate);
     let dropDate = new Date(this.req.dropOffDate);
     this.pickUpDate = pickDate.getMonth() + 1 + '/' + pickDate.getDate() + '/' + pickDate.getFullYear();
     this.dropOffDate = dropDate.getMonth() + 1 + '/' + dropDate.getDate() + '/' + dropDate.getFullYear();
     this.noOfDays = new Date(this.req.dropOffDate).getDate() - new Date(this.req.pickUpDate).getDate();

     this.loadAllCoupons();
  }


  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    coupon: new FormControl('')
  });


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      coupon: ['']
    });
  }

  checkCoupon(){
    this.restService.getData('user/coupon/'+this.secondFormGroup.value.coupon).subscribe((resp: any) =>{
        if(resp.status === 200){
          this.couponInfo = resp.body;
          if(this.couponInfo.discountPercentage || this.couponInfo.dollarDiscount){

            if(this.couponInfo.dollarDiscount){
              this.car.totalPrice = this.car.totalPrice - dollarDiscount;
            } else if(this.couponInfo.discountPercentage){
              let discountDollar = (this.couponInfo.discountPercentage/100) * this.car.totalPrice;
              discountDollar = discountDollar.toFixed(2);
              this.car.totalPrice = this.car.totalPrice - discountDollar;
            }

          }
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');
        }
    );
  }


  reserveCar(){

  this.sharedService.turnOnLoader({on:true,msg:'Booking the car, Please wait.....'})
  var req ={}
  req.dropOffLoc = this.dropLoc;
  req.pickUpLoc = this.pickLoc;
  req.dropOffDate = this.req.dropOffDate
  req.pickUpDate = this.req.pickUpDate;
  req.vin = this.car.vin;
  req.firstName = this.form.value.firstName;
  req.lastName = this.form.value.lastName;
  req.email = this.form.value.email;
  req.contactNumber = this.form.value.contact;
  req.totalPrice = this.car.totalPriceWithTax;
  req.customerId = this.cookieService.get('id');

  console.log(req);

  this.restService.postData('user/reserveCar',req).subscribe((resp: any) =>{
      if(resp.status === 200){
        this.bookingNum = resp.body;
        this.snackbar.openSnackBar('Booking is Successfull','Success');
        this.stepper.next();
      }
      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');
      }
  );
  }


  loadAllCoupons() {
      this.restService.getData('admin/allCoupons').subscribe((resp: any) =>{
          if(resp.status === 200){
            let coupons = resp.body;
            this.couponsDup = resp.body;
            let arr = [];
            coupons.forEach((coupon) => {
              let obj = '';
              obj += coupon.couponCode;
              if(coupon.dicountPercentage){
                obj+=","+coupon.dicountPercentage+"%";
              }else if(coupon.dollarDiscount){
                obj+=","+ "$" +coupon.dollarDiscount;
              }

              this.coupons.push(obj);

            })
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }

  canShowReserveCar = () => {
    return !this.bookingNum ? true : false;
  }


  canShowConfirmation = () => {
    return this.bookingNum ? true : false;
  }


}
