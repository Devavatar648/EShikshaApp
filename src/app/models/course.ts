export class Course{
    constructor(
        public _id:string,
        public title:string,
        public description:string,
        public category:string,
        public instructorId:string,
        public instructor:string,
        public enrollments:string,
        public rating:number,
        public img:string,
        public badge?:string
    ){}
}