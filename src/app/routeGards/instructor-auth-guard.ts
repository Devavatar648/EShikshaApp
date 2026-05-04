import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import { TokenService } from '../services/token-service';

export const instructorAuthGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem("shtoken");
  const tokenService = inject(TokenService);
  const router = inject(Router);
  let user:any;
  if(token){
    const data = tokenService.decodeToken(token);
    console.log(data);
    user = data.user;
    if(user && user.role==="INSTRUCTOR"){
      return true;
    }
    return false;
  }else{
    return router.createUrlTree([""]);
  }
};
