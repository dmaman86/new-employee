import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import swal from 'sweetalert2';

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
  public users: User [];
  public usersToSearch: User [];
  public identity;
  public status;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public url: string;
  public values: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'List Contacts';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.temp_user = new User('', '', '', '', '', '', '');
    this.values = '';
    this.usersToSearch = [];
    this.users = [];
  }

  ngOnInit() {
    this.newGetUsers();
    console.log( this.newGetUsers() );
  }

  currentPage() {
    this._route.params.subscribe( params => {
      let page = params['page'];
      this.page = page;

      if ( !params['page'] ) {
        page = 1;
      }

      if ( !page ) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if ( this.prev_page <= 0 ) {
          this.prev_page = 1;
        }
      }
      this.getUsers( page );
    });
  }

  newGetUsers() {
    this._userService.getUsersToSearch().subscribe(
      response => {
        if ( response.ok ) {
          console.log( response.users );
          this.usersToSearch = response.users;
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

  getUsers( page ) {
    this._userService.getUsers( page ).subscribe(
      response => {
        console.log( response );
        if ( !response.users ) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;

          if ( page > this.pages ) {
            this._router.navigate(['/contacts', 1]);
          }
        }
      }, error => {
        const errorMensage = <any>error;
        console.log( errorMensage );

        if ( errorMensage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

  editUser( userId ) {
    console.log(userId);
    this.status = 'edit';

    console.log( this.usersToSearch );

    for (let i = 0; i < this.usersToSearch.length; i++) {
      if ( this.usersToSearch[i]._id === userId ) {
        this.temp_user._id = this.usersToSearch[i]._id;
        this.temp_user.name = this.usersToSearch[i].name;
        this.temp_user.last_name = this.usersToSearch[i].last_name;
        this.temp_user.email = this.usersToSearch[i].email;
        this.temp_user.role = this.usersToSearch[i].role;
        this.temp_user.level = this.usersToSearch[i].level;
      }
    }

    console.log( this.temp_user );
  }

  deleteUser( userId ) {
    for (let i = 0; i < this.usersToSearch.length; i++) {
      if ( this.usersToSearch[i]._id === userId ) {
        this.temp_user._id = this.usersToSearch[i]._id;
        this.temp_user.name = this.usersToSearch[i].name;
        this.temp_user.last_name = this.usersToSearch[i].last_name;
        this.temp_user.email = this.usersToSearch[i].email;
        this.temp_user.role = this.usersToSearch[i].role;
        this.temp_user.level = this.usersToSearch[i].level;
      }
    }

    console.log( this.temp_user );
    this._userService.deleteUser( this.temp_user ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          swal({
            position: 'top-end',
            type: 'success',
            title: 'User was delete',
            showConfirmButton: false,
            timer: 5000
          });
          setTimeout( () => {
            window.location.reload();
          }, 2000);
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
          swal({
            position: 'top-end',
            type: 'success',
            title: 'User was update',
            showConfirmButton: false,
            timer: 5000
          });
          setTimeout( () => {
            window.location.reload();
          }, 2000);
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

  onKey(event: any) { // without type info
    this.values = event.target.value;
    console.log( this.usersToSearch );
    let filter, table, tr, td;
    table = document.getElementById('myTable');
    filter = this.values.toUpperCase();
    console.log( filter );
    tr = table.getElementsByTagName('tr');

    for ( let i = 0; i < tr.length; i++ ) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

}
