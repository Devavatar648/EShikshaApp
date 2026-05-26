import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';

export const instructorAuthGuard: CanMatchFn = (route, segments) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  
  const token = tokenService.eshikshaToken;
  
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
