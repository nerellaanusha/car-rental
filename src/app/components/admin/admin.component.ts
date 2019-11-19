import { Component, OnInit ,ViewChild} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditcarComponent} from '../editcar/editcar.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  selectedCar: string;
  constructor(private restService: RestService,private snackbar:SnackbarService,
    private dialog: MatDialog) { }

  displayedColumns: string[] = ['VIN', 'CarMake','CarModel','Edit', 'Delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.loadAllCars();
    this.dataSource.paginator = this.paginator;
  }


  loadAllCars() {
  this.restService.getData('home/allCars').subscribe((resp) =>{

  if(resp.status === 200){
    this.dataSource = new MatTableDataSource<PeriodicElement>(resp.body);
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

  addNewCar() {
    if (this.form.valid) {
      //this.submitEM.emit(this.form.value);
      this.restService.postData('home/addcar',this.form.value).subscribe((resp) =>{

      if(resp.status === 200){
        this.snackbar.openSnackBar(resp.message,'Success');
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

}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
