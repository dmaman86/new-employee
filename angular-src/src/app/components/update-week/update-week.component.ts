import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RequestWeek } from '../../models/requestWeek';
import { UserService } from '../../services/user.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Update Week Request';
    this.requestWeek = new RequestWeek('', '', '', '', '', '');
    this.week = this._userService.getWeekId();
  }

  ngOnInit() {
    // console.log( this.week );
  }

  onSubmit() {
    // console.log( this.requestWeek );
    // console.log( this.week );

    if ( !this.week ) {
      this._userService.setValuesRequest( this.requestWeek ).subscribe(
        response => {
          if ( response.ok ) {
            // console.log( response.week );
            localStorage.setItem( 'week', JSON.stringify( response.week._id ));
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
      this._userService.updateValuesRequest( this.week, this.requestWeek ).subscribe(
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
