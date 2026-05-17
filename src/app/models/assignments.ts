export class Assignments{
    constructor(
        public _id:string,
        public title:string,
        public dueDate:Date,
        public totalMarks:number,
        public courseId:number,
        public file:string,
    ){}
}