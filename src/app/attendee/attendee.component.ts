import { Component, OnInit } from '@angular/core'; 

import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

import { RestService } from '../rest.service'; 

import { feedbacks } from '../Feedback'; 

import { ToastrService } from 'ngx-toastr'; 

interface Registration { 

  id: number; 

  email: string; 

  registration_date: string; 

  payment_status: string; 

  confirm: boolean; 

  dispute: string; 

  feedback: string; 

  rating: number; 

  event_id: number; 

  user_id: number; 

} 

 

@Component({ 

  selector: 'app-attendee', 

  standalone: false, 

  templateUrl: './attendee.component.html', 

  styleUrl: './attendee.component.css' 

}) 

export class AttendeeComponent implements OnInit{ 

 

  title = 'eventify'; 

 

  email: string = ''; 

 

  userId = 0; 

  showRegistrationTable: boolean = false; 

  eventList: any[] = []; 

  registrationList: any[] = []; 

  filteredEventList: any[] = []; 

  eventTypes: string[] = []; 

  eventLocations: string[] = []; 

  selectedType: string = ''; 

  selectedLocation: string = ''; 

  selectedDate: string = ''; 

 

  paymentForms!: FormGroup; 

  bdisplayaddoredirform: boolean = false; 

  straddoreditdisplaytitle: string = 'add record'; 

 

  // Flag to enable/disable the feedback, rating, and dispute fields 

  isRegistrationMode: boolean = true; 

 

  constructor( 

    private eventService: RestService,  

    private fb: FormBuilder, 

    private toastr : ToastrService 

  ) {} 

 

  ngOnInit(): void { 

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

    this.eventService.currentEmail.subscribe((email) => { 

      this.email = email; 

    }); 

    this.eventService.getUserId(this.email).subscribe({ 

      next : (data) => {this.userId=data.id;}, 

      error : (err) => alert (err), 

      complete : () => console.log("Fetching data from server is complete....") 

    }) 

    this.checkEventStartTimes(); 

  } 

  first = false; 

  second = false; 

  // handleButtonClick(): void { 

  //   console.log('Fetching all registrations and toggling table visibility...'); 

  //   // this.getAllRegistrations(); 

  //   this.getRegistrationsByUser();  // Fetch registrations 

  //   this.toggleTableVisibility();  // Toggle table visibility 

  // } 

   

 

  getAllEvents() { 

    this.bDisplayData==false ? this.bDisplayData=true : this.bDisplayData=false; 

    this.first = true; 

    this.second = false; 

    console.log("Fetching all events..."); 

    this.eventService.getAllEmployeeFRomService().subscribe((events: any[]) => { 

      const currentDate = new Date(); 

      this.eventList = events.map((event: any) => { 

        const eventDate = new Date(event.date); 

        if (eventDate < currentDate) { 

          event.status = 'Not Active'; // Event in the past 

        } else if (eventDate >= currentDate) { 

          event.status = 'Active'; // Event in the future or ongoing 

        } 

        return event; 

      }); 

      this.eventList = events; 

      this.filteredEventList = events; 

 

      // Extract unique values for event type and location 

      this.eventTypes = [...new Set(events.map(event => event.type))]; 

      this.eventLocations = [...new Set(events.map(event => event.location))]; 

    }); 

  } 

 

 

  getAllRegistrations() { 

    this.first = false; 

    this.second = true; 

    console.log("Fetching all registrations..."); 

    this.eventService.getAllRegistrationsFRomService().subscribe((registrations: any[]) => { 

      this.registrationList = registrations; 

      console.log("Registrations data:", this.registrationList); 

    }, (error) => { 

      console.error("Error fetching registrations data:", error); 

    }); 

  } 

 

  toggleTableVisibility(): void { 

    this.showRegistrationTable = !this.showRegistrationTable; 

  } 

 

  applyFilters() { 

    this.filteredEventList = this.eventList.filter(event => { 

      const matchesType = this.selectedType ? event.type === this.selectedType : true; 

      const matchesLocation = this.selectedLocation ? event.location === this.selectedLocation : true; 

      const matchesDate = this.selectedDate ? event.date === this.selectedDate : true; 

      return matchesType && matchesLocation && matchesDate; 

    }); 

  } 

  bDisplayData:boolean=false; 

  onRegisterButton(eventId: number) { 

    this.bdisplayaddoredirform = true; 

    this.bDisplayData==false ? this.bDisplayData=true : this.bDisplayData=false; 

    this.isRegistrationMode = true; // Set to true when in registration mode 

    this.paymentForms.patchValue({ 

      event_id: eventId 

    }); 

    this.straddoreditdisplaytitle == "add record"; 

  } 

 

  addemployeerecord() { 

    this.bdisplayaddoredirform = true; 

    this.straddoreditdisplaytitle = "add record"; 

    this.isRegistrationMode = true; // Ensure registration mode 

  } 

 

  // addoreditemployeerecord() { 

  //   alert("addoreditemployee"); 

   

  //   console.log("Current straddoreditdisplaytitle:", this.straddoreditdisplaytitle); 

   

  //   // Collect form values 

  //   let email = this.paymentForms.get('email')?.value; 

  //   let registration_date = new Date(this.paymentForms.get('registration_date')?.value).toISOString(); 

  //   let payment_status = this.paymentForms.get('payment_status')?.value; 

  //   let confirm = this.paymentForms.get('confirm')?.value === true; // Make sure it's boolean 

  //   let dispute = this.paymentForms.get('dispute')?.value; 

  //   let feedback = this.paymentForms.get('feedback')?.value; 

  //   let rating = this.paymentForms.get('rating')?.value; 

  //   let event_id = this.paymentForms.get('event_id')?.value; 

  //   let userId = this.paymentForms.get('userId')?.value; 

 

  //   let id = this.paymentForms.get('id')?.value; 

   

  //   let feedobj = new feedbacks(email, registration_date, payment_status, confirm, dispute, feedback, rating, event_id, userId); 

  //   console.log("feed obj:", feedobj); 

   

  //   if (this.straddoreditdisplaytitle == "add record") { 

  //     // Add record logic 

  //     console.log("In the add record condition"); 

  //     this.eventService.insertEmployeeRecord(feedobj).subscribe({ 

  //       next: (data) => { 

  //         alert('Record inserted successfully'); 

  //         this.getAllRegistrations(); // Refresh the list 

  //       }, 

  //       error: (err) => { 

  //         this.getAllRegistrations(); 

  //       }, 

  //       complete: () => console.log('Insert operation is successful') 

  //     }); 

  //   } else if (this.straddoreditdisplaytitle.trim() == "Edit Feedback/Rating") { 

  //     // Edit record logic 

  //     console.log("In the edit condition"+id); 

  //     feedobj.id = id; 

  //     // Call update service to update the existing record 

  //     this.eventService.updateEmployeeRecord(feedobj).subscribe({ 

  //       next: (data) => { 

  //         alert("Record updated successfully"); 

  //         this.getAllRegistrations(); // Refresh the list 

  //       }, 

  //       error: (err) => alert("Error: " + JSON.stringify(err)), 

  //       complete: () => console.log('Update operation is successful') 

  //     }); 

  //   } else { 

  //     console.log("straddoreditdisplaytitle is neither 'add record' nor 'Edit Feedback/Rating'"); 

  //   } 

  // } 

  getRegistrationsByUser() { 

    this.first = false; 

    this.second = true; 

    this.eventService.getRegistrationsByUserId(this.userId).subscribe((registrations : any[]) => { 

      this.registrationList = registrations; // Store the filtered list of registrations 

      console.log('Filtered registrations:', this.registrationList); 

    }, error => { 

      console.error('Error fetching registrations:', error); 

    }); 

  } 

  addoreditemployeerecord() { 

    alert("addoreditemployee"); 

   

    console.log("Current straddoreditdisplaytitle:", this.straddoreditdisplaytitle); 

   

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

      this.eventService.updateEmployeeRecord(feedobj).subscribe({ 

        next: (data) => { 

          alert("Record updated successfully (Feedback/Rating)"); 

          this.toastr.success("Record updated successfully (Feedback/Rating)", "Success"); 

          this.toastr.success('Operation was successful!', 'Success', { 

            timeOut: 3000,  // Duration in ms 

            positionClass: 'toast-top-right',  // Position of the toast 

            closeButton: true  // Add a close button 

          }); 

           

          this.getRegistrationsByUser(); // Refresh the list 

        }, 

        error: (err) => {this.toastr.success("Record updated successfully (Feedback/Rating)", "Success"); this.getRegistrationsByUser();}, 

        complete: () => console.log('Update operation is successful') 

      }); 

    } else { 

      // If no id, create a new registration (add record logic) 

      this.eventService.insertEmployeeRecord(feedobj).subscribe({ 

        next: (data) => { 

          alert('Record inserted successfully (Registration)'); 

          this.getRegistrationsByUser(); // Refresh the list 

        }, 

        error: (err) => {this.getRegistrationsByUser();}, 

        complete: () => console.log('Insert operation is successful') 

      }); 

    } 

  } 

   

   

  bdisplayFeedbackform = false; 

  oneditbutton(registration: feedbacks) { 

    this.bdisplayFeedbackform=true; 

        this.straddoreditdisplaytitle = "Edit Feedback/Rating";  

   

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

     

    ondeletebutton(id : number){ 

      this.eventService.deleteRegisterRecord(id).subscribe({ 

        next : (data) => {alert ("Record deleted successfully"); 

            this.getRegistrationsByUser(); 

            console.log(JSON.stringify(data)); 

        }, 

        error : (err) => {alert (JSON.stringify(err))}, 

        complete :() => console.log('delete operation is completed') 

      }); 

    } 

 

    rating: number = 0;  

      stars: number[] = [1, 2, 3, 4, 5]; 

      ratingError: boolean = false;  

   

      setRating(rating: number) { 

        if (rating >= 1 && rating <= 5) { 

          this.rating = rating;  

          this.paymentForms.get('rating')?.setValue(this.rating);  

          this.ratingError = false;  

        } 

      } 

      onRatingChange(event: any): void { 

        const newRating = parseInt(event.target.value, 10); 

         

        if (newRating >= 1 && newRating <= 5) { 

          this.rating = newRating;  

          this.paymentForms.get('rating')?.setValue(this.rating);  

          this.ratingError = false;  

        } else { 

          this.rating = 0;  

          this.paymentForms.get('rating')?.setValue(this.rating);  

          this.ratingError = true;  

        } 

      } 

registration :any =''; 

showCustomToast = false; 

customToastMessage = ''; 

 

  checkEventStartTimes() { 

    const currentDateTime = new Date(); 

    

    this.registrationList.forEach((registration: Registration) => { 

      const eventStartDate = new Date(registration.registration_date); 

      const timeDifference = eventStartDate.getTime() - currentDateTime.getTime(); 

    

      if (timeDifference <= 3600000 && timeDifference > 0) { 

        // alert(`Event starting in 1 hour: ${registration.email} - ${registration.registration_date}` + "    ticket details will be updated next few minutes"); 

        this.toastr.info(`Event starting in one hour: ${registration.email} - {registration.registration_date}`) 

        this.customToastMessage = `Event starting in 1 hour: ${registration.email} - ${registration.registration_date}`; 

        this.showCustomToast = true; 

    

        // Hide the toast after 5 seconds 

        setTimeout(() => { 

          this.showCustomToast = false; 

        }, 5000); 

      } 

      }); 

  } 

} 