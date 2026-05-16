export class Quiz{
    constructor(
        public title:string,
        public timeLimit:number,
        public totalMarks:number,
        public questions:{
            questionText:string,
            options:[string],
            answer?:string
        }[],
        public _id?:string
    ){}
}