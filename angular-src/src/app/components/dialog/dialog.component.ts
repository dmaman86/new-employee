import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RequestWeek } from '../../models/requestWeek';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [ UserService ]
})
export class DialogComponent implements OnInit {

  public requestWeek: RequestWeek;
  public title;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userSerive: UserService
  ) {
    this.title = 'Update Request Week';
    this.requestWeek = new RequestWeek('', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log( this.requestWeek );
  }

}
