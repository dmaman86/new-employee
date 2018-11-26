import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-show-shifts',
  templateUrl: './show-shifts.component.html',
  styleUrls: ['./show-shifts.component.css']
})
export class ShowShiftsComponent implements OnInit {

  public full_date;
  public weekAndyear: any;
  public finalManagement;
  public days;
  public shifts;
  public dates;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.shifts = ['morning', 'afternoon', 'night'];
    this.weekAndyear = {};
  }

  ngOnInit() {
    this.full_date = this._userService.getWeekNumber( new Date() );
    this.weekAndyear.year = this.full_date[0];
    this.weekAndyear.week = this.full_date[1];

    this.getShifts( this.weekAndyear );
    setTimeout( () => {
      // console.log( this.finalManagement );
      // console.log( this.status );
    }, 1000 );
    this.dates = this.getDates( this.weekAndyear );
  }

  getDates( yearAndweek ) {
    const year = yearAndweek.year;
    const week = yearAndweek.week;
    const dates = [];

    for ( const day of this.days ) {
      const temp = moment().day( day ).year( year ).week( week ).toDate();
      dates[day] = temp;
    }
    return dates;
  }

  getShifts( weekAndyear ) {
    this._userService.getFinalManagement( weekAndyear ).subscribe(
      response => {
        // console.log( response );
        if ( response.ok ) {
          this.finalManagement = response.management;
          this.status = 'success';
        }
      }, error => {
        this.status = 'rejected';
        console.log( error );
      }
    );
  }

}
