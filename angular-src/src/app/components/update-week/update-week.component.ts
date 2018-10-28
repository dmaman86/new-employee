import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestWeek } from '../../models/requestWeek';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-week',
  templateUrl: './update-week.component.html',
  styleUrls: ['./update-week.component.css'],
  providers: [ UserService ]
})
export class UpdateWeekComponent implements OnInit {

  public title: string;
  public status;
  public requestWeek: RequestWeek;
  public week;
  public days: any[];
  public method: any[];
  public selectedMethod;
  public selectedDay;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Update Week Request';
    this.requestWeek = new RequestWeek('', '', '', '', '', '', '');
    // this.week = this._userService.getWeekId();
    this.selectedMethod = '';
    this.selectedDay = '';
    this.days = [
      { id: 1, name: 'sunday'},
      { id: 2, name: 'monday'},
      { id: 3, name: 'tuesday'},
      { id: 4, name: 'wednesday'},
      { id: 5, name: 'thursday'},
      { id: 6, name: 'friday'},
      { id: 7, name: 'saturday'}
    ];
    this.method = [
      { id: 0, name: 'open' },
      { id: 1, name: 'block' }
    ];
  }

  ngOnInit() {
    // console.log( this.week );
    this._userService.getValuesRequest().subscribe(
      response => {
        console.log( response.values );
        if ( !response.ok ) {
          this.status = response.message;
        }
        if ( response.values ) {
          this.requestWeek._id = response.values._id;
          this.requestWeek.morning = response.values.morning;
          this.requestWeek.afternoon = response.values.afternoon;
          this.requestWeek.night = response.values.night;
          this.requestWeek.weekend = response.values.weekend;
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

  onSubmit() {
    // console.log( this.selectedMethod );
    // console.log( this.selectedDay );
    this.requestWeek.method = this.selectedMethod;
    this.requestWeek.last_day = this.selectedDay;
    // console.log( this.requestWeek );
    if ( this.requestWeek._id.length <= 0 ) {
      this._userService.setValuesRequest( this.requestWeek ).subscribe(
        response => {
          if ( response.ok ) {
            // console.log( response.week );
            // localStorage.setItem( 'week', JSON.stringify( response.week._id ));
            this.status = 'success';
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
      this._userService.updateValuesRequest( this.requestWeek._id, this.requestWeek ).subscribe(
        response => {
          if ( response.ok ) {
            this.status = 'success';
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
  }

}
