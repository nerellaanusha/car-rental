import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrls: ['./editcar.component.css']
})
export class EditcarComponent implements OnInit {

constructor(
  public dialogRef: MatDialogRef<EditcarComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private restService: RestService,private snackbar:SnackbarService) {
    console.log(data);
  }

  ngOnInit() {
  }

    form: any = new FormGroup({
    carMake: new FormControl({value:this.data.carMake,disabled:true},[Validators.required]),
    carModel: new FormControl({value:this.data.carModel,disabled:true}),
    zipcode: new FormControl(this.data.zipcode),
    price: new FormControl(this.data.price),
    });


    updateCar(){
      if(this.form.status === 'VALID'){
        let req:any = {};
        req.vin = this.data.vin;
        req.price = this.form.value.price;
        req.zipcode = this.form.value.zipcode;
      this.restService.postData('admin/editCar',req).subscribe((resp: any) =>{

      if(resp.status === 200){
        this.data.price = req.price;
        this.data.zipcode = req.zipcode;
        this.snackbar.openSnackBar(resp.body.message,'Success');
      }

      },
      (error) =>{
      this.snackbar.openSnackBar(error.error.message,'Failure');

      }
      );
      }


    }



}
