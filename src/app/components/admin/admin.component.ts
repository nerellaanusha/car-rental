import { Component, OnInit ,ViewChild} from '@angular/core';
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
  cars: any;
  displayedColumns: string[] = ['VIN', 'CarMake','CarModel','Edit', 'Delete'];
  couponColumns: string[] = ['CouponCode', 'DiscountPercentage','DollarDiscount','Edit', 'Delete'];
  locationColumns: string[] = ['Zipcode','LocationName','Edit', 'Delete']
  dataSource = new MatTableDataSource<PeriodicElement>();
  couponDS = new MatTableDataSource<PeriodicElement>();
  locationDS = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.loadAllCars();
    this.dataSource.paginator = this.paginator;
  }


  tabChanged(tab){
    if(tab.index === 3){
      this.loadAllCoupons();
    }else if(tab.index === 4){
      this.loadAllLocations();
    }
  }

  loadAllCars() {
      this.restService.getData('admin/allCars').subscribe((resp) =>{
          if(resp.status === 200){
           this.cars = resp.body;
            this.dataSource = new MatTableDataSource<any>(resp.body);
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }

  loadAllCoupons() {
      this.restService.getData('admin/allCoupons').subscribe((resp) =>{
          if(resp.status === 200){
            this.couponDS = new MatTableDataSource<any>(resp.body);
          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }

  loadAllLocations() {
      this.restService.getData('admin/allLocations').subscribe((resp) =>{
          if(resp.status === 200){
            this.locationDS = new MatTableDataSource<any>(resp.body);
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
      this.restService.postData('admin/addcar',this.form.value).subscribe((resp) =>{
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
  this.restService.deleteData('admin/deleteCar/'+car.vin).subscribe((resp) =>{

  if(resp.status === 200){
    this.snackbar.openSnackBar(resp.body.message,'Success');

    var filtered = this.cars.filter(function(value, index, arr){
    return value.vin != car.vin;
    });
    this.cars = filtered;
    this.dataSource = new MatTableDataSource<PeriodicElement>(filtered);


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
      this.animal = result;
    });
  }



  addCoupon(){
  const dialogRef = this.dialog.open(AddCouponComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  addLocation(){
  const dialogRef = this.dialog.open(AddLocComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
