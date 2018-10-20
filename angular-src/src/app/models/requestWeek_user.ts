import { Shift } from './shift';

export class RequestWeekUser {

    private _id: string;
    // private name: string;
    // private last_name: string;
    // private email: string;
    private emitter: string;
    private numberWeek: string;
    private level: string;
    private sunday: Shift;
    private monday: Shift;
    private tuesday: Shift;
    private wednesday: Shift;
    private thursday: Shift;
    private friday: Shift;
    private saturday: Shift;

    constructor( id: string, emitter: string ) {
        this._id = id;
        // this.name = name;
        // this.last_name = this.last_name;
        // this.email = this.email;
        this.emitter = emitter;
        this.sunday = new Shift('', '', '');
        this.monday = new Shift('', '', '');
        this.tuesday = new Shift('', '', '');
        this.wednesday = new Shift('', '', '');
        this.thursday = new Shift('', '', '');
        this.friday = new Shift('', '', '');
        this.saturday = new Shift('', '', '');
    }

    public setId( id ) {
        this._id = id;
    }

    public getId() {
        return this._id;
    }

    public setEmitter( emitter ) {
        this.emitter = emitter;
    }

    public getEmitter() {
        return this.emitter;
    }

    /*public setName( name ) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }

    public setLastName( last_name ) {
        this.last_name = last_name;
    }

    public getLastName() {
        return this.last_name;
    }

    public setEmail( email ) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }*/

    public setNumberWeek( num ) {
        this.numberWeek = num;
    }

    public getNumberWeek() {
        return this.numberWeek;
    }

    public setLevel( level ) {
        this.level = level;
    }

    public getLevel() {
        return this.level;
    }

    public setShift( day, shift, value ) {
        this[day][shift] = value;
    }

    public getShift( day, shift ) {
        return this[day][shift];
    }
}
