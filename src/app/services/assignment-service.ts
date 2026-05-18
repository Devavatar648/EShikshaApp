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

  selectedAssignment$ = new BehaviorSubject<Assignments | null>(null);

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

  //working
  downloadAssignment(courseId: string, fileId: string | undefined): Observable<Blob> {
    //`student/course/${courseId}/assignment/download/${fileId}`
    //instructor/course/${courseId}/assignment/download/${fileId}
    const url = this.apiServices.getFullUrl(`student/course/${courseId}/assignment/download/${fileId}`);
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

  // downloadAssignment(courseId: string, fileId: string|undefined) {
  //   const url = this.apiServices.getFullUrl(`student/course/${courseId}/assignment/download/${fileId}`);
  //   window.open(url, '_blank');
  // }




}
