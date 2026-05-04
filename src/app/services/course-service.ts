import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { Course } from '../models/course';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  httpClient = inject(HttpClient);
  apiServices = inject(ApiServices);

  instructorCourses$ = new BehaviorSubject<Course[]>([]);
  catalogCourses$ = new BehaviorSubject<Course[]>([]);

  getAllCourses():Observable<{result:Course[],message:string}>{
    return this.httpClient.get<{result:Course[],message:string}>(this.apiServices.getFullUrl(this.getCourseEndpoint('')));
  }

  searchCourseByTitle(title:string):Observable<{result:Course[],message:string}>{
    return this.httpClient.get<{result:Course[],message:string}>(this.apiServices.getFullUrl(this.getCourseEndpoint('search')),{params:{title}})
  }

  getCourseByInstructorId(id:string):Observable<{result:Course[],message:string}>{
    return this.httpClient.get<{result:Course[],message:string}>(this.apiServices.getFullUrl(this.getCourseEndpoint(`instructor/${id}`)))
  }




  getCourseEndpoint(endpoint:string):string{
    return `course/${endpoint}`;
  }
}
