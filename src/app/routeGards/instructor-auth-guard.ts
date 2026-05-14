import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import { TokenService } from '../services/token-service';

export const instructorAuthGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem("eshikshaToken");
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if(token){
    const data = tokenService.decodeToken(token);
    if(data && data.role==="INSTRUCTOR"){
      return true;
    }
    return false;
  }else{
    return router.createUrlTree([""]);
  }
};
