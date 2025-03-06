// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core'; 

 

@Injectable({ 

  providedIn: 'root' 

}) 

export class AuthService { 

 

  // constructor() { } 

 

  // Authenticated = false; 

  // setAuthentication(){ 

  //   this.Authenticated = true; 

  // } 

 

  // setAuthenticationFalse(){ 

  //   this.Authenticated = false; 

  // } 

 

  // isAuthenticated(){ 

  //   return this.Authenticated; 

  // } 

 

  private authenticated = false; 

  private userRole: string | null = null; 

  setAuthentication(role: string) { 

    this.authenticated = true; 

    this.userRole = role; 

  } 

 

  setAuthenticationFalse() { 

    this.authenticated = false; 

    this.userRole = null; 

  } 

 

  isAuthenticated() { 

    return this.authenticated; 

  } 

 

  getUserRole() { 

    return this.userRole; 

  } 
}