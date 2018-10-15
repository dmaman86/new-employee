export class RequestWeek {
    constructor(
        public _id: string,
        public method: string,
        public morning: string,
        public afternoon: string,
        public night: string,
        public weekend: string
    ) {}
}
