import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-student-progress',
  imports: [],
  templateUrl: './student-progress.html',
  styleUrl: './student-progress.css',
})
export class StudentProgress {
  courseService = inject(CourseService);

  courseNames = signal<{id:string,title:string}[]|null>(null);

  ngOnInit(){
    this.courseService.instructorCourses$.pipe(
      map(c=>c.map(v=>{
        return {id:v._id, title:v.title}
      }))
    ).subscribe(res=>{
      if(res)this.courseNames.set(res)
    });
  }
}
