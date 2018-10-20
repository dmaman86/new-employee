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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Update Week Request';
    this.requestWeek = new RequestWeek('', '', '', '', '', '');
    // this.week = this._userService.getWeekId();
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
    // console.log( this.requestWeek );
    // console.log( this.week );

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
