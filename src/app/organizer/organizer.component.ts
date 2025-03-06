// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-organizer',
//   imports: [],
//   templateUrl: './organizer.component.html',
//   styleUrl: './organizer.component.css'
// })
// export class OrganizerComponent {

// }

import { Component, OnInit } from '@angular/core'; 

import { FormBuilder, FormGroup } from '@angular/forms'; 

import { RestService } from '../rest.service'; 

import { Event } from '../Event'; 

import { ChartData, ChartOptions } from 'chart.js'; 

 

@Component({ 

  selector: 'app-organizer', 

  standalone: false, 

  templateUrl: './organizer.component.html', 

  styleUrl: './organizer.component.css' 

}) 

export class OrganizerComponent implements OnInit { 

 

  email: string = ''; 

 

  userId = 0; 

 

ngOnInit(): void { 

  this.rest.currentEmail.subscribe((email) => { 

    this.email = email; 

  }); 

  this.rest.getUserId(this.email).subscribe({ 

    next : (data) => {this.userId=data.id;}, 

    error : (err) => alert (err), 

    complete : () => console.log("Fetching data from server is complete....") 

  }) 

} 

  EventForm!:FormGroup; 

  constructor(private fb:FormBuilder,private rest:RestService){ 

    this.EventForm=this.fb.group({ 

      id : [''], 

      title: [''], 

      description:[''], 

      type:[''], 

      date:[''], 

      location:[''], 

      price:[''], 

      status:[''], 

      organizer_id:[''], 

      created_at:[''], 

      updated_at:[''], 

      image:[''] 

    }) 

  } 

  eventLst:any; 

  getEvents(){ 

      this.rest.getAllEvents().subscribe({ 

        next:(data)=>{ 

          const currentDate = new Date(); 

          this.eventLst = data.map((even: any) => { 

            const eventDate = new Date(even.date); 

            if (eventDate < currentDate) { 

              even.status = 'Not Active'; 

            } 

            else if(eventDate>= currentDate) 

              even.status = 'Active';           

            return even; 

          }); 

          this.eventLst=data;}, 

        error:(err)=>alert(err), 

        complete:()=>console.log("Fetching data is complete") 

      }) 

    } 

    bDisplayAddOrEditForm=false; 

    strAddOrEditDisplayTitle=''; 

    addEventRecord(){ 

      this.bDisplayAddOrEditForm=true; 

      this.strAddOrEditDisplayTitle="Add New Event" 

    } 

    flipCard(even: any) { 

      const cardElement = document.getElementById('card-' + even.id); // Get the card element 

      if (cardElement) { 

        cardElement.classList.toggle('flip'); // Toggle the 'flip' class to trigger the CSS flip effect 

      } 

    } 

     

    AddOrEditEventRecord(){ 

      alert("flag data: "+this.strAddOrEditDisplayTitle) 

      let id=this.EventForm.get('id')?.value; 

      let title=this.EventForm.get('title')?.value; 

      let description=this.EventForm.get('description')?.value; 

      let type=this.EventForm.get('type')?.value; 

      let date=this.EventForm.get('date')?.value; 

      let location=this.EventForm.get('location')?.value; 

      let price=this.EventForm.get('price')?.value; 

      let status=this.EventForm.get('status')?.value; 

      let organizer_id=this.EventForm.get('organizer_id')?.value; 

      let created_at=this.EventForm.get('created_at')?.value; 

      let updated_at=this.EventForm.get('updated_at')?.value; 

      let image=this.EventForm.get('image')?.value; 

 

      let evenObj=new Event(id,title,description,type,date,location,price,status,organizer_id,created_at,updated_at,image); 

      if(this.strAddOrEditDisplayTitle=="Add New Event"){ 

        this.rest.insertEvent(evenObj).subscribe({ 

          next: (data)=>{ 

            alert('Record Inserted'); 

            this.getEvents(); 

          }, 

          error: (err) =>alert("error is"+ JSON.stringify(err)), 

          complete:() => console.log('Insert is done') 

        }); 

 

      } 

      else if(this.strAddOrEditDisplayTitle=="Edit Event"){ 

        this.rest.updateEventFromRestService(evenObj).subscribe({ 

          next: (data)=>{ 

            alert('Record Updated'); 

            this.getEvents(); 

          }, 

          error: (err) =>alert(JSON.stringify(err)), 

          complete:() => console.log('Update is done') 

        }); 

 

      } 

       

    } 

    OnEditEventRecord(evenRec:Event){ 

      this.bDisplayAddOrEditForm=true; 

      this.strAddOrEditDisplayTitle="Edit Event"; 

      this.EventForm.patchValue({ 

        id:evenRec.id, 

        title:evenRec.title, 

        description:evenRec.description, 

        type:evenRec.type, 

        Date:evenRec.date, 

        location:evenRec.location, 

        price:evenRec.price, 

        status:evenRec.status, 

        organizer_id:evenRec.organizer_id, 

        created_at:evenRec.created_at, 

        updated_at:evenRec.updated_at, 

        image:evenRec.image 

      }); 

      // alert("Given Event details: "+JSON.stringify(eventRecord)) 

    } 

    OnDeleteEventRecord(id:number){ 

      // alert("Event id is :"+id); 

      this.rest.deleteEventRecordFromService(id).subscribe({ 

        next : (data)=> { 

          alert('Record deleted successfully'); 

          this.getEvents(); 

          console.log(JSON.stringify(data)); 

        }, 

        error:(err)=> alert(JSON.stringify(err)), 

        complete: () => console.log('delete operation is done') 

      }) 

    }  

    regLst:any; 

    getRegisteredList(){ 

      this.rest.getAllRegisteredList().subscribe({ 

        next:(data)=>{this.regLst=data; 

          alert("Given Data : "+JSON.stringify(this.regLst)); 

        }, 

        error:(err)=>alert(err), 

        complete:()=>console.log("Displaying the registered list") 

      }) 

    } 

    bDisplayData:boolean=false; 

    displayData(){ 

      this.bDisplayData=true; 

    } 

    //             sending mail  

 

  sendEventUpdates(){ 

    this.rest.sendEventUpdates().subscribe({ 

      next:(response)=>{ 

        alert('Event update email is sent') 

      }, 

      error:(err)=>{ 

        console.error("error sending updates",err); 

        alert('Failed to send update'); 

      }, 

      complete:()=>console.log('email sending operation is complete') 

    }); 

  } 

  showCustomToast = false; 

  customToastMessage = ''; 

  getStatus(selectedRegistrationId: number) { 

    // Find the specific registration based on its ID 

    const registration = this.regLst.find((reg: any) => reg.id === selectedRegistrationId); 

   

    // If the registration is found, check its payment status and show an alert 

    if (registration) { 

      if (registration.payment_status === 'Pending') { 

        this.customToastMessage=`Payment is pending for registration ID: ${registration.id}. Please complete the payment.`; 

        this.showCustomToast = true; 

      } else if (registration.payment_status === 'Completed') { 

        this.customToastMessage=`Event registration is successful for registration ID: ${registration.id}. Your payment has been completed.`; 

        this.showCustomToast = true; 

      } else if (registration.payment_status === 'creditcard') { 

        this.customToastMessage=`Payment with registration ID: ${registration.id} has been paid through Credit Card.`; 

        this.showCustomToast = true; 

      } 

      else if (registration.payment_status === 'debitcard') { 

        this.customToastMessage=`Payment with registration ID: ${registration.id} has been paid through Debit Card.`; 

        this.showCustomToast = true; 

      } 

      else if (registration.payment_status === 'upi') { 

        this.customToastMessage=`Payment with registration ID: ${registration.id} has been paid through upi.`; 

        this.showCustomToast = true; 

      } 

    } else { 

      alert('Registration not found.'); 

      this.showCustomToast = true; 

    } 

    setTimeout(() => { 

      this.showCustomToast = false; 

    }, 2000); 

 

} 

organizerrevenue : any;  

 

    organizerId = this.userId;  

 

    getOrganizerRevenue(){  

 

      this.rest.organizerRevenue(this.userId).subscribe({  

 

        next : (data) => {this.organizerrevenue = data;},  

 

        error : (err) => alert (err),  

 

        complete : () => console.log("Fetching data from server is complete")  

 

      })  

 

    } 

    organizerDate:any;  

 

    Date ='';  

    r4=false 

    getRegistrationCount(){ 

      this.r4==false ? this.r4=true : this.r4=false; 

      alert("Given : "+this.Date)  

 

      this.rest.organizerData(this.Date).subscribe({  

 

        next : (data) => {this.organizerDate = data;},  

 

        error : (err) => console.log("organizerData error :" + err),  

 

        complete : () => console.log("Fetching data from server is complete")  

 

      })  

 

    } 

} 

 

// registrations: any[] = []; 

 

// eventRevenueBarChartData: ChartData<'bar'> = { 

//  labels: [],  // Event IDs will go here 

//  datasets: [ 

//    { 

//      data: [],  // Registration Counts will go here 

//      label: 'Total Registrations', 

//      backgroundColor: 'rgba(75, 192, 192, 0.2)', 

//      borderColor: 'rgba(75, 192, 192, 1)', 

//      borderWidth: 1 

//    }, 

//    { 

//      data: [], // Revenue data will go here 

//      label: 'Total Revenue', 

//      backgroundColor: 'rgba(255, 99, 132, 0.5)', 

//      borderColor: 'rgba(255, 99, 132, 1)', 

//      borderWidth: 1 

//    }, 

   

 

//  ] 

// }; 

 

// // Chart options for Total Registrations per Event (Bar chart) 

// eventRevenueBarChartOptions: ChartOptions = { 

//  responsive: true, 

//  scales: { 

//    x: { 

//      title: { text: 'Event ID , Total Registrations', display: true } 

//    }, 

//    y: { 

//      beginAtZero: true, 

//      title: { text: 'Amount', display: true } 

//    } 

//  } 

// }} 

  

  // for alerts 

  // sendEventUpdates() { 

  //   this.rest.sendEventUpdates().subscribe({ 

  //     next: (response) => { 

  //       const message = response;  

  //       alert(message);  

  //     }, 

  //     error: (err) => { 

  //       console.error("Error sending updates:", err); 

  //       alert('Failed to send update'); 

  //     }, 

  //     complete: () => console.log('Email sending operation is complete') 

  //   }); 

// } 