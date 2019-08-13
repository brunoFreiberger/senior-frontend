import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityRegistrationComponent } from './city-registration/city-registration.component';
import { CityListComponent } from './city-list/city-list.component';



const routes: Routes = [
  { path: 'city-registration', component: CityRegistrationComponent },
  { path: 'city-list', component: CityListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
