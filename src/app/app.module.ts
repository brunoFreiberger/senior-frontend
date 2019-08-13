import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityRegistrationComponent } from './city-registration/city-registration.component';
// import { CityListComponent } from './city-list/city-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CityListComponent } from './city-list/city-list.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CityListComponent,
    CityRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [
    FormBuilder, 
    NgxSpinnerService, 
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
