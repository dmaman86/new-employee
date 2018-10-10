import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
  providers: [ UserService ]
})
export class HomeAdminComponent implements OnInit {

  public user: User;
  public identity;
  public text: Message;
  public message: Message;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.text = new Message('', '' , '');
    this.message = new Message('', '', '');
  }

  ngOnInit() {
    this.refreshTextArea();
  }

  onSubmit( form ) {
    console.log( form.value );
    this.text.text = form.value.text;
    console.log( this.text );

    this._userService.sendMessage( this.text ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          this.status = 'success';
          form.reset();
          this.refreshTextArea();
        }
      }, error => {
        console.log( <any>error );
      }
    );
  }

  refreshTextArea() {
    this._userService.getMessage().subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          this.message._id = response.message._id;
          this.message.text = response.message.text;
          this.message.date = response.message.created_at;
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

  deleteMessage() {
    console.log( this.message._id );
    this._userService.deleteMessage( this.message._id ).subscribe(
      response => {
        console.log( response );
        this.refreshTextArea();
      }, error => {
        const errorMessage = <any>error;
        console.log(errorMessage);
        if ( errorMessage !== null ) {
          this.status = 'error';
        }
      }
    );
  }

}
