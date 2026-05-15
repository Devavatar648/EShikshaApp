import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course';
import { ApiServices } from './api-services';
import { Assignments } from '../models/assignments';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {

  httpClient = inject(HttpClient);
  apiServices = inject(ApiServices);

  instructorCourses$ = new BehaviorSubject<Course[]>([]);


  // addAssignment(assignment: Assignments, courseId: string) {
  //   return this.httpClient.post<{ result: Assignments[], message: string }>(this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment`), assignment);
  // }

  addAssignments(formData: FormData, courseId: string) {
    return this.httpClient.post<{ result: any, message: string }>(
      this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment`),
      formData
    );
  }


  searchAssignment(courseId: string) {
    return this.httpClient.get<{ result: Assignments[], message: string }>(this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment`))
  }



  deleteAssignment(id: string, courseId: string) {
    return this.httpClient.delete<{ result: Assignments[], message: string }>(this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/${id}`))
  }

  // deleteAssignments(assignmentId: string, courseId: string) {
  //   return this.httpClient.delete<{ result: any, message: string }>(
  //     this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/${assignmentId}`)
  //   );
  // }


  // updateAssignment(assignment: Assignments, courseId: string,id:string) {
  //   return this.httpClient.patch<{ result: any, message: string }>(this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/${id}`), assignment)
  // }

  updateAssignments(formData: FormData, courseId: string, assignmentId: string) {
    return this.httpClient.patch<{ result: any, message: string }>(
      this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/${assignmentId}`),
      formData
    );
  }


  //    downloadAssignment(courseId: string, fileId: string) {
  //    const url = this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/download/${fileId}`);

  //   // 1. Fetch the file as a Blob using Angular's HttpClient
  //   this.httpClient.get(url, { responseType: 'blob' }).subscribe({
  //     next: (blob: Blob) => {
  //       // 2. Create a temporary local URL for the downloaded blob
  //       const downloadUrl = window.URL.createObjectURL(blob);

  //       // 3. Create an invisible anchor tag to trigger the download automatically
  //       const link = document.createElement('a');
  //       link.href = downloadUrl;

  //       // Optional: Give the file a default name if you know the extension (e.g., assignment.pdf)
  //       link.download = fileId || 'assignment.pdf'; 

  //       // 4. Trigger the download and clean up
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(downloadUrl);
  //     },
  //     error: (err) => {
  //       console.error('Download failed', err);
  //       // You can inject your ToastrService here to alert the user if needed
  //     }
  //   });
  // }

  downloadAssignment(courseId: string, fileId: string): Observable<Blob> {
  const url = this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/download/${fileId}`);
  
  // Just return the cold observable stream directly to the component
  return this.httpClient.get(url, { responseType: 'blob' });
}

  // downloadAssignment(courseId: string, fileId: string) {
  //   // Grab the token from wherever you store it (e.g., localStorage)
  //   const token = localStorage.getItem('token') || '';

  //   // Append it to the URL as a query string parameter
  //   const url = this.apiServices.getFullUrl(
  //     `instructor/course/${courseId}/assignment/download/${fileId}?token=${encodeURIComponent(token)}`
  //   );

  //   window.open(url, '_blank');
  // }

  // downloadAssignment(courseId: string, fileId: string) {
  //   const url = this.apiServices.getFullUrl(`instructor/course/${courseId}/assignment/download/${fileId}`);
  //   window.open(url, '_blank');
  // }




}
