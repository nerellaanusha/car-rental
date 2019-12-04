import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import {Router,NavigationExtras} from '@angular/router';
import {SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  cars;


  constructor(private sharedService:SharedService,private restService:RestService,
  private router: Router,private snackbar:SnackbarService ) {

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




}
