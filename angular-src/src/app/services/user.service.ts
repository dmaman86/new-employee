import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Message } from '../models/message';
import { RequestWeekUser } from '../models/requestWeek_user';
import { RequestWeek } from '../models/requestWeek';
import { GLOBAL } from './global';

@Injectable()
export class UserService {

    public url: string;
    public identity;
    public week;
    public token;
    public status;

    constructor( public _http: HttpClient ) {
        this.url = GLOBAL.url;
    }

    /* Registration and Login */

    register( user: User ): Observable<any> {
        const params = JSON.stringify( user );
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post( this.url + 'register', params, { headers : headers });
    }

    signup( user: any, gettoken = 'false'): Observable<any> {
        if ( gettoken !== 'false') {
            user.gettoken = gettoken;
        }

        const params = JSON.stringify( user );
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post( this.url + 'login', params, { headers : headers });
    }

    getIdentity() {
        const identity = JSON.parse( localStorage.getItem( 'identity' ) );
        if ( identity !== 'undefined' ) {
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken() {
        const token = localStorage.getItem('token');
        if ( token !== 'undefined' ) {
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getWeekNumber( full_date ) {
        // Copy date so don't modify original
        full_date = new Date(Date.UTC(full_date.getFullYear(), full_date.getMonth(), full_date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        full_date.setUTCDate(full_date.getUTCDate() + 4 - (full_date.getUTCDay() || 7));
        // Get first day of year
        const yearStart: any = new Date(Date.UTC(full_date.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        let weekNo = Math.ceil(( ( (full_date - yearStart) / 86400000) + 1) / 7) + 1;
        // Return array of year and week number
        let year = full_date.getUTCFullYear();
        if ( weekNo === 53 ) {
          weekNo = 0;
          year++;
        }
        return [year, weekNo];
    }

    /* Home and Home Admin */

    getMessage(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', this.getToken());
        return this._http.get( this.url + 'get-message', { headers : headers });
    }

    sendMessage( message: Message ): Observable<any> {
        // console.log(message);
        const params = JSON.stringify( message );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'message', params, { headers: headers });
    }

    deleteMessage( messageId ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.delete( this.url + 'delete-message/' +  messageId, { headers: headers });
    }

    /* Users */

    // this function not active
    getUsers( page = null ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.get( this.url + 'users/' + page, { headers: headers });
    }

    getUsersToSearch(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.get( this.url + 'get-users', { headers: headers });
    }

    getUser( id ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.get( this.url + 'user/' + id, { headers: headers } );
    }

    deleteUser( user: User ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.delete( this.url + 'delete-user/' + user._id, { headers: headers } );
    }

    updateUser( user: User): Observable<any> {
        const params = JSON.stringify( user );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put( this.url + 'update-user/' + user._id, params, { headers : headers });
    }

    adminUpdateUser( user: User ): Observable<any> {
        const params = JSON.stringify( user );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put( this.url + 'admin-update-user/' + user._id, params, { headers: headers });
    }

    adminResetUser( user: User ): Observable<any> {
        const params = JSON.stringify( user );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put( this.url + 'admin-reset-user/' + user._id, params, { headers: headers });
    }

    /* Shifts */

    getRequestUser( requestUser: RequestWeekUser ): Observable<any> {
        const params = JSON.stringify( requestUser );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'get-request-user', params, { headers: headers });
    }

    saveRequestUser( requestUser: RequestWeekUser ): Observable<any> {
        const params = JSON.stringify( requestUser );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'save-request-user/' + requestUser.getEmitter(), params, { headers: headers });
    }

    updateRequestUser( requestUser: RequestWeekUser ): Observable<any> {
        const params = JSON.stringify( requestUser );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put( this.url + 'update-request-user/' + requestUser.getId(), params, { headers: headers });
    }

    getAllRequest( weekAndyear: any ): Observable<any> {
        const params = JSON.stringify( weekAndyear );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'get-all-request', params, { headers: headers });
    }

    saveFinalManagement( week, year, finalManagement: any ): Observable<any> {
        const params = JSON.stringify( finalManagement );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'save-management/' + week + '/' + year, params, { headers: headers });
    }

    getFinalManagement( weekAndyear: any): Observable<any> {
        const params = JSON.stringify( weekAndyear );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'get-management', params, { headers: headers });
    }

    /* For Admin set how much shifts */

    setValuesRequest( requestWeek: RequestWeek ): Observable<any> {
        const params = JSON.stringify( requestWeek );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'set-request-week', params, { headers: headers });
    }

    updateValuesRequest( weekId, requestWeek: RequestWeek ): Observable<any> {
        const params = JSON.stringify( requestWeek );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.put( this.url + 'update-request-week/' + weekId, params, { headers: headers });
    }

    getValuesRequest(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.get( this.url + 'get-request-week/', { headers: headers });
    }

}
