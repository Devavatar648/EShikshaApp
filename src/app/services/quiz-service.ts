import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private httpClient = inject(HttpClient);
  private apiServices = inject(ApiServices);

  getQuizes(courseId:string):Observable<{result:any, message:string}>{
    return this.httpClient.get<{result:any, message:string}>(this.apiServices.getFullUrl(`instructor/course/${courseId}/quiz`));
  }

  addQuiz(courseId:string, quizData:Quiz):Observable<{result:any, message:string}>{
    return this.httpClient.post<{result:any, message:string}>(this.apiServices.getFullUrl(`instructor/course/${courseId}/quiz`), quizData);
  }

  deleteQuiz(courseId:string, quizId:string):Observable<{result:null, message:string}>{
    return this.httpClient.delete<{result:null, message:string}>(this.apiServices.getFullUrl(`instructor/course/${courseId}/quiz/${quizId}`));
  }

  updateQuiz(courseId:string, quizId:string, updatedData:any):Observable<{result:Quiz, message:string}>{
    return this.httpClient.patch<{result:Quiz, message:string}>(this.apiServices.getFullUrl(`instructor/course/${courseId}/quiz/${quizId}`), updatedData);
  }
}
