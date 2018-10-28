export class RequestWeek {
    constructor(
        public _id: string,
        public method: string,
        public last_day: string,
        public morning: string,
        public afternoon: string,
        public night: string,
        public weekend: string
    ) {}
}
