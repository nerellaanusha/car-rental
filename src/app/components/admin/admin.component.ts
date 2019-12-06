import { Component, OnInit ,ViewChild,ViewChildren,QueryList} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditcarComponent} from '../editcar/editcar.component';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { AddLocComponent} from '../add-loc/add-loc.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  selectedCar: string;
  constructor(private restService: RestService,private snackbar:SnackbarService,
    private dialog: MatDialog) {
  }
  cars: any = [];
  locations: any = [];
  quotes: any = [];
  coupons: any = [];
  zipcodes: any =[];
  displayedColumns: string[] = ['VIN', 'CarMake','CarModel','Edit', 'Delete'];
  couponColumns: string[] = ['CouponCode', 'DiscountPercentage','DollarDiscount', 'Delete'];
  locationColumns: string[] = ['Zipcode','LocationName', 'Delete']
  quoteColumns: string[] = ['QuoteId','PickUpLocation','DropOffLocation','ActualPrice','UserPrice','Approve','Decline']
  dataSource = new MatTableDataSource<any>();
  couponDS = new MatTableDataSource<any>();
  locationDS = new MatTableDataSource<any>();
  quoteDS = new MatTableDataSource<any>();

  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  ngOnInit() {
    this.loadAllCars();
    this.loadAllZipcodes();
  }

  loadAllZipcodes() {
      this.restService.getData('admin/allLocations').subscribe((resp: any) =>{
          if(resp.status === 200){
            resp.body.forEach(loc =>{
              this.zipcodes.push(loc.zipcode);
            });
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }


  tabChanged(tab){
    if(tab.index === 3){
      this.loadAllCoupons();
    }else if(tab.index === 4){
      this.loadAllLocations();
    }else if(tab.index === 2){
      this.loadAllQuotes();
    }
  }

  loadAllQuotes(){
  this.restService.getData('admin/allQuotes').subscribe((resp: any) =>{
      if(resp.status === 200){
        this.quotes = resp.body;
        this.quoteDS = new MatTableDataSource<Object>(resp.body);
        this.quoteDS.paginator = this.paginator.toArray()[1];;
      }
      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');
      }
  );
  }

  loadAllCars() {
      this.restService.getData('admin/allCars').subscribe((resp: any) =>{
          if(resp.status === 200){
            this.cars = resp.body;
            this.dataSource = new MatTableDataSource<Object>(resp.body);
            this.dataSource.paginator = this.paginator.toArray()[0];;
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
            this.coupons = resp.body;
            this.couponDS = new MatTableDataSource<Object>(resp.body);
            this.couponDS.paginator = this.paginator.toArray()[2];
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }

  loadAllLocations() {
      this.restService.getData('admin/allLocations').subscribe((resp: any) =>{
          if(resp.status === 200){
            this.locations = resp.body;
            this.locationDS = new MatTableDataSource<Object>(resp.body);
            this.locationDS.paginator = this.paginator.toArray()[3];
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }



  form: FormGroup = new FormGroup({
    carMake: new FormControl('',[Validators.required]),
    carModel: new FormControl(''),
    vin: new FormControl(''),
    baggage: new FormControl(''),
    capacity: new FormControl(''),
    image: new FormControl(''),
    zipcode: new FormControl(''),
    price: new FormControl(''),
    type: new FormControl('')
  });

  couponForm: FormGroup = new FormGroup({
    couponCode: new FormControl(''),
    discount: new FormControl('')
  });



  addNewCar() {
    if (this.form.valid) {
      this.restService.postData('admin/addcar',this.form.value).subscribe((resp: any) =>{
      if(resp.status === 200){
        this.snackbar.openSnackBar(resp.body.message,'Success');
        this.form.reset();
      }

      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');

      }
      );
    }
  }

  deleteCar(car){
  this.restService.deleteData('admin/deleteCar/'+car.vin).subscribe((resp: any) =>{
      if(resp.status === 200){
        this.snackbar.openSnackBar(resp.body.message,'Success');
        var filtered = this.cars.filter(function(value, index, arr){
        return value.zipcode != car.zipcode;
        });
        this.cars = filtered;
        this.dataSource = new MatTableDataSource<any>(filtered);
      }
      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');
      }
  );
  }

  deleteCoupon(coupon){

  this.restService.deleteData('admin/deleteCoupon/'+coupon.couponCode).subscribe((resp: any) =>{
  if(resp.status === 200){
    this.snackbar.openSnackBar(resp.body.message,'Success');

    var filtered = this.coupons.filter(function(value, index, arr){
    return value.couponCode != coupon.couponCode;
    });
    this.coupons = filtered;
    this.couponDS = new MatTableDataSource<any>(filtered);
  }
  },
  (error) =>{
  this.snackbar.openSnackBar(error.error.message,'Failure');
  }
  );

  }




  openEditCar(editCarDetails){
  const dialogRef = this.dialog.open(EditcarComponent, {
      width: '500px',
      data: editCarDetails
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  addCoupon(){
  const dialogRef = this.dialog.open(AddCouponComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllCoupons();
    });
  }


  addLocation(){
  const dialogRef = this.dialog.open(AddLocComponent, {
      width: '500px',
      data: {
              'locations': this.locations,
              'ds':this.locationDS,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllLocations();
    });
  }

  deleteLoc(loc){
  this.restService.deleteData('admin/deleteLoc/'+loc.zipcode).subscribe((resp: any) =>{

  if(resp.status === 200){
    this.snackbar.openSnackBar(resp.body.message,'Success');

    var filtered = this.locations.filter(function(value, index, arr){
    return value.zipcode != loc.zipcode;
    });
    this.locations = filtered;
    this.locationDS = new MatTableDataSource<any>(filtered);
  }

  },
  (error) =>{
  this.snackbar.openSnackBar(error.error.message,'Failure');

  }
  );
  }


  updateQuote = (quote,status) => {
      quote.quoteStatus = status;
      this.restService.postData('admin/updateQuote',quote).subscribe((resp: any) =>{
      if(resp.status === 200){
        this.snackbar.openSnackBar(resp.body.message,'Success');
      }

      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');

      }

      );

  }

}
