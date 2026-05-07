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
  catalogCourses$ = new BehaviorSubject<Course[]>([
    {
        _id:"100",
        title: 'Full Stack Web Mastery',
        category: 'Beginner',
        rating: 4.8,
        enrollments: '2.5k',
        description: 'Build modern, responsive websites using Angular, Node.js, and MongoDB.',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        instructorId:"69e9e885eec73ab7beeed949",
        instructor:"Dev",
        badge: 'Bestseller'
    },
    { 
        _id:"200",
        title: 'Python for Data Analysis', 
        category: 'Beginner', 
        rating: 4.9, 
        enrollments: '1.2k', 
        description: 'Analyze complex data sets and create stunning visualizations with Python.',
        instructor:"Dev",
        instructorId:"69e9e885eec73ab7beeed949",
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' 
    }
  ]);

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
