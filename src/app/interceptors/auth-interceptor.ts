import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/token-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  let authReq = req;
  if(req.url.includes("auth") || req.url.includes('register')){
    return next(authReq);
  }else{
    if(tokenService.eshikshaToken){
      authReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${tokenService.eshikshaToken}`
        }
      });
    }
  }
  return next(authReq);
};
