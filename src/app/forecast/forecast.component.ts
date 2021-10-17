import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { WeatherData } from '../weather-data';
import { WeatherDetails } from '../weather-details';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private weatherService: WeatherService) { }

  zipcode: string = '';
  weatherData: WeatherData = new WeatherData();

  ngOnInit(): void {

    //get zipcode from url parameter
    this.zipcode = this.route.snapshot.params['zipcode'];
    this.loadForecastWeather();
  }

  //navigate back to weather component
  btnClick() {
    this.router.navigateByUrl('/weather');
  };

  //call the getForcastInfo function from service
  loadForecastWeather() {
    this.weatherService.getForcastInfo(this.zipcode).subscribe(
      data => {
        
        this.weatherData = new WeatherData();
        this.weatherData.name = data.city.name;

        //service returns forcast in intervals of 3 hours so 8*3=24 hours in a day
        for (var i = 7; i < data.list.length; i = i + 8) {
          var details = new WeatherDetails();
          details.date = data.list[i].dt_txt;
          //temperature is in K need to convert to F
          //note that the weather API is possibly returning same value for temp_min and temp_max
          details.maxTemperature = Math.round(((9 / 5) * (data.list[i].main.temp_max - 273)) + 32);
          details.minTemperature = Math.round(((9 / 5) * (data.list[i].main.temp_min - 273)) + 32);
          details.description = data.list[i].weather[0].description;
          if (details.description.includes('cloud')) {
            details.icon = 'clouds';
          }
          else if (details.description.includes('sun') || details.description.includes('clear')) {
            details.icon = 'sun';
          }
          else if (details.description.includes('snow')) {
            details.icon = 'snow';
          }
          else if (details.description.includes('rain')) {
            details.icon = 'rain';
          }
          else {
            details.icon = '';
          };
          this.weatherData.details.push(details);
        };
      });
  };
}
