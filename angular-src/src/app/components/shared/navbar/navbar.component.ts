import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [ UserService ]
})
export class NavbarComponent implements OnInit, DoCheck {

  public title: string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Employee Management Application';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);

    if ( !this.identity ) {
      this._router.navigate(['/login']);
    }
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  comeBack() {
    if ( this.identity.role === 'ADMIN_ROLE' ) {
      this._router.navigate(['/home-admin']);
    }
    if ( this.identity.role === 'USER_ROLE' ) {
      this._router.navigate(['/home']);
    }
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

}
