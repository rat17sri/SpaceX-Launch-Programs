import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LaunchSearchCriteria } from './services/launch/launch-search-criteria';
import { LaunchService } from './services/launch/launch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly limit = 100;

  filtersYear: Array<number> = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  filtersSuccess: Array<number> = [0, 1];
  allSpaceXLaunches: Array<any> = [];

  allLaunchesSubscription: Subscription;

  activeYear: number;
  activeLaunch: number;
  activeLanding: number;

  loading = false;

  constructor(private launchService: LaunchService) {}

  ngOnInit(): void {
    this.getAllLaunchesData();
  }

  private getAllLaunchesData(): void {
    this.allSpaceXLaunches = [];
    this.loading = true;
    const options: LaunchSearchCriteria = Object.assign(new LaunchSearchCriteria(), {
      limit: this.limit,
      launch_success: this.activeLaunch ? true : false,
      land_success: this.activeLanding ? true : false,
      launch_year: this.activeYear
    });
    this.allLaunchesSubscription = this.launchService.getAllLaunches(options).subscribe(response => {
      this.loading = false;
      this.allSpaceXLaunches = [...response];
    });
  }

  onYearFilter(year: number): void {    
    this.activeYear = year;
    this.getAllLaunchesData();
  }

  onLaunchFilter(value: number): void {
    this.activeLaunch = value;
    this.getAllLaunchesData();
  }

  onLandingFilter(value: number): void {
    this.activeLanding = value;
    this.getAllLaunchesData();
  }

  ngOnDestroy(): void {
    this.allLaunchesSubscription.unsubscribe();
  }

}
