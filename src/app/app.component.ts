import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  constructor(private router: Router) { };
  ngOnInit() {
    //If this is called from forecast component no need to display weather
    if (!(window.location.href.includes('forecast'))) {
      this.router.navigateByUrl('/weather');
    };
  }
}
