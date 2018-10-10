import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Sign In please';
    this.user = new User('', '', '', '', '', 'USER', 'USER');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log( this.user );

    this._userService.signup( this.user ).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity);
        if ( !this.identity || !this.identity._id ) {
          this.status = 'error';
        } else if ( !this.identity.status ) {
          this.status = 'remenber';
        } else {
          localStorage.setItem( 'identity', JSON.stringify( this.identity ));

          this.getToken();
          if ( this.identity.role === 'USER_ROLE') {
            this._router.navigate(['/home']);
          } else {
            this._router.navigate(['/home-admin']);
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
  }

  getToken() {
    this._userService.signup( this.user, 'true' ).subscribe(
      response => {
        this.token = response.token;
        console.log( this.token );
        if ( this.token.length <= 0 ) {
          this.status = 'error';
        } else {
          localStorage.setItem( 'token', this.token );
          this.status = 'success';
        }
      }, error => {
        const errorMessage = <any>error;
        console.log( errorMessage );
        if ( errorMessage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

  newUser() {
    this._router.navigate(['/register']);
  }

}
