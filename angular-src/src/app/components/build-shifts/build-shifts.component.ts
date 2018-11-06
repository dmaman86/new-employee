import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-build-shifts',
  templateUrl: './build-shifts.component.html',
  styleUrls: ['./build-shifts.component.css'],
  providers: [ UserService ]
})
export class BuildShiftsComponent implements OnInit {

  public indentity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.indentity = this._userService.getIdentity();
  }

  ngOnInit() {
    if ( this.indentity.role !== 'ADMIN_ROLE' ) {
      this._router.navigate(['/home']);
    }
  }

}
