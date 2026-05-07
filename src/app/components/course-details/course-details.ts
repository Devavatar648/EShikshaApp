import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  // selectedCourse = signal<any>({
  //       cName:"Angular",
  //       cCategory:"Technical",
  //       cDescription:"THis is angular course description",
  //       instructor:"Joy"
  //     });

   MOCK_SELECTED_COURSE = {
    _id: 'c101',
    cName: 'Advanced Full-Stack Web Development',
    cCategory: 'Programming',
    cInstructor: 'Dr. Angela Yu',
    cDescription: 'Master the MERN stack (MongoDB, Express, React, and Node.js) by building real-world projects. This course covers everything from database modeling to frontend state management and deployment on cloud platforms.',
    
    // Quiz Array
    quizzes: [
      { _id: 'q1', title: 'Introduction to Node.js Runtime', questions: 10 },
      { _id: 'q2', title: 'Deep Dive into Middleware', questions: 15 },
      { _id: 'q3', title: 'Authentication with JWT', questions: 12 }
    ],

    // Assignment Array
    assignments: [
      { _id: 'a1', title: 'Build a RESTful API for a Bookstore' },
      { _id: 'a2', title: 'Implement Social Login with Passport.js' }
    ]
  };


  selectedCourse = signal(this.MOCK_SELECTED_COURSE);
  enroll() {
    alert(`Successfully enrolled in ${this.selectedCourse()?.cName}!`);
  }

}
