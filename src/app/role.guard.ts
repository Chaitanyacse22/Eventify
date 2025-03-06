import { inject } from '@angular/core'; 

import { CanActivateFn, Router } from '@angular/router'; 

import { AuthService } from './auth.service'; 

 

export const roleGuard: CanActivateFn = (route, state) => { 

  const authService = inject(AuthService); 

  const router = inject(Router); 

 

  const expectedRole = route.data['role']; // Expected role from route data 

  const userRole = authService.getUserRole(); // Get the logged-in user's role 

 

  // If the user is Admin, allow access to all roles 

  if (userRole === 'Admin') { 

    return true; 

  } 

 

  // If the user's role matches the expected role, grant access 

  if (userRole === expectedRole) { 

    return true; 

  } 

 

  // Redirect to a default route (e.g., home or login) if access is denied 

  router.navigate(['/']); 

  return false; 

}; 