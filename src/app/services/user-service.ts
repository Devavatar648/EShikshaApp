import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUser } from '../models/authUser';
import { ApiServices } from './api-services';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private apiServices = inject(ApiServices);
  activeUser$ = new BehaviorSubject<(User&{id:string})|null>(null);

  login(user:AuthUser):Observable<{result:{token:string}, success:boolean, message:string, errors:any[]}>{
    return this.httpClient.post<{result:{token:string}, success:boolean, message:string, errors:any[]}>(this.apiServices.getFullUrl("user/auth"), user);
  }

  register(user:User):Observable<{result:string, success:boolean, message:string, errors:any[]}>{
    return this.httpClient.post<{result:string, success:boolean, message:string, errors:any[]}>(this.apiServices.getFullUrl("user/register"), user);
  }

  getUsers(role?:string,searchVal?:string):Observable<{result:User[], success:boolean, message:string, errors:any[]}>{
    let params = new HttpParams();
    // Only append if the value actually exists
    if (role && role !== 'ALL') params = params.append('role', role);
    if (searchVal && searchVal.trim() !== '') params = params.append('searchVal', searchVal);
    return this.httpClient.get<{result:User[], success:boolean, message:string, errors:any[]}>(this.apiServices.getFullUrl(`admin/users`),{params})
  }
}
