import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import swal from 'sweetalert2';

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
  public tempPassword: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Update profile';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.temp = new User('', '', '', '', '', '', '', '');
   }

  ngOnInit() {
  }

  onSubmit( form ) {
    // console.log( form.value );
    // console.log( this.user );

    if (  form.value.password !== form.value.password2 ) {
      this.status = 'denied';
      form.value.password = '';
      form.value.password2 = '';
    } else {
      if ( form.value.password === undefined ) {
        this.user.password = '';
      } else {
        this.user.password = form.value.password;
      }
      this.sendUpdate( this.user );
    }
  }

  sendUpdate( user: User ) {
    // console.log( user );
    this._userService.updateUser( user ).subscribe(
      response => {
        // console.log( response );
        if ( response.ok ) {
          this.identity = response.user;
          localStorage.setItem( 'identity', JSON.stringify( this.identity ));
          swal({
            position: 'top',
            type: 'success',
            title: 'You have updated your data',
            showConfirmButton: false,
            timer: 5000
          });
          setTimeout( () => {
            if ( this.identity.role === 'USER_ROLE') {
              this._router.navigate(['/home']);
            } else {
              this._router.navigate(['/home-admin']);
            }
          }, 2000);
        }
      }, error => {
        const errorMensage = <any>error;
        // console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

  backHome() {
    if ( this.identity.role === 'USER_ROLE') {
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/home-admin']);
    }
  }
}
