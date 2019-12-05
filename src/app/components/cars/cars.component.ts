import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import {Router,NavigationExtras} from '@angular/router';
import {SnackbarService } from '../../services/snackbar.service';
import { ReqQuoteComponent} from '../req-quote/req-quote.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  cars;


  constructor(private sharedService:SharedService,private restService:RestService,
  private router: Router,private snackbar:SnackbarService ,private dialog: MatDialog) {

  var req = JSON.parse(JSON.stringify(this.sharedService.getRequest()));
  req.dropOffLoc = req.dropOffLoc.name.split(",")[1];
  req.pickUpLoc = req.pickUpLoc.name.split(",")[1];
    this.restService.postData('user/getCarsOnZipcode',req).subscribe((resp) =>{
        if(resp.status === 200){
         this.cars = resp.body;
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');
        }
    );
  }

  ngOnInit() {

  }


  book(car){
  let navigationExtras: NavigationExtras = {
            queryParams: {
                "car": car
            }
        };
  this.router.navigateByUrl('/booking',{state:{car}});
  }

  reqQuote = (car) =>  {

  const dialogRef = this.dialog.open(ReqQuoteComponent, {
      width: '500px',
      data: {
              'car': car
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




}
