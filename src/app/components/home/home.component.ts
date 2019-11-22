import {  OnInit } from '@angular/core';
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import { SharedService} from '../../services/shared.service';
import { RestService } from '../../services/rest.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  locations = [];
  filteredOptions: Observable<any[]>;
  constructor(private router: Router,private sharedService:SharedService,
  private restService:RestService) {
  this.loadAllLocations();
  }

  form: FormGroup = new FormGroup({
    pickUpLoc: new FormControl(''),
    dropOffLoc: new FormControl(''),
    pickUpDate: new FormControl(''),
    dropOffDate: new FormControl('')
  });

  displayFn(loc){
    return loc ? loc.name : undefined;
  }

  loadAllLocations() {
      this.restService.getData('admin/allLocations').subscribe((resp) =>{
          if(resp.status === 200){
            resp.body.forEach(loc =>{

              this.locations.push({name:loc.locationName+","+loc.zipcode});

            });
            this.filteredOptions = this.form.get('pickUpLoc')!.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.locations.slice())
            );

            this.filteredOptions1 = this.form.get('dropOffLoc')!.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this.filter(name) : this.locations.slice())
            );

          }
          },
          (error) =>{
          this.snackbar.openSnackBar(error.error.message,'Failure');
          }
      );
  }
  ngOnInit() {
  }

  private filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.locations.filter(loc => loc.name.toLowerCase().indexOf(filterValue) === 0);
  }


  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

  showCars = () =>{
    if(this.form.valid){
    var req = this.form.value;

    req.dropOffLoc = this.form.value.dropOffLoc.name.split(",")[1];
    req.pickUpLoc = this.form.value.pickUpLoc.name.split(",")[1];
    this.sharedService.setRequest(req);
    this.router.navigateByUrl('/cars');
    }
  }


}
