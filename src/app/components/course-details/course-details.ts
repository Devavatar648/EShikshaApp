import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course-service';
import { Course } from '../../models/course';
import { Assignments } from '../../models/assignments';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AssignmentService } from '../../services/assignment-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user-service';
import { combineLatest, map, Observable } from 'rxjs';
import { TokenService } from '../../services/token-service';

@Component({
  selector: 'app-course-details',
  imports: [DatePipe, AsyncPipe],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  private activatedRoute = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private userService = inject(UserService);
  private assignmentService=inject(AssignmentService);
  private toastService=inject(ToastrService);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  courseId1!: string;
  selectedCourse = signal<{ course: Course, assignments: Assignments[], quizzes:any[], totalEnrollments:number, isEnrolled:boolean } | null>(null);

  ngOnInit() {
    this.courseId1 = this.activatedRoute.snapshot.params['courseId'];
    let user;
    if(localStorage.getItem("eshikshaToken")){
      user = this.tokenService.decodeToken(localStorage.getItem("eshikshaToken")??"")
    }
    this.courseService.getCourseById(this.courseId1, user?._id??'').subscribe(res => {
      this.selectedCourse.set(res.result);
      console.log(res.result);
    })
  }

  enroll() {
    this.courseService.enrollCourse(this.courseId1).subscribe({
      next:res=>{
        const currentCourses = this.courseService.studentCourses$.getValue()??[];
        this.courseService.studentCourses$.next([res.result, ...currentCourses]);
        this.selectedCourse.update(course=>{
          if(course)course.isEnrolled=true;
          return course;
        });
        this.toastService.success(`Successfully enrolled in ${this.selectedCourse()?.course?.title}!`);
      },
      error:err=>{
        let message = err?.error?.message;
        if(message.match("duplicate key")){
          message = "You already enrolled in this course";
        }
        this.toastService.error(message??"Internal Server Error");
      }
    })
  }

  unrenroll(){
    
  }


  goToSubmitAssignment(assignment:Assignments) {
    this.assignmentService.selectedAssignment$.next(assignment);

    this.router.navigate(
      ['/dashboard/enrolledcourses/coursedetails', this.courseId1, 'assignment', assignment._id]
    );


  }

  startQuiz(quizId:string){
    if(confirm("Are you want to start this quiz?")){
      this.router.navigate(["/coursedetails", this.courseId1, 'quiz', quizId]);
    }
  }

  enrollmentAccessStatus():Observable<'blocked' | 'enrolled' | 'notenrolled'>{
    return combineLatest([
      this.userService.activeUser$
    ]).pipe(
      map(([user])=>{
        if(!user) return 'notenrolled'
        if (user?.role === 'ADMIN' || user?.role === 'INSTRUCTOR') {
          return 'blocked';
        }
        const hasCourse = this.selectedCourse()?.isEnrolled;
        if (hasCourse) {
          return 'enrolled';
        }
        return 'notenrolled';
      })
    )
  }

}
