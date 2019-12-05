import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
 MatCheckboxModule,
 MatToolbarModule,
 MatNativeDateModule,
 MatFormFieldModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CarsComponent} from './components/cars/cars.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditcarComponent } from './components/editcar/editcar.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { AddLocComponent } from './components/add-loc/add-loc.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import { BookingComponent } from './components/booking/booking.component';
import { CookieService } from 'ngx-cookie-service';
import {MatMenuModule} from '@angular/material/menu';
import { ReqQuoteComponent } from './components/req-quote/req-quote.component';



const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'cars',
    component:CarsComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'booking',
    component:BookingComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CarsComponent,
    AdminComponent,
    SignupComponent,
    EditcarComponent,
    AddCouponComponent,
    AddLocComponent,
    BookingComponent,
    ReqQuoteComponent
  ],
  entryComponents: [EditcarComponent,AddCouponComponent,AddLocComponent,ReqQuoteComponent],
  imports: [
    MatMenuModule,
    MatStepperModule,
    MatAutocompleteModule,
    FormsModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MatDatepickerModule,CookieService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
