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
  public dates;
  public selectedDay;
  public selectedShift;
  public employess;
  public selectedEmployess;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
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
  }

  ngOnInit() {
    if ( this.indentity.role !== 'ADMIN_ROLE' ) {
      this._router.navigate(['/home']);
    }
    this.fulldate = new Date();
    this.fulldate = this._userService.getWeekNumber( this.fulldate );
    this.weekAndyear.year = this.fulldate[0];
    this.weekAndyear.week = this.fulldate[1];

    this.getMethodShifts();
    this.getAllShifts( this.weekAndyear );
    console.log( this.week );
    setTimeout( () => {
      this.setNames( this.week );
      console.log( this.optionEmployee );
      console.log( this.optionTeamLeader );
    }, 1000);

    this.dates = this.getDates( this.weekAndyear );
  }

  allowDrop(ev) {
    // console.log( ev );
    ev.preventDefault();
  }

  drag( ev ) {
    ev.dataTransfer.setData( 'text', ev.target.id );
  }

  drop( ev, shift, day ) {
    // console.log(ev, shift, day);
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const x = document.getElementById(data);
    // console.log(x.innerText);
    ev.target.innerText = x.innerText;
  }

  remove( shift, day ) {
    const list = document.getElementById( 'mat[' + shift + '][' + day + ']' );

    list.addEventListener('click', ( e ) => {
      if ( (<HTMLElement>e.target) && (<HTMLElement>e.target).nodeName === 'BUTTON') {
        ( <HTMLElement>( <HTMLElement>e.target ).parentNode ).remove();
      }
    });
  }

  added ( shift, day ) {
    const list = document.getElementById('mat[' + shift + '][' + day + ']' );
    const max = list.childElementCount;
    const newElement = document.createElement('LI');
    // newElement.setAttribute('ondrop', 'drop(event)');
    // newElement.setAttribute('ondragover', 'allowDrop(event)');
    newElement.setAttribute( 'drop' , 'this.drop' );
    newElement.addEventListener( 'dragover', this.allowDrop, false );
    // newElement.setAttribute('style', 'color:blue');
    newElement.innerHTML = '<button id=`btn`>X</button>';
    list.appendChild( newElement );
  }

  getDates( yearAndweek ) {
    const year = yearAndweek.year;
    const week = yearAndweek.week;
    const dates = [];

    for ( const day of this.days ) {
      const temp = moment().day( day ).year( year ).week( week ).toDate();
      dates[day] = temp;
    }
    return dates;
  }

  getAllShifts( weekAndyear ) {
    this._userService.getAllRequest( weekAndyear ).subscribe(
      response => {
        if ( response.ok ) {
          // console.log( response.resp );
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

  searchPotentials( method, searchJson ) {
    console.log( searchJson );
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

  getName( userId ) {
    const user = new User('', '', '', '', '', undefined, undefined, '');
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

    console.log( dd, sh );

    // for ( let j = 0, t = 0; j < this.week[dd][sh].length; j++ ) {
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
    // }
  }

  showAll() {
    const level = this.selectedEmployess;
    const dd = this.selectedDay;
    const sh = this.selectedShift;

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

}
