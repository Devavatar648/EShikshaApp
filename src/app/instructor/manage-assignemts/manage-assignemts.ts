import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


// Defined based on the Assignment Entity in LLD [cite: 71-82]
interface Assignment {
  id?: number;
  title: string;
  dueDate: string;
  totalMarks: number;
  courseId: number; // Foreign Key requirement [cite: 145]
  fileBlob?: File; // Store the actual file object her
}

@Component({
  selector: 'app-manage-assignemts',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-assignemts.html',
  styleUrl: './manage-assignemts.css',
})
export class ManageAssignemts {
  assignmentForm!: FormGroup;
  publishedAssignments: Assignment[] = [];
  isEditMode = false;
  currentEditId: number | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {
    // In a real app, you would fetch existing assignments from the Backend REST API here [cite: 29]
    this.loadAssignments();
  }

  initForm() {
    this.assignmentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      totalMarks: ['', [Validators.required, Validators.min(1)]]
    });
  }

  // Handles the "Publish" logic [cite: 69, 70]
  onPublish() {
    if (this.assignmentForm.valid) {
    const newAssignment: Assignment = {
      ...this.assignmentForm.value,
      id: Date.now(),
      courseId: 101,
      fileBlob: this.selectedFile || undefined // Attach the file to the object
  
    };

    this.publishedAssignments.push(newAssignment);
    this.assignmentForm.reset();
    this.selectedFile = null; // Reset for next use
      
      // Note: Real implementation would involve a Backend API call to update the Relational DB [cite: 27, 30]
    }
  }

  // Pre-fills the form for updating [cite: 34]
  onEdit(assignment: Assignment) {
    this.isEditMode = true;
    this.currentEditId = assignment.id || null;
    this.assignmentForm.patchValue({
      title: assignment.title,
      dueDate: assignment.dueDate,
      totalMarks: assignment.totalMarks
    });
  }

  // Deletes an assignment from the local state [cite: 34]
  onDelete(id: number | undefined) {
    if (id && confirm('Are you sure you want to delete this assessment?')) {
      this.publishedAssignments = this.publishedAssignments.filter(a => a.id !== id);
      
      if (this.currentEditId === id) {
        this.resetForm();
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  if (file && file.type === 'application/pdf') {
    this.selectedFile = file; // Capture the file from the input
  }
  }

  resetForm() {
    this.isEditMode = false;
    this.currentEditId = null;
    this.assignmentForm.reset();
  }

  private loadAssignments() {
    // Mock data representing the "Assignment" table in the Database [cite: 142]
    this.publishedAssignments = [
    ];
  }

  // Inside your class
onDownload(assignment: Assignment) {
  if (assignment.fileBlob) {
    // Create a temporary URL for the file object
    const url = window.URL.createObjectURL(assignment.fileBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${assignment.title}.pdf`; // Sets the filename
    link.click(); // Programmatically click the link to trigger download
    window.URL.revokeObjectURL(url); // Clean up memory
  } else {
    alert("No PDF file was uploaded for this assignment.");
  }
}

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
