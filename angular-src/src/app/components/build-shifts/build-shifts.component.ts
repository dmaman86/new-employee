import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-build-shifts',
  templateUrl: './build-shifts.component.html',
  styleUrls: ['./build-shifts.component.css'],
  providers: [ UserService ]
})
export class BuildShiftsComponent implements OnInit {

  public identity;
  public fulldate;
  public weekAndyear: any;
  public status;
  public days;
  public shifts;
  public method;
  public week;
  public optionTeamLeader;
  public optionEmployee;
  public finalManagement;
  public dates;
  public selectedDay;
  public selectedDay1;
  public selectedShift;
  public selectedShift1;
  public employess;
  public selectedEmployess;
  public selectedSearch;
  public users: User[];
  public responseShift;
  public shiftUser;
  public checkId: boolean;
  public table: boolean;
  public test: boolean;
  public searchEm: any;
  public booSearchEm: boolean;
  public searchByPosition;
  public boolSearchPos;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.test = false;
    this.checkId = false;
    this.table = false;
    this.searchEm = [];
    this.booSearchEm = false;
    this.searchByPosition = [];
    this.boolSearchPos = false;
    this.weekAndyear = {};
    this.users = [];
    this.identity = this._userService.getIdentity();
    this.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.shifts = ['morning', 'afternoon', 'night'];
    this.employess = [
      { level: 'TEAM_LEADER', value: 1},
      { level: 'EMPLOYEE', value: 2}
    ];
  }

  ngOnInit() {
    if ( this.identity.role !== 'ADMIN_ROLE' ) {
      this._router.navigate(['/home']);
    }
    this.createObjects();
    this.getUsers();
    setTimeout( () => {
      console.log( this.users );
    }, 1000);

    this.getMethodShifts();
    this.resetWeek();
  }

  createObjects() {
    this.week = {};
    this.optionTeamLeader = {};
    this.optionEmployee = {};
    this.finalManagement = {};
    for ( const day of this.days ) {
      this.week[day] = {};
      this.optionTeamLeader[day] = {};
      this.optionEmployee[day] = {};
      this.finalManagement[day] = {};
      for ( const shift of this.shifts ) {
        this.week[day][shift] = [];
        this.optionTeamLeader[day][shift] = [];
        this.optionEmployee[day][shift] = [];
        this.finalManagement[day][shift] = [];
      }
    }
  }

  getUsers() {
    this._userService.getUsersToSearch().subscribe(
      response => {
        // console.log( response );
        if ( response.ok ) {
          this.users = response.users;
          // console.log( response.users );
          /*for ( let i = 0; i < response.users.length; i++ ) {
            const user = new User('', '', '', '', '', undefined, undefined, '');
            const temp = response.users[i];

            user._id = temp._id;
            user.name = temp.name;
            user.last_name = temp.last_name;
            user.nick_name = temp.nick_name;
            user.email = temp.email;
            user.level = temp.level;

            this.users.push( user );
          }*/
        }
      }, error => {
        console.log( error );
      }
    );
  }

  getMethodShifts() {
    this._userService.getValuesRequest().subscribe(
      response => {
        if ( response.ok ) {
          this.method = response.values.method;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  resetWeek() {
    this.fulldate = this._userService.getWeekNumber( new Date() );
    this.weekAndyear.year = this.fulldate[0];
    this.weekAndyear.week = this.fulldate[1];
    this.started();
  }

  incrementWeek( ) {
    this.weekAndyear.week++;

    if ( this.weekAndyear.week === 53 ) {
      this.weekAndyear.week = 1;
      this.weekAndyear.year++;
    }

    this.started();
  }

  decrementWeek() {
    this.weekAndyear.week--;

    if ( this.weekAndyear.week === 0 ) {
      this.weekAndyear.week = 52;
      this.weekAndyear.year--;
    }

    this.started();
  }

  started() {
    this.dates = this._userService.getDates( this.weekAndyear );
    this.getTempShifts(); // if we worked some shifts we need to show
    this.getAllShifts( this.weekAndyear ); // all shifts by next week
    setTimeout( () => {
      console.log( this.finalManagement );
      console.log( this.responseShift );
    }, 1000);

    setTimeout( () => {
      this.setNames( this.week ); // this.week -> json with all id by day and shift
    }, 1000);

    setTimeout( () => {
      console.log( this.week );
      console.log( this.optionEmployee );
      console.log( this.optionTeamLeader );
    }, 1000);
  }

  getTempShifts() {
    this._userService.getFinalManagement( this.weekAndyear ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          console.log( response.management );
          this.finalManagement = response.management;
          this.checkId = true;
          this.table = true;
        }
      }, error => {
        console.log( error );
        this.checkId = false;
      }
    );
  }

  getAllShifts( weekAndyear ) {
    this._userService.getAllRequest( weekAndyear ).subscribe(
      response => {
        if ( response.ok ) {
          // console.log( response.resp );
          this.responseShift = response.resp;
          this.searchPotentials( this.method, response.resp );
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

  searchPotentials( method, searchJson ) {
    // console.log( searchJson );
    let sh = [];
    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        for ( let i = 0; i < searchJson.length; i++ ) {
          const temp = searchJson[i];
          if ( method === 'open' ) {
            if ( temp[day][shift] === 'V' ) {
              // this.week[day][shift].push( this.getName( temp.emitter ) );
              sh.push( this.getName( temp.emitter ) );
              // this.week[day][shift][j] = this.getName( temp.emitter );
            }
          }
        }
        // this.week[day][shift] = new Array( sh.length );
        this.week[day][shift] = sh;
        sh  = [];
      }
    }
  }

  setNames( JsonWeek ) {
      // console.log( JsonWeek );
    let j = 0, k = 0;
    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        const temp = JsonWeek[day][shift];
        for ( let i = 0; i < temp.length; i++ ) {
          if ( temp[i].level === 'TEAM_LEADER' ) {
            this.optionTeamLeader[day][shift][j] = temp[i];
            j++;
          } else {
            this.optionEmployee[day][shift][k] = temp[i];
            k++;
          }
        }
        j = 0;
        k = 0;
      }
    }
  }

  searchShift() {
    const nick_name = this.selectedSearch;
    let tmp_user;
    let i;

    for ( let j = 0; j < this.users.length; j++ ) {
      const temp = this.users[j];
      if ( temp.nick_name === nick_name ) {
        tmp_user = temp;
        break;
      }
    }

    if ( this.responseShift.length > 0 ) {
      for ( i = 0; i < this.responseShift.length; i++ ) {
        const temp = this.responseShift[i];

        if ( tmp_user._id === temp.emitter ) {
          this.shiftUser = temp;
          break;
        }
      }

      if ( i === this.responseShift.length ) {
        this.shiftUser = undefined;
        this.status = 'no-exist';
      }

      if ( this.shiftUser !== undefined ) {
        this.shiftUser.emitter = this.getName( this.shiftUser.emitter );
        this.status = 'show';
      }

    } else {
      this.status = 'denied';
    }
  }

  getName( userId ) {
    // const user = new User('', '', '', '', '', undefined, undefined, '');
    const user = {
      _id: '',
      name: '',
      last_name: '',
      nick_name: '',
      email: '',
      level: ''
    };
    this._userService.getUser( userId ).subscribe(
      response => {
        if ( response.ok ) {
         user._id = response.user._id;
         user.name = response.user.name;
         user.last_name = response.user.last_name;
         user.nick_name = response.user.nick_name;
         user.email = response.user.email;
         user.level = response.user.level;
        }
      }, error => {
        console.log( error );
      }
    );

    return user;
  }

  add( day, shift ) {
    const list = document.getElementById('mat[' + day + '][' + shift + ']' );
    let max;

    if ( list.hasChildNodes() ) {
      max = list.childElementCount;
    } else {
      max = 0;
    }

    const newElement = document.createElement('LI');
    newElement.setAttribute('id', String(max));
    newElement.setAttribute('class', day + '' + shift );
    newElement.addEventListener('dragover', this.allowDrop, false);
    newElement.addEventListener('drop', this.drop, false);
    newElement.addEventListener('click', ( e: Event ) => {
      if ( (<HTMLElement>e.target) && (<HTMLElement>e.target).nodeName === 'I') {
        ( <HTMLElement>( <HTMLElement>e.target ).parentNode ).remove();
      }
    });
    newElement.innerHTML = '<i class="fas fa-minus-circle"></i>';
    this.finalManagement[day][shift] = new Array(max);
    list.appendChild( newElement );

  }

  remove(day, shift, index) {
    const list = document.getElementById('mat[' + day + '][' + shift + ']' );

    list.parentNode.removeChild( list[index] );

  }

  searchEmployess() {
    const dd = this.selectedDay;
    const sh = this.selectedShift;

    this.searchEm = this.week[dd][sh];
    this.booSearchEm = true;
  }

  showAll() {
    const level = this.selectedEmployess;
    const dd = this.selectedDay1;
    const sh = this.selectedShift1;

    if ( level === 'TEAM_LEADER' ) {
      this.searchByPosition = this.optionTeamLeader[dd][sh];
      this.boolSearchPos = true;
    } else {
      this.searchByPosition = this.optionEmployee[dd][sh];
      this.boolSearchPos = true;
    }
  }

  dragEnd(event, user: User, index) {
    /*console.log( event );
    console.log( user );
    console.log( index );
    console.log(this.selectedDay, this.selectedShift);*/
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    let boo;
    const data = ev.dataTransfer.getData('text');
    const x = document.getElementById(data);

    console.log( ev.target.nodeName );

    if ( ev.target.nodeName === 'I' ) {
      boo = false;
    } else {
      boo = true;
    }

    if ( !boo ) {
      ((ev.target).parentNode).innerText = x.innerText;
    } else {
      ev.target.innerText = x.innerText;
    }
  }

  autoBuild() {
    let i = 1;
    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        const temp = this.optionTeamLeader[day][shift];
        const cur = this.funcRanHead( temp );

        if ( typeof cur !== 'undefined' ) {
          this.finalManagement[day][shift][0] = cur;
        }
      }
    }

    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        const temp = this.optionEmployee[day][shift];
        // console.log( temp, day, shift );
        const max = this.countList( shift, day );
        const cur = this.funcRandEmployee( temp, max );

        // console.log( cur );
        if ( typeof cur !== 'undefined' ) {
          for ( let k = 0; k < cur.length; k++ ) {
            const current = cur[k];
            // console.log( current );
            this.finalManagement[day][shift][i] = current;
            // console.log( current );
            i++;
          }
          i = 1;
        }
      }
    }

    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        this.showInTable( this.finalManagement[day][shift], shift, day );
      }
    }
  }

  funcRanHead( teamLeader ) {
    if ( teamLeader.length === 0 ) {
      return;
    } else if ( teamLeader.length === 1 ) {
      return teamLeader[0];
    } else {
      const num = Math.floor( Math.random() * teamLeader.length );
      return teamLeader[num];
    }
  }

  countList( shift, day ) {
    const list = document.getElementById( 'mat[' + day + '][' + shift + ']' );
    return list.childElementCount - 1;
  }

  funcRandEmployee( employees, max ) {
    let num;
    const dump = [];

    if ( employees.length === 0 ) {
      return;
    } else if ( employees.length <= max ) {
      return employees;
    } else {
      let count = max;
      while ( count > 0 ) {
        if ( dump.length === 0 ) {
          num = Math.floor( Math.random() * employees.length );
          dump.push( employees[num] );
        } else {
          do {
            num = Math.floor( Math.random() * employees.length );
          }while ( dump.indexOf( employees[num] ) !== -1 );
          dump.push( employees[num] );
        }
        count--;
      }
      return dump;
    }
  }

  showInTable( finalManagement, shift, day ) {
    const list = document.getElementById('mat[' + day + '][' + shift + ']');

    // console.log( finalManagement );
    // console.log( finalManagement.length );

    for ( let i = 0; i < finalManagement.length; i++ ) {
      const user = finalManagement[i];
      // console.log( user );
      if ( user ) {
        list.children[i].innerHTML = user.nick_name;
      } else {
        list.children[i].innerHTML = '';
      }
    }
  }

  saveBuild() {

    this.checkObject();

    setTimeout( () => {
      console.log( this.finalManagement );

      if ( this.finalManagement._id ) {
        this._userService.updateFinalManagement( this.finalManagement ).subscribe(
          response => {
            if ( response.ok ) {
              this.status = 'update';
            }
          }, error => console.log( error )
        );
      } else {
        this._userService.saveFinalManagement( this.weekAndyear.week, this.weekAndyear.year, this.finalManagement ).subscribe(
          response => {
            if ( response.ok ) {
              this.status = 'success';
            }
          }, error => console.log( error )
        );
      }
    }, 1000);

  }

  checkObject() {
    let i = 0;
    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        const list = document.getElementsByClassName(day + '' + shift);

        for ( i = 0; i < list.length; i++ ) {
          // console.log( list[i].nodeName );

          this.finalManagement[day][shift][i] = {};
          for ( const user of this.users ) {
            if ( user.nick_name === list[i].innerHTML ) {
              this.finalManagement[day][shift][i] = user;
            }
          }
        }
      }
    }
  }
}
