import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherComponent } from './weather/weather.component';


const routes: Routes = [
  { path: 'forecast/:zipcode', component: ForecastComponent, pathMatch: 'full', },
  { path: 'weather', component: WeatherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
