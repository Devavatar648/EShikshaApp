import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course-service';
import { UserService } from '../../services/user-service';
import { ToastrService } from 'ngx-toastr';
import { required } from '@angular/forms/signals';
import { isArray } from 'chart.js/helpers';

@Component({
  selector: 'app-manage-course',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-course.html',
  styleUrl: './manage-course.css',
})
export class ManageCourse {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private userService=inject (UserService);
  private toastService=inject(ToastrService);


  isEditMode = signal(false);
  oldCourseName = ""; // Used to find the course in the list if the name is changed
  

  courseForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required],
    imageUrl:['',Validators.required]
  });

  courseList = signal<Course[]>([]);

  ngOnInit(){
    this.courseService.instructorCourses$.subscribe(res=>{
      if(!res){
        this.userService.activeUser$.subscribe(user=>{
          this.courseService.getAllCourses("",user?._id).subscribe({
            next:courseResult=>{
              this.courseService.instructorCourses$.next(courseResult.result);
              this.courseList.set(courseResult.result)
              console.log(this.courseList());
            },
            error:err=>{
              this.toastService.error(err.error.message??"Internal Server Error");
            }
          })
        })
      }else{
        this.courseList.set(res);
      }
    })
    
  }

  onSubmit() {
    console.log(this.courseForm.value);
    const {title,category,description ,imageUrl}=this.courseForm.value;
    if(title && category && description && imageUrl){

      this.courseService.createCourse(new Course(title,category,description,imageUrl)).subscribe({
        next:res=>{
          const courses=this.courseList();
          courses.push(res.result)
          this.courseList.set(courses);
          this.toastService.success(res.message);
          this.resetForm();
        },
        error:err=>{
          console.log(err);
          if(isArray(err.error.message)){
            err.error.message.forEach((e:any)=>this.toastService.error(e.msg));
          }else{
            this.toastService.error(err.error.message??"Internal Server Error");
          }
        }
      })
    }
  }

   editCourse(course: any) {
  //   this.isEditMode.set(true);
  //   this.oldCourseName = course.cName;
  //   this.courseForm.patchValue({
  //     title: course.cName,
  //     category: course.cCategory,
  //     description: course.cDescription
  //   });
  }
   
  deleteCourse(name: string) {
    // this.removeCourse(name);
    // if (this.oldCourseName === name) this.resetForm();
    console.log(name);
  }
  
  resetForm() {
    this.courseForm.reset();
    this.isEditMode.set(false);
    this.oldCourseName = "";
  }

  //some extra
  updateExistingCourse(v:any,n:any){}

  addCourse(v:any){}

  removeCourse(c:any){}

}
