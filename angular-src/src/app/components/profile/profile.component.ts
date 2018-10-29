import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ UserService ]
})
export class ProfileComponent implements OnInit {

  public identity;
  public url;
  public dateString;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    // console.log( this.identity );
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.dateString = moment.unix(this.identity.createdAt).format('MM/DD/YYYY');
    // console.log( this.dateString);
  }

  returnHome() {
    if ( this.identity.role === 'ADMIN_ROLE' ) {
      this._router.navigate(['/home-admin']);
    }
    if ( this.identity.role === 'USER_ROLE' ) {
      this._router.navigate(['/home']);
    }
  }

  editProfile() {
    this._router.navigate(['/edit-user']);
  }

}
