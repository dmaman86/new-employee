import { Component, OnInit } from '@angular/core';
import { Shift } from '../../models/shift';
import { RequestWeekUser } from '../../models/requestWeek_user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-week',
  templateUrl: './user-week.component.html',
  styleUrls: ['./user-week.component.css'],
  providers: [ UserService ]
})
export class UserWeekComponent implements OnInit {

  public identity;
  public status: string;
  public count_morning: number;
  public count_afternoon: number;
  public count_night: number;
  public count_weekend: number;
  public week: any;
  public shifts: Shift;
  public requestUser: RequestWeekUser;
  public days: any[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  public shift: any[] = ['morning', 'afternoon', 'night'];
  public number_week: any;
  public dates: any[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.dates = [];
    this.requestUser = new RequestWeekUser('');
    this.identity = this._userService.getIdentity();
    this.count_morning = 0;
    this.count_afternoon = 0;
    this.count_night = 0;
    this.count_weekend = 0;
    this.week = [];

    for ( let i = 0; i < this.days.length; i++ ) {
      const tmp = this.days[i];
      this.week[tmp] = new Shift('', '', '');
    }
    this.number_week = this.getWeekNumber( new Date() );
    console.log( this.number_week );
    const d = new Date();
    console.log( this.number_week );
    this.dates = this.getFirstAndLastDates( this.number_week );
    console.log( this.dates );
  }

  ngOnInit() {
    this.requestUser.setId( this.identity._id );
    this.requestUser.setLevel( this.identity.level );
    this.requestUser.setNumberWeek( String(this.checkSunday( this.number_week[1] )));
    // this.requestUser.setNumberWeek( String(this.number_week[1]) );

    this._userService.getRequestUser( this.requestUser ).subscribe(
      response => {
        if ( !response.ok ) {
          alert( response.message );
        }
        if ( response.ok ) {
          console.log( response.request );
          if ( response.request ) {
            for ( let i = 0; i < this.days.length; i++ ) {
              const d = this.days[i];
              for ( let j = 0; j < this.shift.length; j++) {
                const s = this.shift[j];
                this.week[d][s] = response.request[d][s];
                this.updateValues(d, s);
              }
            }
          }
          if ( response.request.length > 0 ) {
            console.log( response.request );
            for ( let i = 0; i < this.days.length; i++ ) {
              const d = this.days[i];
              for ( let j = 0; j < this.shift.length; j++) {
                const s = this.shift[j];
                this.week[d][s] = response.request[d][s];
                this.updateValues(d, s);
              }
            }
          }
        }

      }, error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if ( errorMessage !== null ) {
          this.status = 'error';
        }
      }
    );
    this.checkDay();
  }

  getWeekNumber( full_date ) {
    // Copy date so don't modify original
    full_date = new Date(Date.UTC(full_date.getFullYear(), full_date.getMonth(), full_date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    full_date.setUTCDate(full_date.getUTCDate() + 4 - (full_date.getUTCDay() || 7));
    // Get first day of year
    const yearStart: any = new Date(Date.UTC(full_date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(( ( (full_date - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [full_date.getUTCFullYear(), weekNo + 1];
  }

  getFirstAndLastDates( numberWeek ) {
    // const moment = require('moment');
    const year = numberWeek[0];
    let week = numberWeek[1];
    const dates = [];

    const day = new Date().getDay();

    if ( day === 0 ) {
      week++;
    }
    console.log( week );

    for ( let i = 0; i < this.days.length; i++) {
      const d = this.days[i];
      const test = moment().day(d).year(year).week(week).toDate();
      dates[d] = test;
    }
    console.log( dates );
    return dates;
  }

  setValue( day, per ) {

    switch (per) {
      case 'morning':
        if ( this.week[day][per] === 'V' ) {
          break;
        } else if ( day === 'saturday') {
          this.week[day][per] = 'V';
          this.count_weekend++;
          break;
        } else {
          this.week[day][per] = 'V';
          this.count_morning++;
          break;
        }
      case 'afternoon':
        if ( this.week[day][per] === 'V' ) {
          break;
        } else if ( day === 'friday' || day === 'saturday' ) {
          this.week[day][per] = 'V';
          this.count_weekend++;
          break;
        } else {
          this.week[day][per] = 'V';
          this.count_afternoon++;
          break;
        }
      case 'night':
        if ( this.week[day][per] === 'V' ) {
          break;
        } else if ( day === 'friday' || day === 'saturday' ) {
          this.week[day][per] = 'V';
          this.count_weekend++;
          break;
        } else {
          this.week[day][per] = 'V';
          this.count_night++;
          break;
        }
    }
    console.log( this.week );
    console.log( this.count_morning, this.count_afternoon, this.count_night, this.count_weekend );
  }

  resetValue( day, per ) {
    switch (per) {
      case 'morning':
        this.week[day][per] = '';
        if ( day === 'saturday' ) {
          this.count_weekend--;
        } else {
          this.count_morning--;
        }
        break;
      case 'afternoon':
        this.week[day][per] = '';
        if (day === 'friday' || day === 'saturday') {
          this.count_weekend--;
        } else {
          this.count_afternoon--;
        }
        break;
      case 'night':
        this.week[day][per] = '';
        if (day === 'friday' || day === 'saturday') {
          this.count_weekend--;
        } else {
          this.count_night--;
        }
        break;
    }
    console.log( this.week );
    console.log( this.count_morning, this.count_afternoon, this.count_night, this.count_weekend );
  }

  sendValues() {
    if (  this.count_morning > 0 &&
      this.count_afternoon > 1 &&
      this.count_night > 1 &&
      this.count_weekend > 0 ) {

        for ( let i = 0; i < this.days.length; i++ ) {
          const d = this.days[i];
          for ( let j = 0; j < this.shift.length; j++ ) {
            const s = this.shift[j];
            this.requestUser.setShift( d, s, this.week[d][s] );
          }
        }

        this.status = 'success';

        if ( this.status === 'success') {
          this.count_morning = 0;
          this.count_afternoon = 0;
          this.count_night = 0;
          this.count_weekend = 0;
        }

        this._userService.saveRequestUser( this.requestUser ).subscribe(
          response => {
            if ( response.ok ) {
              for ( let i = 0; i < this.days.length; i++ ) {
                const d = this.days[i];
                for ( let j = 0; j < this.shift.length; j++) {
                  const s = this.shift[j];
                  this.week[d][s] = response.requestUser[d][s];
                  this.updateValues(d, s);
                }
              }
              window.location.reload();
            }
          }, error => {
          const errorMessage = <any>error;
          console.log(errorMessage);
          if ( errorMessage !== null ) {
            this.status = 'error';
          }
        }
        );
      } else {
        this.status = 'error';
      }
  }

  updateValues( d, s ) {
    switch (s) {
      case 'morning':
      if ( d === 'saturday' ) {
        if ( this.week[d][s] === 'V' ) {
          this.count_weekend++;
        }
        break;
      } else if ( this.week[d][s] === 'V' ) {
        this.count_morning++;
        break;
      }
      break;
      case 'afternoon':
      if ( d === 'friday' || d === 'saturday' ) {
        if ( this.week[d][s] === 'V' ) {
          this.count_weekend++;
        }
        break;
      } else if ( this.week[d][s] === 'V' ) {
        this.count_afternoon++;
        break;
      }
      break;
      case 'night':
      if ( d === 'friday' || d === 'saturday' ) {
        if ( this.week[d][s] === 'V' ) {
          this.count_weekend++;
        }
        break;
      } else if ( this.week[d][s] === 'V' ) {
        this.count_night++;
        break;
      }
      break;
    }
  }

  checkDay() {
    const d  = new Date();
    const day = d.getDay();
    const hour = d.getHours();

    if ( day > 3 ) {
      if ( hour > 9 ) {
        console.log( `you can't send`);
        this.status = 'denied';
      }
    } else {
      console.log( 'you can send' );
      this.status = 'send';
    }
  }

  checkSunday( numberWeek: number ) {
    const day = new Date().getDay();
    if ( day === 0 ) {
      numberWeek++;
    }
    return numberWeek;
  }

}
