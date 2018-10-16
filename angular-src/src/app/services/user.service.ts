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

    getWeekId() {
        const week = JSON.parse( localStorage.getItem( 'week' ) );
        if ( week !== 'undefined' ) {
            this.week = week;
        } else {
            this.week = null;
        }
        return this.week;
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

    getMessage(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                            .set('Authorization', this.getToken());
        return this._http.get( this.url + 'get-message', { headers : headers });
    }

    sendMessage( message: Message ): Observable<any> {
        console.log(message);
        const params = JSON.stringify( message );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'message', message, { headers: headers });
    }

    deleteMessage( messageId ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.delete( this.url + 'delete-message/' +  messageId, { headers: headers });
    }

    getUsers( page = null ): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.get( this.url + 'users/' + page, { headers: headers });
    }

    getUsersToSearch(): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', this.getToken());
        return this._http.get( this.url + 'get-users', { headers: headers });
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

    getRequestUser( requestUser: RequestWeekUser ): Observable<any> {
        const params = JSON.stringify( requestUser );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'get-request-user', params, { headers: headers });
    }

    saveRequestUser( requestUser: RequestWeekUser ): Observable<any> {
        const params = JSON.stringify( requestUser );
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.getToken());
        return this._http.post( this.url + 'save-request-user/' + requestUser.getId(), params, { headers: headers });
    }

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
