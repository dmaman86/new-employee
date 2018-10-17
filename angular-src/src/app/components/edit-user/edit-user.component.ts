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
    // console.log( form.value );
    // console.log( this.user );
    // this.temp = this.user;
    this.user.name = form.value.name;
    this.user.last_name = form.value.last_name;
    this.user.email = form.value.email;
    if ( form.value.password === undefined ) {
      this.user.password = '';
    } else {
      this.user.password = form.value.password;
    }
    // console.log( this.user );
    this._userService.updateUser( this.user ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          this.identity = response.user;
          localStorage.setItem( 'identity', JSON.stringify( this.identity ));
          /*if ( this.identity.role === 'USER_ROLE') {
            this._router.navigate(['/home']);
          } else {
            this._router.navigate(['/home-admin']);
          }*/
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
}
