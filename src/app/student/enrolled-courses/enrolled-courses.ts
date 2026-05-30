import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnrolledCourse } from '../../models/enrolledCourse';
import { CourseService } from '../../services/course-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-enrolled-courses',
  imports: [RouterModule, CommonModule],
  templateUrl: './enrolled-courses.html',
  styleUrl: './enrolled-courses.css',
})
export class EnrolledCourses {
  userService = inject(UserService);
  courseService = inject(CourseService);
  toastService = inject(ToastrService);

  courseList = signal<EnrolledCourse[]>([]);
  activeTab:string = 'all';

  ngOnInit(): void {
    this.courseService.studentCourses$.subscribe(res => {
      
      if (!res) {
        this.courseService.getEnrolledCourse().subscribe({
          next: courseResult => {
            this.courseService.studentCourses$.next(courseResult.result);
            this.courseList.set(courseResult.result)
          },
          error: err => {
            this.toastService.error(err.error.message ?? "Internal Server Error");
          }
        })
      } else {
        this.courseList.set(res);
      }
    })
  }
   

  getNameAvterUrl(name:string){
    const nameArr = name.split(" ");
    return `https://ui-avatars.com/api/?name=${nameArr[0]}+${nameArr[1]}&background=random`
  }

  getFilturedCourse(filterName:"all"|"inprogress"|"complete"){
    this.courseService.studentCourses$.subscribe(res=>{
        if(res){
          if(filterName==='complete'){
            res = res.filter(c=>c.completePercentage===100);
          }else if(filterName==='inprogress'){
            res = res.filter(c=>c.completePercentage<100)
          }
          this.courseList.set(res)
        }else{
          this.courseList.set([]);
        }
      })
    this.activeTab=filterName;
  }
}

