import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
 MatCheckboxModule,
 MatIconModule,
 MatToolbarModule,
 MatNativeDateModule,
 MatFormFieldModule
} from '@angular/material';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CarsComponent} from './components/cars/cars.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent
  },
  {path:'login',
  component:LoginComponent
  },
  {
  path:'cars',
  component:CarsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CarsComponent
  ],
  imports: [
    MatDatepickerModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
