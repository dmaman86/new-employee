import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  	.ng-invalid.ng-touched:not(form){
  		border: 1px solid red;
  	}
  `],
  providers: [ UserService ]
})
export class RegisterComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public tempPassword;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Sign-Up';
    this.user = new User('', '', '', '', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit( form ) {
    // console.log( form.value );
    if ( form.value.password !== form.value.password2 ) {
      this.status = 'denied';
      form.reset();
    } else {
      this.signup( this.user );
      form.reset();
    }
  }

  signup( user: User ) {
    console.log( user );
    this._userService.register( user ).subscribe(
      response => {
        console.log( response );
        if (response.user && response.user._id) {
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }
}
