import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  selectedCourse = signal<any>({
        cName:"Angular",
        cCategory:"Technical",
        cDescription:"THis is angular course description",
        instructor:"Joy"
      });
  enroll() {
    alert(`Successfully enrolled in ${this.selectedCourse()?.cName}!`);
  }
}
