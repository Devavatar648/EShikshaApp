import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { UserService } from '../services/user-service';

export const adminAuthGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem("eshikshaToken");
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const userService = inject(UserService);

  if(token){
    const data = tokenService.decodeToken(token);
    userService.activeUser$.next(data);
    if(data && data.role==="ADMIN"){
      return true;
    }
    return false;
  }else{
    return router.createUrlTree([""]);
  }
};
