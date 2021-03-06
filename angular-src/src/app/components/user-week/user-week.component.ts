import { Component, OnInit } from '@angular/core';
import { Shift } from '../../models/shift';
import { RequestWeekUser } from '../../models/requestWeek_user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { RequestWeek } from '../../models/requestWeek';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';
import swal from 'sweetalert2';

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
  public requestWeek: RequestWeek;
  public message: string;
  public weekAndyear: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.dates = [];
    this.requestUser = new RequestWeekUser('', '');
    this.requestWeek = new RequestWeek('', '', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.count_morning = 0;
    this.count_afternoon = 0;
    this.count_night = 0;
    this.count_weekend = 0;
    this.week = [];
    this.message = '';
    this.weekAndyear = {};

    for ( let i = 0; i < this.days.length; i++ ) {
      const tmp = this.days[i];
      this.week[tmp] = new Shift('', '', '');
    }


  }

  ngOnInit() {
    this.number_week = this._userService.getWeekNumber( new Date() ); // [0] = year, [1]= number next week
    this.weekAndyear.year = this.number_week[0];
    this.weekAndyear.week = this.number_week[1];
    // console.log( this.number_week );
    // this.dates = this.getFirstAndLastDates( this.number_week );
    this.dates = this._userService.getDates( this.weekAndyear );
    // console.log( this.dates );
    this.setValuesRequest();
    // console.log( this.number_week[1] );
    const nWeek = this.checkSunday( this.weekAndyear.week );
    // console.log( nWeek );
    this.requestUser.setEmitter( this.identity._id );
    this.requestUser.setNumberWeek( String( nWeek ) );
    this.requestUser.setYear( String( this.weekAndyear.year ) );

    setTimeout( () => {
      this.shiftsUser( this.requestUser );
      this.checkDay();
    }, 2000);
  }

  shiftsUser( requestUser: RequestWeekUser ) {
    this._userService.getRequestUser( requestUser ).subscribe(
      response => {
        if ( response.ok ) {
          // console.log( response.request );
          if ( !response.request ) {
            // alert('no exist shift for this user');
            // this.status = 'no-request';
          } else {
            if ( response.request ) {
              this.requestUser.setId( response.request._id );
              this.requestUser.setMessage( response.request.message );
              this.message = response.request.message;
              for ( let i = 0; i < this.days.length; i++ ) {
                const d = this.days[i];
                for ( let j = 0; j < this.shift.length; j++) {
                  const s = this.shift[j];
                  this.showShifts( response.request[d][s], d, s );
                  this.requestUser.setShift( d, s, response.request[d][s]);
                  setTimeout( () => {
                    this.updateValues(d, s);
                  }, 1000);
                  // this.updateValues(d, s);
                }
              }
            }
            if ( response.request.length > 0 ) {
              this.requestUser.setId( response.request._id );
              for ( let i = 0; i < this.days.length; i++ ) {
                const d = this.days[i];
                for ( let j = 0; j < this.shift.length; j++) {
                  const s = this.shift[j];
                  this.showShifts( response.request[d][s], d, s );
                  this.requestUser.setShift( d, s, response.request[d][s]);
                  setTimeout( () => {
                    this.updateValues(d, s);
                  }, 1000);
                  // this.updateValues(d, s);
                }
              }
            }
          }
        }
      }, error => {
        const errorMessage = <any>error;
        // console.log(errorMessage);
        if ( errorMessage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

  showShifts( weekShift, day, shift ) {
    if ( this.requestWeek.method === 'open' ) {
      if ( weekShift === 'V' ) {
        this.week[day][shift] = weekShift;
        document.getElementById(day + '.' + shift).style.backgroundColor = '#9ad17c';
      }
    }
  }

  setValue( day, per ) {
    // console.log( this.week[day][per] );
    // console.log( document.getElementById(day + '.' + per) );
    if (this.requestWeek.method === 'open' ) {
      if ( this.week[day][per] === 'V' ) {
        this.resetValue(day, per);
      } else {
        this.week[day][per] = 'V';
        document.getElementById(day + '.' + per).style.backgroundColor = '#9ad17c';
        this.requestUser.setShift( day, per, 'V' );
        this.updateValues( day, per );
      }
    }
    // console.log( this.week );
    // console.log( this.count_morning, this.count_afternoon, this.count_night, this.count_weekend );
  }

  resetValue( day, per ) {
    // console.log( document.getElementById(day + '.' + per) );
    if ( this.requestWeek.method === 'open' ) {
      document.getElementById(day + '.' + per).style.backgroundColor = '#d1d1d1';
      this.week[day][per] = '';
      this.requestUser.setShift( day, per, '' );
    }
    switch (per) {
      case 'morning':
        // this.week[day][per] = '';
        if ( day === 'saturday' ) {
          this.count_weekend--;
        } else {
          this.count_morning--;
        }
        break;
      case 'afternoon':
        // this.week[day][per] = '';
        if (day === 'friday' || day === 'saturday') {
          this.count_weekend--;
        } else {
          this.count_afternoon--;
        }
        break;
      case 'night':
        // this.week[day][per] = '';
        if (day === 'friday' || day === 'saturday') {
          this.count_weekend--;
        } else {
          this.count_night--;
        }
        break;
    }
    // console.log( this.week );
    // console.log( this.count_morning, this.count_afternoon, this.count_night, this.count_weekend );
  }

  sendValues() {
    // console.log( this.message );
    if ( this.requestWeek.method === 'open') {
      if ( this.count_morning >= Number( this.requestWeek.morning )
          && this.count_afternoon >= Number( this.requestWeek.afternoon )
          && this.count_night >= Number( this.requestWeek.night )
          && this.count_weekend >= Number( this.requestWeek.weekend ) ) {

        this.requestUser.setMessage( this.message );

        this.status = 'success';

        if ( this.status === 'success') {
          this.count_morning = 0;
          this.count_afternoon = 0;
          this.count_night = 0;
          this.count_weekend = 0;
        }

        const requestId = this.requestUser.getId();
        // console.log( requestId );

        if ( requestId.length <= 0 ) {
          // console.log( this.requestUser );
          this._userService.saveRequestUser( this.requestUser ).subscribe(
            response => {
              if ( response.ok ) {
                this.getSuccess('Submitted successfully');
              }
            }, error => {
              const errorMessage = <any>error;
              // console.log(errorMessage);
              if ( errorMessage !== null ) {
                this.status = 'error';
              }
            }
          );
        } else {
          // console.log( this.requestUser );
          this._userService.updateRequestUser( this.requestUser ).subscribe(
            response => {
              if ( !response.ok ) {
                this.status = response.message;
              } else {
                this.getSuccess('You have updated your shifts');
              }
            }, error => {
              const errorMessage = <any>error;
              // console.log(errorMessage);
              if ( errorMessage !== null ) {
                this.status = 'error';
              }
            }
          );
        }
      } else {
        this.status = 'error';
      }
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

    // console.log( day );

    if ( day >= Number( this.requestWeek.last_day ) ) {
        console.log( `you can't send`);
        document.getElementById('btn-send').style.display = 'none';
        this.status = 'denied';
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

  setValuesRequest() {
    this._userService.getValuesRequest().subscribe(
      response => {
        if ( response.ok ) {
          // console.log( response.values );
          this.requestWeek._id = response.values._id;
          this.requestWeek.method = response.values.method;
          this.requestWeek.last_day = response.values.last_day;
          this.requestWeek.morning = response.values.morning;
          this.requestWeek.afternoon = response.values.afternoon;
          this.requestWeek.night = response.values.night;
          this.requestWeek.weekend = response.values.weekend;


          // console.log( this.requestWeek );
        }
      }, error => {
        const errorMessage = <any>error;
        // console.log(errorMessage);
        if ( errorMessage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

  getSuccess( title: string ) {
    swal({
      position: 'top',
      type: 'success',
      title: title,
      showConfirmButton: false,
      timer: 5000
    });
    setTimeout( () => {
      window.location.reload();
    }, 2000);
  }

}
