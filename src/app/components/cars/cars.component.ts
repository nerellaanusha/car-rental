import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
