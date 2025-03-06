import { Component, OnInit } from '@angular/core'; 

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { RestService } from '../rest.service'; 

// import { Admin } from '../admin'; 

import { ChartData, ChartOptions } from 'chart.js'; 

// import { feedbacks } from '../Feedback'; 

import { ToastRef, ToastrService } from 'ngx-toastr'; 
import { Admin } from '../Admin';
import { feedbacks } from '../Feedback';

 

@Component({ 

  selector: 'app-admin', 

  standalone: false, 

  templateUrl: './admin.component.html', 

  styleUrl: './admin.component.css' 

}) 

export class AdminComponent implements OnInit{ 

 

email: string = ''; 

userId = 0; 

ngOnInit(): void { 

  this.rest.currentEmail.subscribe((email) => { 

    this.email = email; 

  }); 

  this.paymentForms = this.fb.group({ 

        id: [''], 

        userId: [null, Validators.required], 

        event_id: [null, Validators.required], 

        email: ['', [Validators.required, Validators.email]], 

        registration_date: ['', Validators.required], 

        payment_status: ['', Validators.required],  

        confirm: [false], 

        dispute: [''], 

        rating: [null, [Validators.min(1), Validators.max(5)]], 

        feedback: [''] 

      }); 

  this.rest.getUserId(this.email).subscribe({ 

    next : (data) => {this.userId=data.id;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

  // this.getAllRegistrations(); 

} 

 

first =false 

second=false 

third=false 

  empLst : any; 

  getAllEmployees(){ 

    this.r1=false 

    this.r2=false 

    this.r3=false 

    this.r4=false 

    this.r5 = false 

    this.r6=false 

    this.first==false ? this.first=true : this.first=false; 

    this.second=false; 

    this.third=false; 

  this.rest.getAllUsers().subscribe({ 

    next : (data) => {this.empLst=data;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

} 

DisplayAddOrEditForm = false; 

strAddOrEditDisplayTitle = ''; 

addEmployeeRecord(){ 

    this.r1=false 

    this.r2=false 

    this.r3=false 

    this.r4=false 

    this.r5 = false 

    this.first=false; 

    this.r6=false 

    this.second==false ? this.second=true : this.second=false; 

    this.third=false; 

  this.DisplayAddOrEditForm = true; 

  this.strAddOrEditDisplayTitle = "Add Record"; 

} 

r1=false 

r2=false 

r3=false 

r4=false 

eventLst:any; 

monitorEvents(){ 

  this.r1=false 

    this.r2=false 

    this.r3=false 

    this.r4=false 

    this.r5 = false 

    this.r6=false 

  this.first=false; 

    this.second=false; 

    this.third==false ? this.third=true : this.third=false; 

  this.rest.getAllEvents().subscribe({ 

    next : (data) => {this.eventLst=data;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

} 

 

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

 

UserForm! : FormGroup; 

 

constructor(private rest : RestService, private fb : FormBuilder, private toastr : ToastrService){ 

    this.UserForm = this.fb.group({ 

      id : [''], 

      name : [''], 

      email : [''], 

      password : [''], 

      role : [''], 

      status : [''] 

    }) 

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

 

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

 

    // registrations : any;  

 

    // getAllRegistrations(){  

      // this.r1==false ? this.r1=true : this.r1=false; 

      // this.r2=false 

      // this.r3=false 

      // this.r4=false 

 

    //   this.rest.totalRegistrations().subscribe({  

 

    //     next : (data) => {this.registrations = data;},  

 

    //     error : (err) => alert (err),  

 

    //     complete : () => console.log("Fetching data from server is complete")  

 

    //   })  

 

    // }  

 

    // revenue : any;  

 

    // getRevenue(){  

 

    //   this.event.totalRevenue().subscribe({  

 

    //     next : (data) => {this.revenue = data;},  

 

    //     error : (err) => alert (err),  

 

    //     complete : () => console.log("Fetching data from server is complete")  

 

    //   })  

 

    // }  

 

  

 

    // allrevenue : any;  

 

    //   getallRevenue(){ 

      //   this.r1=false 

      //   this.r2==false ? this.r2=true : this.r2=false; 

      // this.r3=false 

      // this.r4=false 

 

    //     this.rest.allOrganizerRevenue().subscribe({  

 

    //       next : (data) => {this.allrevenue = data;},  

 

    //       error : (err) => alert (err),  

 

    //       complete : () => console.log("Fetching data from server is complete")  

 

    //     })  

 

    //   }  

 

  

 

    organizerrevenue : any;  

 

    organizerId = 1;  

 

    getOrganizerRevenue(){  

 

      this.rest.organizerRevenue(this.organizerId).subscribe({  

 

        next : (data) => {this.organizerrevenue = data;},  

 

        error : (err) => alert (err),  

 

        complete : () => console.log("Fetching data from server is complete")  

 

      })  

 

    }  

 

  

 

    // eventTyperevenue : any;  

 

    eventTyperevenue!: any[]; // Array to store the revenue data  

 

  organizerId1 =  2; // Default organizer ID  

 

  // eventType = 'Technology'; // Default event type is empty  

 

  eventType =''  

 

    

 

    geteventTypeRevenue(){ 

      this.r1=false 

      this.r2=false 

      this.r3==false ? this.r3=true : this.r3=false; 

      this.r4=false 

      this.r5 = false 

      this.r6=false 

 

      this.rest.eventTypeRevenue(this.organizerId1, this.eventType).subscribe({  

 

        next : (data) => {this.eventTyperevenue = data;   console.log("Success..eventTypeRevenue Count:" + data.length);},  

 

        error : (err) => console.log("event TypeRevenue error:" + JSON.stringify(err)),  

 

        complete : () => console.log("Fetching data from server is complete")  

 

      })  

 

    }  

 

    // organizerDate:any;  

 

    // Date ='';  

 

    // getRegistrationCount(){ 

    //   this.r1=false 

    //   this.r2=false 

    //   this.r3=false 

    //   this.r4==false ? this.r4=true : this.r4=false; 

    //   this.r5 = false 

 

    //   alert("Given : "+this.Date)  

 

    //   this.rest.organizerData(this.Date).subscribe({  

 

    //     next : (data) => {this.organizerDate = data;},  

 

    //     error : (err) => console.log("organizerData error :" + err),  

 

    //     complete : () => console.log("Fetching data from server is complete")  

 

    //   })  

 

    // } 

 

    registrations: any[] = []; 

    eventRevenueBarChartData: ChartData<'bar'> = { 

      labels: [],  // Event IDs will go here 

      datasets: [ 

        { 

          data: [],  // Registration Counts will go here 

          label: 'Total Registrations', 

          backgroundColor: 'rgba(75, 192, 192, 0.2)', 

          borderColor: 'rgba(75, 192, 192, 1)', 

          borderWidth: 1 

        }, 

        { 

          data: [], // Revenue data will go here 

          label: 'Total Revenue', 

          backgroundColor: 'rgba(255, 99, 132, 0.5)', 

          borderColor: 'rgba(255, 99, 132, 1)', 

          borderWidth: 1 

        }, 

        

     

      ] 

    }; 

     

    // Chart options for Total Registrations per Event (Bar chart) 

    eventRevenueBarChartOptions: ChartOptions = { 

      responsive: true, 

      scales: { 

        x: { 

          title: { text: 'Event ID , Total Registrations', display: true } 

        }, 

        y: { 

          beginAtZero: true, 

          title: { text: 'Amount', display: true } 

        } 

      } 

 

  } 

 

  allrevenue: any[] = []; 

eventRevenueLineChartData: ChartData<'line'> = { 

      labels: [],                                             

      datasets: [ 

        { 

          data: [],                                                

          label: 'Total Revenue', 

          fill: false, 

          borderColor: 'rgba(255, 99, 132, 1)', 

          tension: 0.1 

        } 

      ] 

    }; 

     

    eventRevenueLineChartOptions: ChartOptions = { 

      responsive: true, 

      scales: { 

        x: { 

          title: { text: 'Organizer ID', display: true }, 

          ticks: { 

            autoSkip: false, // Disable automatic skipping of ticks 

            maxRotation: 45 // Allow labels to rotate if they overlap 

            // minRotation: 45 // Optional: You can adjust the rotation angle 

          } 

        }, 

        y: { 

          beginAtZero: true, 

          title: { text: 'Revenue', display: true } 

        } 

      } 

    }; 

 

  getAllRegistrations(){ 

    this.r1==false ? this.r1=true : this.r1=false; 

      this.r2=false 

      this.r3=false 

      this.r4=false 

      this.r5 = false 

      this.r6=false 

    this.rest.totalRegistrations().subscribe({ 

      next: (data) => { 

        this.registrations = data;  // Populate the registrations array with the fetched data 

   

        // Now update the chart data based on the fetched data 

        this.updateChartData(); 

      }, 

      error: (err) => alert('Error fetching data: ' + err), 

      complete: () => console.log('Data fetch complete') 

    }); 

} 

r5=false; 

getallRevenue(){ 

  this.r1=false 

  this.r2==false ? this.r2=true : this.r2=false; 

this.r3=false 

this.r4=false 

this.r5 = false 

this.r6=false 

  this.rest.allOrganizerRevenue().subscribe({ 

    next: (data) => { 

      this.allrevenue = data;  // Populate the registrations array with the fetched data 

 

      // Now update the chart data based on the fetched data 

      this.updateChartData(); 

    }, 

    error: (err) => alert('Error fetching data: ' + err), 

    complete: () => console.log('Data fetch complete') 

  }); 

} 

updateChartData(): void { 

  

  this.eventRevenueBarChartData.labels = this.registrations.map(reg => `Event ${reg.eventId}`); 

  this.eventRevenueBarChartData.datasets[0].data = this.registrations.map(reg => reg.registrationCount); 

  this.eventRevenueBarChartData.datasets[1].data = this.registrations.map(reg => reg.totalRevenue); 

   

  this.eventRevenueLineChartData.labels = this.allrevenue.map(reg => `Organizer ${reg.organizerId}`); 

  this.eventRevenueLineChartData.datasets[0].data = this.allrevenue.map(reg => reg.totalRevenue); 

} 

registrationList: any[] = []; 

r6=false 

manageDispute() { 

  this.r6=false 

  this.r5==false ? this.r5=true : this.r5=false; 

  this.r1=false 

  this.r2==false 

this.r3=false 

this.r4=false 

  console.log("Fetching all registrations..."); 

  this.rest.getAllRegistrationsFRomService().subscribe((registrations: any[]) => { 

    this.registrationList = registrations; 

    console.log("Registrations data:", this.registrationList); 

  }, (error) => { 

    console.error("Error fetching registrations data:", error); 

  }); 

} 

straddoreditdisplay: string = 'Dispute'; 

bdisplayFeedbackform = false; 

  oneditbutton(registration: feedbacks) { 

    this.r6=false ? this.r6=true : this.r6=false; 

  this.r5==false 

  this.r1=false 

  this.r2==false 

this.r3=false 

this.r4=false 

    this.bdisplayFeedbackform=true; 

        this.straddoreditdisplay = "Dispute";  

   

        alert ("Received data is : "+JSON.stringify(registration)) 

      

        this.paymentForms.patchValue({ 

          id: registration.id, 

          email: registration.email, 

          registration_date: registration.registration_date , 

          payment_status: registration.payment_status , 

          confirm: registration.confirm, 

          dispute: registration.dispute, 

          feedback: registration.feedback , 

          rating: registration.rating, 

          event_id: registration.event_id, 

          userId: registration.userId 

        });    

    } 

 

    addoreditemployeerecord() { 

      alert("addoreditemployee"); 

     

      console.log("Current straddoreditdisplaytitle:", this.straddoreditdisplay); 

     

      // Collect form values 

      let email = this.paymentForms.get('email')?.value; 

      let registration_date = new Date(this.paymentForms.get('registration_date')?.value).toISOString(); 

      let payment_status = this.paymentForms.get('payment_status')?.value; 

      let confirm = this.paymentForms.get('confirm')?.value === true; // Make sure it's boolean 

      let dispute = this.paymentForms.get('dispute')?.value; 

      let feedback = this.paymentForms.get('feedback')?.value; 

      let rating = this.paymentForms.get('rating')?.value; 

      let event_id = this.paymentForms.get('event_id')?.value; 

      let userId = this.paymentForms.get('userId')?.value; 

     

      // Get the feedback record's id 

      let id = this.paymentForms.get('id')?.value; 

     

      let feedobj = new feedbacks(email, registration_date, payment_status, confirm, dispute, feedback, rating, event_id, userId); 

     

      // If we have an id, update the record, otherwise add a new one 

      if (id) { 

        feedobj.id = id; // Ensure the id is set for update 

        this.toastr.success('Operation was successful!', 'Success', { 

          timeOut: 3000,  // Duration in ms 

          positionClass: 'toast-top-right',  // Position of the toast 

          closeButton: true  // Add a close button 

        }); 

         

        // Update only the feedback and rating 

        this.rest.updateEmployeeRecord(feedobj).subscribe({ 

          next: (data) => { 

            alert("Record updated successfully (Dispute)"); 

            this.toastr.success("Record updated successfully (Dispute)", "Success"); 

            this.toastr.success('Operation was successful!', 'Success', { 

              timeOut: 3000,  // Duration in ms 

              positionClass: 'toast-top-right',  // Position of the toast 

              closeButton: true  // Add a close button 

            }); 

             

            this.manageDispute(); // Refresh the list 

          }, 

          error: (err) => {this.toastr.success("Record updated successfully (Dispute)", "Success"); this.manageDispute();}, 

          complete: () => console.log('Update operation is successful') 

        }); 

      } 

    } 

 

    paymentForms!: FormGroup; 

 

} 