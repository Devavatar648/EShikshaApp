import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  eshikshaToken = "";
  
  decodeToken(token:string):any{
    try{
      return jwtDecode(token);
    }catch(error){
      return null;
    }
  }

  
}
