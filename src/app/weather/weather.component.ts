import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentData } from '../current-data';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  zipcode: string = '';
  currentDetails: CurrentData = new CurrentData();
  ListDetails: Array<CurrentData> = new Array<CurrentData>();
  listOfzip: string[] = [];

  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit(): void {

    //get updated array of zipcodes from localstorage
    const var1 = localStorage.getItem('zipcodes');

    if (var1 != null) {
      this.listOfzip = JSON.parse(var1);
    }
    else {
      this.listOfzip = [];
    };

    for (let zip of this.listOfzip) {

      this.weatherService.getZipInfo(zip).subscribe(async data => {

        await this.fillData(data, zip);

      });
    };

  }
  onAddLocation() {

    if ((this.listOfzip.includes(this.zipcode))) {
      alert('Zipcode already present');
    }
    else{

      //adds zipcode to a local array
      this.listOfzip.push(this.zipcode);

      this.currentDetails = new CurrentData();
      this.weatherService.getZipInfo(this.zipcode).subscribe(data => {
        //add data from API to currentDetails which is an instance of CurrentData
        this.currentDetails.cityName = data.name;
        this.currentDetails.description = data.weather[0].description;
        //temperature is in K need to convert to F
        this.currentDetails.currentTemperature = Math.round(((9/5)*(data.main.temp-273))+32);
        this.currentDetails.maxTemperature =Math.round(((9/5)*(data.main.temp_max-273))+32);
        this.currentDetails.minTemperature = Math.round(((9/5)*(data.main.temp_min-273))+32);
        this.currentDetails.zipcode = this.zipcode;

        if (this.currentDetails.description.includes('cloud')) {
          this.currentDetails.icon = 'clouds';
        }
        else if (this.currentDetails.description.includes('sun') || this.currentDetails.description.includes('clear')) {
          this.currentDetails.icon = 'sun';
        }
        else if (this.currentDetails.description.includes('snow')) {
          this.currentDetails.icon = 'snow';
        }
        else if (this.currentDetails.description.includes('rain')) {
          this.currentDetails.icon = 'rain';
        }
        else {
          this.currentDetails.icon = '';
        };
        this.ListDetails.push(this.currentDetails);
        //save updated array to localstorage
        localStorage.setItem("zipcodes", JSON.stringify(this.listOfzip));

      });

    };
  };

//remove element that was deleted
  remove(index: number) {
    this.ListDetails.splice(index, 1);
    this.listOfzip.splice(index, 1);
    //save updated array to local storage
    localStorage.setItem("zipcodes", JSON.stringify(this.listOfzip));
  };

//route to forecast component
  goToLink(zip: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/forecast', zip])
    );
    window.close();
    window.open(url, '_blank');
  };

//fill data from the subscribe function
  fillData(data: any, zip: string): void {
    this.currentDetails = new CurrentData();
    this.currentDetails.cityName = data.name;
    this.currentDetails.description = data.weather[0].description;
     //temperature is in K need to convert to F
     this.currentDetails.currentTemperature = Math.round(((9/5)*(data.main.temp-273))+32);
     this.currentDetails.maxTemperature =Math.round(((9/5)*(data.main.temp_max-273))+32);
     this.currentDetails.minTemperature = Math.round(((9/5)*(data.main.temp_min-273))+32);
    this.currentDetails.zipcode = zip;

    if (this.currentDetails.description.includes('cloud')) {
      this.currentDetails.icon = 'clouds';
    }
    else if (this.currentDetails.description.includes('sun') || this.currentDetails.description.includes('clear')) {
      this.currentDetails.icon = 'sun';
    }
    else if (this.currentDetails.description.includes('snow')) {
      this.currentDetails.icon = 'snow';
    }
    else if (this.currentDetails.description.includes('rain')) {
      this.currentDetails.icon = 'rain';
    }
    else {
      this.currentDetails.icon = '';
    };

    this.ListDetails.push(this.currentDetails);

  };
}
