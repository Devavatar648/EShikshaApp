import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course-service';
import { Course } from '../../models/course';
import { Assignments } from '../../models/assignments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [DatePipe],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  activatedRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);

  selectedCourse = signal<{course:Course,assignments:Assignments[]}|null>(null);

  ngOnInit(){
    this.courseService.getCourseById(this.activatedRoute.snapshot.params['courseId']).subscribe(res=>{
      this.selectedCourse.set(res.result);
    })
  }
 
  hasAccess=():boolean=>{
    return localStorage.getItem("eshikshaToken")?true:false;
  }

  // selectedCourse = signal(this.MOCK_SELECTED_COURSE);
  enroll() {
    alert(`Successfully enrolled in ${this.selectedCourse()?.course?.title}!`);
  }

}
