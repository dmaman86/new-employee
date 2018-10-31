import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UserService ]
})
export class HomeComponent implements OnInit {

  public user: User;
  public message: Message;
  public text: any;
  public messages: string[];
  public idenity;
  public token;
  public status: string;
  public textDate: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.messages = [];
    this.user = this._userService.getIdentity();
    this.idenity = this.user;
    this.message = new Message('', '', '');
  }

  ngOnInit() {
    // console.log( this.user );
    setTimeout( () => {
      this.showMessage();
    }, 1000);
  }

  showMessage() {
    this._userService.getMessage().subscribe(
      response => {
        if ( !response.ok ) {
          document.getElementById('demo').innerHTML = 'No messages to show';
        }
        if ( response.ok ) {
          // console.log( response.message );
          this.message._id = response.message._id;
          this.message.text = response.message.text;
          this.message.date = response.message.created_at;
          this.textDate = moment.unix( response.message.created_at ).format('LLLL');

          document.getElementById('demo').innerHTML = this.message.text;
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
