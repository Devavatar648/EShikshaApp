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
    // 3. Final logic check before submission
    // const name = this.courseForm.value.cName;
    // const category = this.courseForm.value.cCategory;

    // console.log(name, category);

    // const duplicate = this.courseService.courseList().find(c => 
    //   c.cName.toLowerCase().trim() === name?.toLowerCase().trim() && 
    //   c.cCategory.toLocaleLowerCase() === category?.toLowerCase()
    // );
    // console.log(duplicate);
    // console.log(this.manageService.courseList());

    // if (duplicate) {
    //   alert("This course already exists in this category!");
    //   return;
    // }

    // if (this.courseForm.invalid) return;

    // const courseData: Course = this.courseForm.value as Course;

    // if (this.isEditMode()) {
    //   this.manageService.updateExistingCourse(courseData, this.oldCourseName);
    // } else {
    //   this.manageService.addCourse(courseData);
    // }

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
