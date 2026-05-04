import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course-service';

@Component({
  selector: 'app-manage-course',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-course.html',
  styleUrl: './manage-course.css',
})
export class ManageCourse {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);

  isEditMode = signal(false);
  oldCourseName = ""; // Used to find the course in the list if the name is changed
  

  courseForm = this.fb.group({
    cName: ['', Validators.required],
    cCategory: ['', Validators.required],
    cDescription: ['', Validators.required],
  });

  courseList = signal<Course[]>([]);

  ngOnInit(){
    this.courseService.instructorCourses$.subscribe(res=>{
      this.courseList.set(res);
    })
  }

  onSubmit() {
    if (this.courseForm.invalid) return;

    const courseData = this.courseForm.value;

    if (this.isEditMode()) {
      this.updateExistingCourse(courseData, this.oldCourseName);
    } else {
      this.addCourse(courseData);
    }

    this.resetForm();
  }

  editCourse(course: any) {
    this.isEditMode.set(true);
    this.oldCourseName = course.cName;
    this.courseForm.patchValue({
      cName: course.cName,
      cCategory: course.cCategory,
      cDescription: course.cDescription
    });
  }
   
  deleteCourse(name: string) {
    this.removeCourse(name);
    if (this.oldCourseName === name) this.resetForm();
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
