import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { UserService } from '../../services/user-service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-insdashboard',
  imports: [],
  templateUrl: './insdashboard.html',
  styleUrl: './insdashboard.css',
})
export class Insdashboard {

  private courseService = inject(CourseService);
  private userService = inject(UserService);

  // Course completion data
  // courses = signal([
  //   { name: 'Intro to Python', rate: 92 },
  //   { name: 'Digital Marketing', rate: 78 },
  //   { name: 'Bim Rating', rate: 78 },
  //   { name: 'Communication', rate: 73 }
  // ]);

  courses = signal<Course[]>([]);

  ngOnInit(){
    this.userService.activeUser$.subscribe(res=>{
      if(res?.id){
        this.courseService.getCourseByInstructorId(res?.id).subscribe(courses=>{
          this.courseService.instructorCourses$.next(courses.result);
          this.courses.set(courses.result);
        })
      }
    })
  }

  stats = signal([
    { label: 'Total Users', value: '3,450', sub: 'Student: 2,800 | Instructor: 650', color: 'primary' },
    { label: 'Active Courses', value: this.courses().length, sub: 'Pending: 15', color: 'info' },
  ]);

}
