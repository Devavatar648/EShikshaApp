import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TokenService } from '../services/token-service';
import { UserService } from '../services/user-service';

export const adminAuthGuard: CanMatchFn = (route, segments) => {
  const token = localStorage.getItem("shtoken");
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const userService = inject(UserService);


  let user:any;
  if(token){
    const data = tokenService.decodeToken(token);
    user = data.user;
    userService.activeUser$.next(user);
    if(user && user.role==="ADMIN"){
      return true;
    }
    return false;
  }else{
    return router.createUrlTree([""]);
  }
};
