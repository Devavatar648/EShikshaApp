import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { Course } from '../models/course';
import { BehaviorSubject, Observable } from 'rxjs';
import { Assignments } from '../models/assignments';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  httpClient = inject(HttpClient);
  apiServices = inject(ApiServices);

  instructorCourses$ = new BehaviorSubject<Course[]>([]);
  catalogCourses$ = new BehaviorSubject<Course[]>([]);

  getAllCourses(title?:string):Observable<{result:Course[],message:string}>{
    let params = new HttpParams();
    if(title){
      params = params.append("title",title);
    }
    return this.httpClient.get<{result:Course[],message:string}>(this.apiServices.getFullUrl(this.getCourseEndpoint('')), {params});
  }

  getCourseById(courseId:string):Observable<{result:{course:Course,assignments:Assignments[]}, message:string}>{
    return this.httpClient.get<{result:{course:Course,assignments:Assignments[]}, message:string}>(this.apiServices.getFullUrl(this.getCourseEndpoint(`${courseId}`)))
  }

  getCourseEndpoint(endpoint:string):string{
    return `course/${endpoint}`;
  }
}
