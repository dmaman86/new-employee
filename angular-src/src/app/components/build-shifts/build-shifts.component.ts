import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-build-shifts',
  templateUrl: './build-shifts.component.html',
  styleUrls: ['./build-shifts.component.css'],
  providers: [ UserService ]
})
export class BuildShiftsComponent implements OnInit {

  public indentity;
  public fulldate;
  public weekAndyear: any = {};
  public status;
  public days: any;
  public shifts: any;
  public method: string;
  public week: any;
  public optionTeamLeader: any;
  public optionEmployee: any;
  public finalManagement: any;
  public tempFinalManagement: any;
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.test = false;
    this.users = [];
    this.indentity = this._userService.getIdentity();
    this.days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.shifts = ['morning', 'afternoon', 'night'];
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
    this.employess = [
      { level: 'TEAM_LEADER', value: 1},
      { level: 'EMPLOYEE', value: 2}
    ];
    this.checkId = false;
    this.table = false;
  }

  ngOnInit() {
    if ( this.indentity.role !== 'ADMIN_ROLE' ) {
      this._router.navigate(['/home']);
    }
    this.getUsers();
    this.getMethodShifts();
    this.resetWeek();
  }

  getUsers() {
    this._userService.getUsersToSearch().subscribe(
      response => {
        // console.log( response );
        if ( response.ok ) {
          // this.users = response.users;
          for ( let i = 0; i < response.users.length; i++ ) {
            const user = new User('', '', '', '', '', undefined, undefined, '');
            const temp = response.users[i];

            user._id = temp._id;
            user.name = temp.name;
            user.last_name = temp.last_name;
            user.nick_name = temp.nick_name;
            user.email = temp.email;
            user.level = temp.level;

            this.users.push( user );
          }
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
      this.weekAndyear.week = 0;
      this.weekAndyear.year++;
    }

    this.started();
  }

  decrementWeek() {
    this.weekAndyear.week--;

    if ( this.weekAndyear.week === -1 ) {
      this.weekAndyear.week = 52;
      this.weekAndyear.year--;
    }

    this.started();
  }

  started() {
    setTimeout( () => {
      this.getTempShifts();

      setTimeout( () => {
        console.log( this.finalManagement );
      }, 1000);

      this.getAllShifts( this.weekAndyear );
      this.setNames( this.week );
      this.dates = this._userService.getDates( this.weekAndyear );
      this.test = true;
    }, 1000);
    /*this.getTempShifts();
    this.getAllShifts( this.weekAndyear );
    this.setNames( this.week );
    // this.dates = this.getDates( this.weekAndyear );
    this.dates = this._userService.getDates( this.weekAndyear );*/
  }

  getTempShifts() {
    this._userService.getFinalManagement( this.weekAndyear ).subscribe(
      response => {
        console.log( response );
        if ( response.ok ) {
          // console.log( response.management );
          this.finalManagement = response.management;
          this.checkId = true;
          this.table = true;
        }
      }, error => {
        console.log( error );
        this.checkId = false;
        this.table = false;
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
    setTimeout( () => {
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
    }, 1000);
  }

  allowDrop(ev) {
    // console.log( ev );
    ev.preventDefault();
  }

  drag( ev ) {
    ev.dataTransfer.setData( 'text', ev.target.id );
  }

  drop( ev ) {
    // console.log(shift, day);
    let boo;
    let res;
    let id;
    let index;
    let day = '', shift = '';
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const x = document.getElementById(data);
    console.log( x ); // li de origin
    console.log(ev.target); // li receptor
    console.log( ev.target.id ); // id del li receptor

    console.log( ev.target.nodeName );

    if ( ev.target.nodeName === 'SPAN' || ev.target.nodeName === 'I' ) {
      console.log((((ev.target).parentNode).parentNode).id );
      id = (((ev.target).parentNode).parentNode).id;
      index = (ev.target).parentNode.id;
      boo = false;
    } else {
      console.log( (ev.target).parentNode.id );
      id = (ev.target).parentNode.id;
      index = ev.target.id;
      boo = true;
    }

    res = id.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    console.log( id, res, index );

    day = res[2];
    shift = res[1];

    console.log( day, shift );

    if ( !boo )  {
      ((ev.target).parentNode).innerText = x.innerText;
    } else {
      ev.target.innerText = x.innerText;
    }
    this.inserIntoFinal(day, shift, index, x.innerText );
  }

  inserIntoFinal(day, shift, index, name ) {
    console.log( this.finalManagement );
    console.log( this.finalManagement[day][shift] );

    for ( const user of this.users ) {
      if ( user.nick_name === name ) {
        this.finalManagement[day][shift][index] = user;
        break;
      }
    }
  }

  added (event, shift, day ) {
    const list = document.getElementById('mat[' + shift + '][' + day + ']' );
    const max = list.childElementCount;
    // console.log( max );
    const newElement = document.createElement('LI');
    newElement.setAttribute('id', String(max) );
    newElement.addEventListener( 'dragover', this.allowDrop, false );
    newElement.addEventListener('drop', this.drop, false);
    // newElement.setAttribute('style', 'color:blue');
    newElement.innerHTML = '<i class="fas fa-minus-circle"></i>';
    list.appendChild( newElement );
    console.log( list );
  }

  remove( shift, day ) {
    const list = document.getElementById( 'mat[' + shift + '][' + day + ']' );

    list.addEventListener('click', ( e ) => {
      if ( (<HTMLElement>e.target) && (<HTMLElement>e.target).nodeName === 'I') {
        ( <HTMLElement>( <HTMLElement>e.target ).parentNode ).remove();
      }
    });
  }

  autoBuild() {
    let i = 1;
    for ( const day of this.days ) {
      for ( const shift of this.shifts ) {
        const temp = this.optionTeamLeader[day][shift];
        const cur = this.funcRandHead( temp );
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

  countList( shift, day ) {
    const list = document.getElementById( 'mat[' + shift + '][' + day + ']' );
    return list.childElementCount - 1;
  }

  funcRandHead( teamLeader ) {
    if ( teamLeader.length === 0 ) {
      return;
    } else if ( teamLeader.length === 1 ) {
      return teamLeader[0];
    } else {
      const num = Math.floor( Math.random() * teamLeader.length );
      return teamLeader[num];
    }
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
    const list = document.getElementById('mat[' + shift + '][' + day + ']');

    // console.log( finalManagement );
    // console.log( finalManagement.length );

    for ( let i = 0; i < finalManagement.length; i++ ) {
      const user = finalManagement[i];
      // console.log( user );
      if ( user ) {
        list.children[i].innerHTML = user.nick_name;
      }
    }
  }

  searchEmployess() {
    const i = 0;
    const list = document.getElementById('listOpt');

    if ( list.style.display === 'block' ) {
      const lis = document.getElementById('myUL');
      while ( lis.hasChildNodes() ) {
        lis.removeChild( lis.childNodes[i] );
      }
      list.removeChild( lis );
    } else {
      list.style.display = 'block';
    }

    const first = document.createElement('UL');
    first.setAttribute('id', 'myUL');
    list.appendChild( first );

    const dd = this.selectedDay;
    const sh = this.selectedShift;

    // console.log( dd, sh );

    const temp = this.week[dd][sh];
    for ( let k = 0, t = 0; k < temp.length; k++ ) {
      const node = document.createElement('LI');
      const textNode = document.createTextNode( temp[k].nick_name );
      node.setAttribute('id', 'dragg_' + t );
      node.draggable = true;
      node.addEventListener('dragstart', this.drag, false);
      node.appendChild( textNode );
      document.getElementById('myUL').appendChild( node );
      t++;
    }
  }

  showAll() {
    const level = this.selectedEmployess;
    const dd = this.selectedDay1;
    const sh = this.selectedShift1;

    const i = 0;
    const list = document.getElementById('listAll');

    if ( list.style.display === 'block' ) {
      const lis = document.getElementById('otherUL');
      while ( lis.hasChildNodes() ) {
        lis.removeChild( lis.childNodes[i] );
      }
      list.removeChild( lis );
    } else {
      list.style.display = 'block';
    }

    const first = document.createElement('UL');
    first.setAttribute('id', 'otherUL');
    list.appendChild( first );

    if ( level === 'TEAM_LEADER' ) {
      const temp = this.optionTeamLeader[dd][sh];
      for ( let k = 0, t = 0; k < temp.length; k++ ) {
        const node = document.createElement('LI');
        const textNode = document.createTextNode( temp[k].nick_name );
        node.setAttribute('id', 'drag_' + t);
        node.draggable = true;
        node.addEventListener('dragstart', this.drag, false);
        node.appendChild( textNode );
        document.getElementById('otherUL').appendChild(node);
        t++;
      }
    } else {
      const temp = this.optionEmployee[dd][sh];
      for ( let k = 0, t = 0; k < temp.length; k++ ) {
        const node = document.createElement('LI');
        const textNode = document.createTextNode( temp[k].nick_name );
        node.setAttribute('id', 'drag_' + t);
        node.draggable = true;
        node.addEventListener('dragstart', this.drag, false);
        node.appendChild( textNode );
        document.getElementById('otherUL').appendChild(node);
        t++;
      }
    }
  }

  saveBuild() {
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
        }, error => {
          console.log( error );
        }
      );
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
        this.status = 'no-exist';
      }

      setTimeout( () => {
        if ( this.shiftUser !== undefined ) {
          this.shiftUser.emitter = this.getName( this.shiftUser.emitter );
          this.status = 'show';
        } else {
          this.status = 'no-exist';
        }
        console.log( this.shiftUser );
      }, 1000);

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

}
