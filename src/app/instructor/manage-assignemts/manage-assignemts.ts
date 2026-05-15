import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../services/course-service';
import { map } from 'rxjs';
import { Course } from '../../models/course';
import { AssignmentService } from '../../services/assignment-service';
import { ToastrService } from 'ngx-toastr';


interface Assignment {
  _id?: string;
  title: string;
  dueDate: Date;
  totalMarks: number;
  courseId: number;
  file: string 
}

@Component({
  selector: 'app-manage-assignemts',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-assignemts.html',
  styleUrl: './manage-assignemts.css',
})
export class ManageAssignemts {
  private fb = inject(FormBuilder);
  private courseService = inject(CourseService);
  private assignmentService = inject(AssignmentService);
  private toastService=inject(ToastrService);

  assignmentForm!: FormGroup;
  publishedAssignments: Assignment[] = [];

  isEditMode = false;
  currentEditId: string | null = null;
  selectedFile: File | null = null;

  //API DATA
  instructorCourses = signal<{ id: string, title: string }[]>([]);

  //Getting instructor courses ==========================================================
  ngOnInit() {
    this.courseService.instructorCourses$
      .pipe(
        map((carray) => {
          if (!carray) {
            return [];
          }
          return carray.map(c => ({ id: c._id??"", title: c.title }))
        }
        )
      )
      .subscribe(courses => {
        if (courses) {
          this.instructorCourses.set(courses)
        }
      })

  //======================================================================================

    this.assignmentForm = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      totalMarks: ['', [Validators.required, Validators.min(1)]]
    });

    this.assignmentForm.get('courseId')?.valueChanges.subscribe(courseId => {
      if (courseId) {
        this.assignmentService.searchAssignment(courseId).subscribe({
          next: (res) => this.publishedAssignments = res.result,
          error: (err) => this.publishedAssignments = [] // Clear if none found
        });
      }
    });
  }
  
  getCourseName(id: string) {
    return this.instructorCourses().find(c => c.id == id)?.title || 'Selected Course';
  }

  get title() {
    return this.assignmentForm.get("title");
  }

  get dueDate() {
    return this.assignmentForm.get("dueDate");
  }

  get totalMarks() {
    return this.assignmentForm.get("totalMarks");
  }

  get filteredAssignments() {
    const selectedCourseId = this.assignmentForm.get('courseId')?.value;
    if (!selectedCourseId) return [];
    return this.publishedAssignments.filter(a => a.courseId == selectedCourseId);
  }

  //==========================================================================================


  onPublish() {
    if (this.assignmentForm.invalid) return;

    const formData = new FormData();
    const courseId = this.assignmentForm.get('courseId')?.value;

    formData.append('title', this.assignmentForm.value.title);
    formData.append('dueDate', this.assignmentForm.value.dueDate);
    formData.append('totalMarks', this.assignmentForm.value.totalMarks);
    if (this.selectedFile) {
      formData.append('myFile', this.selectedFile);
    }

    if (this.isEditMode && this.currentEditId) {
      // Call Update API
      this.assignmentService.updateAssignments(formData, courseId, this.currentEditId).subscribe({
        next: (res) => {
          this.toastService.success("Updated successfully");
          this.resetForm();
          // Refresh the list
          this.assignmentForm.get('courseId')?.setValue(courseId);
        }
      });

    } else {
      // Call Create API (Existing logic)
      if (!this.selectedFile){
        this.toastService.warning("Please select a PDF")
        return ;
        };

      this.assignmentService.addAssignments(formData, courseId).subscribe({
        next: (res) => {
          this.publishedAssignments.push(res.result);
          this.assignmentForm.reset({ courseId: courseId });
          this.selectedFile = null;
        }
      });
    }
  }


  onEdit(assignment: Assignment) {
    this.isEditMode = true;
    this.currentEditId = assignment._id || null;
    
    const formattedDate = String(assignment.dueDate).split('T')[0];

    this.assignmentForm.patchValue({
      courseId: assignment.courseId, 
      title: assignment.title,
      dueDate: formattedDate,
      totalMarks: assignment.totalMarks
    });
  }


  // Deletes an assignment from the local state 
  // onDelete(id: number | undefined) {
  //   if (id && confirm('Are you sure you want to delete this assessment?')) {
  //     this.publishedAssignments = this.publishedAssignments.filter(a => a.id !== id);

  //     if (this.currentEditId === id) {
  //       this.resetForm();
  //     }
  //   }
  // }

  onDelete(id: string | undefined) {
    const courseId = this.assignmentForm.get('courseId')?.value;
    if (id && courseId && confirm('Permanently delete this assessment?')) {
      this.assignmentService.deleteAssignment(id, courseId).subscribe({
        next: () => {
          this.publishedAssignments = this.publishedAssignments.filter(a => a._id !== id);
        },
        error: (err) => alert("Delete failed")
      });
    }
  }



  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    }
  }

  resetForm() {
    this.isEditMode = false;
    this.currentEditId = null;
    this.selectedFile=null;
    this.assignmentForm.reset();
  }


  onDownload(assignment: any) {
    const courseId = this.assignmentForm.get('courseId')?.value;
    if (assignment.file && courseId) {
      this.assignmentService.downloadAssignment(courseId, assignment.file);
    }
  }

  getCurrentDate(): string {

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate() + 3).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
    
  }

}
