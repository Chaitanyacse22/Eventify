// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   standalone: false,
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'eventify';
// }
import { Component } from '@angular/core'; 

import { RestService } from './rest.service'; 

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms'; 

// import { Admin } from './Admin'; 

import { Router } from '@angular/router'; 

import { HttpClient } from '@angular/common/http'; 

import { AuthService } from './auth.service'; 
import { Admin } from './Admin';

 

@Component({ 

  selector: 'app-root', 

  templateUrl: './app.component.html', 

  standalone: false, 

  styleUrl: './app.component.css' 

}) 

export class AppComponent { 

  title = 'app'; 

  UserForm! : FormGroup; 

  registrationForm! : FormGroup; 

  constructor(private rest : RestService, private fb : FormBuilder, private router : Router, private http:HttpClient, private authService : AuthService){ 

    this.UserForm = this.fb.group({ 

      id : [''], 

      name: ['', [Validators.required, Validators.minLength(3)]], 

      email: ['', [Validators.required, Validators.email]], 

      password: ['', [Validators.required, Validators.minLength(6)]], 

      role: ['', Validators.required], 

      status: ['', Validators.required] 

    }) 

     

    this.registrationForm = this.fb.group({ 

      userId : ['',Validators.required], 

      pwd : ['', [Validators.required, Validators.minLength(5), this.passwordValidator]], 

      confirmPwd : ['', [Validators.required, Validators.minLength(5), this.passwordValidator]] 

    }) 

  } 

  passwordValidator(control : AbstractControl) : ValidationErrors | null{ 

    const value = control.value; 

   

    if(value.startsWith('Cha')==false) 

      return {invalidPassword : 'Password must be start with Cha'}; 

    return null; 

  } 

  DisplayProductData: boolean = false; 

  strAddOrEditDisplayTitle = ''; 

  DisplayAddOrEditForm = false; 

  addUserRecord(){ 

    this.DisplayAddOrEditForm = true; 

    this.strAddOrEditDisplayTitle = "Add User"; 

  } 

  displayData(){ 

    this.DisplayProductData=true; 

  } 

  Users : any; 

  displayProductsData = false; 

  displayProductData(){ 

    this.Users = this.getAllEmployees(); 

    alert("Recieved data from the server "+this.Users); 

    this.displayProductsData=true; 

  } 

 

  AddOrEditUserRecord(){ 

  let id = this.UserForm.get('id')?.value; 

  let name = this.UserForm.get('name')?.value; 

  let email = this.UserForm.get('email')?.value; 

  let password = this.UserForm.get('password')?.value; 

  let role = this.UserForm.get('role')?.value; 

  let status = this.UserForm.get('status')?.value; 

 

  let userObj = new Admin(id, name, email, password, role, status); 

 

  if( this.strAddOrEditDisplayTitle=="Add Record"){ 

    alert("given data is : "+JSON.stringify(userObj)); 

    this.rest.insertUserRecord(userObj).subscribe({ 

      next : (data) => { 

                        alert ('Record Inserted successfully..'); 

                        this.getAllEmployees() 

                        }, 

      error : (err) => alert(err), 

      complete : () => console.log('Insert Operation is successfull') 

    }) 

    } 

    else if(this.strAddOrEditDisplayTitle=="Edit Record"){ 

      // this.rest.updateUserRecord(userObj).subscribe({ 

      //   next : (data) => { alert('Record Updated Successfully...'); 

      //                      this.getAllEmployees() 

      //                    }, 

      //   error : (err) => alert(err), 

      //   complete : () => console.log('Update Operation is successfully...') 

      // }) 

  

   

    } 

  } 

  empLst : any; 

  getAllEmployees(){ 

  this.rest.getAllUsers().subscribe({ 

    next : (data) => {this.empLst=data;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

} 

addEmployeeRecord(){ 

  this.DisplayAddOrEditForm = true; 

  this.strAddOrEditDisplayTitle = "Add Record"; 

} 

// canActivate(id : number, status : string){ 

//   // alert("Given User Record : "+JSON.stringify(id)); 

//   // alert("Given Data is "+JSON.stringify(status)); 

//   // this.DisplayAddOrEditForm = true; 

//   // this.strAddOrEditDisplayTitle = "Edit Record"; 

//   // this.UserForm.patchValue({ 

//   //   id : user.id, 

//   //   name : user.name, 

//   //   email : user.email, 

//   //   password : user.password, 

//   //   role : user.role, 

//   //   status : user.status 

//   // }) 

//   if(status=='Active') 

//     status = 'Suspended' 

//   else 

//     status = 'Active'  

//   this.rest.updateUserRecord(id, status).subscribe({ 

//     next : (data) => { alert('Record Updated Successfully...'); 

//                        this.getAllEmployees() 

//                      }, 

//     error : (err) => alert(err), 

//     complete : () => console.log('Update Operation is successfully...') 

//   }) 

// } 

canActivate(id : number, status : string){ 

  // alert("Given User Record : "+JSON.stringify(id)); 

  // alert("Given Data is "+JSON.stringify(status)); 

  // this.DisplayAddOrEditForm = true; 

  // this.strAddOrEditDisplayTitle = "Edit Record"; 

  // this.UserForm.patchValue({ 

  //   id : user.id, 

  //   name : user.name, 

  //   email : user.email, 

  //   password : user.password, 

  //   role : user.role, 

  //   status : user.status 

  // }) 

  status = 'Active'  

  this.rest.updateUserRecord(id, status).subscribe({ 

    next : (data) => { alert('Record Updated Successfully...'); 

                       this.getAllEmployees() 

                     }, 

    error : (err) => alert(err), 

    complete : () => console.log('Update Operation is successfully...') 

  }) 

} 

canSuspended(id : number, status : string){ 

  // alert("Given User Record : "+JSON.stringify(id)); 

  // alert("Given Data is "+JSON.stringify(status)); 

  // this.DisplayAddOrEditForm = true; 

  // this.strAddOrEditDisplayTitle = "Edit Record"; 

  // this.UserForm.patchValue({ 

  //   id : user.id, 

  //   name : user.name, 

  //   email : user.email, 

  //   password : user.password, 

  //   role : user.role, 

  //   status : user.status 

  // }) 

  status = 'Suspended'  

  this.rest.updateUserRecord(id, status).subscribe({ 

    next : (data) => { alert('Record Updated Successfully...'); 

                       this.getAllEmployees() 

                     }, 

    error : (err) => alert(err), 

    complete : () => console.log('Update Operation is successfully...') 

  }) 

} 

canDeactivate(id : number){ 

  this.rest.deleteUserRecord(id).subscribe({ 

    next : (data) => { 

                        alert ( "Record Deleted Successfully"); 

                        this.getAllEmployees() 

                     }, 

    error : (err) => alert(err), 

    complete : () => console.log("Deleted Record Successfully...") 

  }) 

} 

eventLst:any; 

monitorEvents(){ 

  this.rest.getAllEvents().subscribe({ 

    next : (data) => {this.eventLst=data;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

} 

// userLoggedIn(){} 

// userLoggedOut(){} 

login1=false; 

userLoggedIn(){ 

  // this.authService.setAuthentication(); 

  this.login1 = true; 

} 

userLoggedOut(){ 

  this.authService.setAuthenticationFalse(); 

  // document.body.innerHTML = ''; 

  this.login1 = true; 

  this.router.navigate(['/']); 

  this.loginMessage =''; 

  this.Email='' 

  this.icon=false; 

} 

icon=false; 

registration1 = false; 

onSubmitTemplateDriven(loginform : any){ 

  let strUserId = loginform.value.userId; 

  let pwd = loginform.value.pwd; 

 

  if(strUserId=='Chaitanya' && pwd=='admin'){ 

    this.strLoginFormResult="You are a Valid User..!"; 

    this.login1=false; 

    // this.authService.setAuthentication(); 

    this.router.navigate(['/admin']); 

  } 

  else{ 

    this.strLoginFormResult="Invalid User Credentials..!"; 

    if(this.registration1==false) 

      this.login1=true; 

    else 

      this.login1=false; 

  } 

} 

 

toggleForm1(){ 

  if(this.login1==true) 

  { 

    this.login1=false; 

    this.DisplayAddOrEditForm=true; 

  } 

  else{ 

    this.DisplayAddOrEditForm=false; 

    this.login1=true; 

  } 

} 

strLoginFormResult=''; 

loginuser=false; 

 

strRegistrationMsg=''; 

RegistrationFormSubmit(){ 

  let userId = this.registrationForm.get(['userId'])?.value; 

  let pwd = this.registrationForm.get(['pwd'])?.value; 

  let confirmPwd = this.registrationForm.get(['confirmPwd'])?.value; 

 

  if(pwd==confirmPwd){ 

    this.strRegistrationMsg="Registration is Successfull..."; 

  } 

  else 

    this.strRegistrationMsg="Password is not matching with confirm Password..." 

} 

get userId(){return this.registrationForm.get('userId')} 

get pwd(){return this.registrationForm.get('pwd')} 

get confirmPwd(){return this.registrationForm.get('confirmPwd')} 

 

  email: string = ''; 

  password: string = ''; 

  role: string = ''; 

  loginMessage: string = ''; 

  Email ='' 

  login() { 

    const loginData = { 

      email: this.email, 

      password: this.password, 

      role: this.role, 

    }; 

 

    // Send login data to backend via POST request 

    this.http.post('http://localhost:8000/api/admin/login', loginData).subscribe({ 

      next: (data: any) => { 

        this.rest.updateEmail(this.email); 

        if (data === 1) { 

          this.Email=this.email; 

          this.icon=true; 

          this.loginMessage = 'Login successful!'; 

          this.authService.setAuthentication(this.role); 

          if(this.role=='Admin') 

            this.router.navigate(['/admin']); 

          else if(this.role=='Organizer') 

            this.router.navigate(['/organizer']); 

          else 

            this.router.navigate(['/attendee']); 

          this.login1=false; 

        } else { 

          this.loginMessage = 'Invalid email, password, or role.'; 

        } 

      }, 

      error: (err) => { 

        this.loginMessage = 'An error occurred: ' + err.message; 

      } 

    }); 

  } 

 

  addUser(){ 

  let id = this.UserForm.get('id')?.value; 

  let name = this.UserForm.get('name')?.value; 

  let email = this.UserForm.get('email')?.value; 

  let password = this.UserForm.get('password')?.value; 

  let role = this.UserForm.get('role')?.value; 

  let status = this.UserForm.get('status')?.value; 

 

  let userObj = new Admin(id, name, email, password, role, status); 

  alert("given data is : "+JSON.stringify(userObj)); 

    this.rest.insertUserRecord(userObj).subscribe({ 

      next : (data) => { 

                        alert ('Record Inserted successfully..'); 

                        this.getAllEmployees() 

                        }, 

      error : (err) => alert(err), 

      complete : () => console.log('Insert Operation is successfull') 

    }) 

 

  } 

 

 

} 