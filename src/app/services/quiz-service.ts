import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiServices } from './api-services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private httpClient = inject(HttpClient);
  private apiServices = inject(ApiServices);

  getQuizes(courseId:string):Observable<{result:any, message:string}>{
    return this.httpClient.get<{result:any, message:string}>(this.apiServices.getFullUrl(`instructor/course/${courseId}/quiz`));
  }
}
