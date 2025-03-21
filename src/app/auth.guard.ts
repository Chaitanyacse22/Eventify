// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { CanActivateFn } from '@angular/router'; 
import { AuthService } from './auth.service'; 
import { inject } from '@angular/core'; 

export const authGuard: CanActivateFn = (route, state) => { 

  const authService = inject (AuthService) 

  if(authService.isAuthenticated()) 

    return true; 

  else  

    return false; 

}; 