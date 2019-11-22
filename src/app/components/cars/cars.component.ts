import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import {Router,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  cars
  constructor(private sharedService:SharedService,private restService:RestService,
  private router: Router) {

    this.restService.postData('user/getCarsOnZipcode',this.sharedService.getRequest()).subscribe((resp) =>{
        if(resp.status === 200){
         this.cars = resp.body;
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');
        }
    );
    this.sharedService.setRequest({});
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
