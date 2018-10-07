import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ UserService ]
})
export class ContactsComponent implements OnInit {

  public title: string;
  public user: User;
  public temp_user: User;
  public users: User [] = [];
  public identity;
  public status;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'List Contacts';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.temp_user = new User('', '', '', '', '', '', '');
  }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      response => {
        console.log( response );
        for (let i = 0; i < response.users.length; i++) {
          this.users[i] = response.users[i];
        }
        console.log( this.users );
      }, error => {
        const errorMensage = <any>error;
        console.log(errorMensage);
        if ( errorMensage != null ) {
          this.status = 'error';
        }
      }
    );
  }

  editUser( userId ) {
    console.log(userId);
    this.status = 'edit';

    for (let i = 0; i < this.users.length; i++) {
      if ( this.users[i]._id === userId ) {
        this.temp_user._id = this.users[i]._id;
        this.temp_user.name = this.users[i].name;
        this.temp_user.last_name = this.users[i].last_name;
        this.temp_user.email = this.users[i].email;
        this.temp_user.role = this.users[i].role;
        this.temp_user.level = this.users[i].level;
      }
    }
  }

  deleteUser( userId ) {
    for (let i = 0; i < this.users.length; i++) {
      if ( this.users[i]._id === userId ) {
        this.temp_user._id = this.users[i]._id;
        this.temp_user.name = this.users[i].name;
        this.temp_user.last_name = this.users[i].last_name;
        this.temp_user.email = this.users[i].email;
        this.temp_user.role = this.users[i].role;
        this.temp_user.level = this.users[i].level;
      }
    }

    console.log( this.temp_user );
    this._userService.deleteUser( this.temp_user ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          window.location.reload();
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage != null) {
          this.status = 'error';
        }
      }
    );
  }

  onSubmit() {
    console.log( this.temp_user );
    this._userService.updateUser( this.temp_user ).subscribe(
      response => {
        console.log( response );
        if ( !response.ok ) {
          this.status = 'error';
        } else {
          this.status = 'success';
          window.location.reload();
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage != null) {
          this.status = 'error';
        }
      }
    );
  }

}
