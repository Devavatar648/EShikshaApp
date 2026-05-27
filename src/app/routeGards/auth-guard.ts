import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user-service';

export const authGuard: CanActivateFn = (route, state) => {
  
  // const router = inject(Router);
  // const userService=inject(UserService);
  
  // let logged=false;

  // userService.loggedUser$.subscribe({
  //   next:(res)=>{
  //     logged=res;
  //   }
  // })

  // if (logged) {
  //   return true;  
  // } else {
  //   return router.createUrlTree(['login']); 
  // }

  return true;

};
