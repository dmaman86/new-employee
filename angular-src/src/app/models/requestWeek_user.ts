import { Shift } from './shift';

export class RequestWeekUser {

    private _id: string;
    private emitter: string;
    private numberWeek: string;
    private level: string;
    private year: string;
    private sunday: Shift;
    private monday: Shift;
    private tuesday: Shift;
    private wednesday: Shift;
    private thursday: Shift;
    private friday: Shift;
    private saturday: Shift;
    private message: string;

    constructor( id: string, emitter: string ) {
        this._id = id;
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

    public setYear( year ) {
        this.year = year;
    }

    public getYear() {
        return this.year;
    }

    public setShift( day, shift, value ) {
        this[day][shift] = value;
    }

    public getShift( day, shift ) {
        return this[day][shift];
    }

    public setMessage( message: string ) {
        this.message = message;
    }

    public getMessage() {
        return this.message;
    }
}
