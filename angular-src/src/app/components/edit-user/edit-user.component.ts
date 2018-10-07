import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [ UserService ]
})
export class EditUserComponent implements OnInit {

  public title: string;
  public user: User;
  public temp: User;
  public identity;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Update Data';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.temp = new User('', '', '', '', '', '', '');
   }

  ngOnInit() {
  }

  onSubmit( form ) {
    console.log( this.user );
    this.temp = this.user;
    this._userService.updateUser( this.user ).subscribe(
      response => {
        console.log(response);
        if ( response.ok ) {
          this.identity = response.user;
          localStorage.setItem( 'identity', JSON.stringify( this.identity ));
          if ( this.identity.role === 'USER_ROLE') {
            this._router.navigate(['/home']);
          } else {
            this._router.navigate(['/home-admin']);
          }
        }
      }, error => {
        const errorMensage = <any>error;
        console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

}
