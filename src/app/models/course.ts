export class Course {
    constructor(
        public _id: string,
        public title: string,
        public category: string,
        public enrolments: number,
        public description: string,
        public instructor: {
            _id: string;
            email?: string;
            name: string;
        },
        public imageUrl: string,
        public rating: {
            totalUsers: number;
            average: number;
        },
        public feedback: any[],
        public createdAt: string,
        public updatedAt: string,
    ) {}
}