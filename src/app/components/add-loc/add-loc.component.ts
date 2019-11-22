import { Component, OnInit,ViewEncapsulation,Inject } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
import { RestService } from '../../services/rest.service';
import {SnackbarService } from '../../services/snackbar.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-add-loc',
  templateUrl: './add-loc.component.html',
  styleUrls: ['./add-loc.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddLocComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditcarComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private restService: RestService,private snackbar:SnackbarService) { }

  locForm: FormGroup = new FormGroup({
    zipcode: new FormControl('',[Validators.required]),
    locationName: new FormControl('')
  });

  ngOnInit() {
  }

  addLocation () {
    if (this.locForm.valid) {
        this.restService.postData('admin/addLocation',this.locForm.value).subscribe((resp) =>{
        if(resp.status === 200){
          this.data.locations.push(this.locForm.value);
          this.data.ds =new MatTableDataSource<PeriodicElement>(this.data.locations);
          this.snackbar.openSnackBar(resp.body.message,'Success');
          this.locForm.reset();
        }
        },
        (error) =>{
        this.snackbar.openSnackBar(error.error.message,'Failure');
        }
        );
    }

  }



}
