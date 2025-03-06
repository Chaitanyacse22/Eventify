// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class RestService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http'; 

import { Injectable } from '@angular/core'; 

import { BehaviorSubject, Observable } from 'rxjs'; 

import { Admin } from './Admin'; 

import { Event } from './Event'; 

import { feedbacks } from './Feedback'; 

 

@Injectable({ 

  providedIn: 'root' 

}) 

export class RestService { 

 

  private emailSubject = new BehaviorSubject<string>(''); // Store the email in BehaviorSubject 

  currentEmail = this.emailSubject.asObservable(); // Make the email accessible to other components 

 

  // Method to update the email value 

  updateEmail(email: string) { 

    this.emailSubject.next(email); 

  } 

 

  constructor(private http : HttpClient) { } 

  strUrl="http://localhost:8000"; 

 

  getRegistrationsByUserId(userId: number): Observable<any> { 

    let strgetUrl = `${this.strUrl}/events/RegisteredEventByUser?user_id=${userId}`; 

    console.log("strgetUrl : "+strgetUrl); 

    return this.http.get(strgetUrl); 

  } 

 

  getAllUsers():Observable<any>{ 

    let strGetUrl = this.strUrl + "/api/admin/user"; 

    return this.http.get<string>(strGetUrl); 

  } 

 

  getUserId(email:string):Observable<any>{ 

    const strGetUrl = `${this.strUrl}/api/admin/user/hello/${email}`; 

    return this.http.get<string>(strGetUrl); 

  } 

 

  getAllEvents():Observable<any>{ 

    let strGetUrl = this.strUrl + "/api/admin/getEvents"; 

    return this.http.get<string>(strGetUrl); 

  } 

 

  getAllOrganizers():Observable<any>{ 

    let strGetUrl = this.strUrl + "/api/admin/user/role/" + "Organizer"; 

    return this.http.get<string>(strGetUrl); 

  } 

 

  insertUserRecord(userObj: Admin):Observable<any> 

  { 

    const headers = {'content-type' : 'application/json'}; 

    const userRec = JSON.stringify(userObj); 

    alert("Given data is : "+JSON.stringify(userRec)); 

    let strGetUrl = this.strUrl  + "/api/admin/user/insert"; 

    return this.http.post<string>(strGetUrl, userRec, {'headers' : headers, responseType:'text' as 'json'}) 

  } 

 

  updateUserRecord(id: number, status : string): Observable<any> 

  { 

    const headers = { 'Content-Type': 'application/json' }; 

    const requestBody = { status }; 

    const strGetUrl = `${this.strUrl}/api/admin/updateUser/${id}/status`; 

 

    return this.http.put(strGetUrl, requestBody, { headers }); 

  } 

 

  deleteUserRecord(id : number):Observable<string>{ 

    const headers = {'content-type' : 'application/json'}; 

    let strGetUrl = this.strUrl  + "/api/admin/deleteUser/" + id; 

    return this.http.delete<string>(strGetUrl, {'headers' : headers, responseType:'text' as 'json'}) 

  } 

 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

 

  totalRegistrations():Observable<any>{  

    let getstrUrl = this.strUrl+"/events/total-registrations-per-event";  

    return this.http.get(getstrUrl); 

  } 

 

  allOrganizerRevenue():Observable<any>{  

    let getstrUrl = this.strUrl+"/events/revenue-by-organizer";  

    return this.http.get(getstrUrl); 

  } 

 

  organizerRevenue(organizerId: number):Observable<any>{  

    let getstrUrl = this.strUrl+"/events/total-revenue-by-organizer/"+ organizerId;  

    return this.http.get(getstrUrl); 

  }  

 

  eventTypeRevenue(organizerId: number, eventType: string):Observable<any[]>{  

    const getstrUrl = `${this.strUrl}/events/sum-prices-by-organizer-and-event-type?organizerId=${organizerId}&eventType=${eventType}`;  

    console.log ("Event Type Revenue URL : "+getstrUrl);  

    alert("Given : "+getstrUrl);  

    return this.http.get<any[]>(getstrUrl); 

  }  

 

  organizerData(Date: string):Observable<any>{  

    let getstrUrl = this.strUrl+"/events/registrations-on-date?registrationDate="+ Date;  

    alert("Url : "+getstrUrl)  

    return this.http.get(getstrUrl);  

  } 

 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

 

  insertEvent(evenObj:Event):Observable<String>{ 

    const headers={'content-type': 'application/json'}; 

    const evenRec=JSON.stringify(evenObj); 

    console.log("evenRec:" +evenRec) 

    let strGetUrl = this.strUrl  + "/insertEvent";        

    return this.http.post<string>(strGetUrl, evenRec, {'headers' : headers, responseType:'text' as 'json'})   

  } 

  updateEventFromRestService(evenObj:Event):Observable<String>{ 

    const headers={'content-type': 'application/json'}; 

    const evenRec=JSON.stringify(evenObj); 

    let strGetUrl=this.strUrl+"/updateEvent";               

    return this.http.put<string>(strGetUrl, evenRec, {'headers' : headers, responseType:'text' as 'json'})       

  } 

  deleteEventRecordFromService(id:number):Observable<string>{ 

    const headers={'content-type': 'application/json'}; 

    let strGetUrl = this.strUrl  + "/deleteEvent/"+id; ; 

    return this.http.delete<string>(strGetUrl, {'headers' : headers, responseType:'text' as 'json'})  

 

  } 

  getAllRegisteredList():Observable<any>{ 

    let getstrUrl=this.strUrl+"/events/getRegisteredList";                

    return this.http.get(getstrUrl);  

 

  } 

  sendEventUpdates(): Observable<any>{ 

    let getstrUrl=this.strUrl+"/events/sendEventUpdates";                

    return this.http.post(getstrUrl,{});  

 } 

 

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

 

 getAllEmployeeFRomService():Observable<any>{ 

  let strgetUrl = this.strUrl +"/api/admin/getEvents"; 

  console.log("Making GET request to URL:", strgetUrl); 

  return this.http.get(strgetUrl); 

} 

 

getAllRegistrationsFRomService(): Observable<any>{ 

  let strgetUrl = this.strUrl + "/events/getRegisteredList"; 

  return this.http.get(strgetUrl); 

} 

 

 

insertEmployeeRecord(feedobj: any): Observable<any> { 

  console.log("Sending POST request to insertdata with payload:", feedobj); 

  return this.http.post<any>(`${this.strUrl}/events/insertdata`, feedobj); 

} 

 

updateEmployeeRecord(feedobj: any): Observable<any> { 

  console.log("Sending PUT request to updatedata with payload:", feedobj); 

  return this.http.put<any>(`${this.strUrl}/events/updatefeedback`, feedobj); 

} 

 

deleteRegisterRecord(id : number):Observable<string>{ 

  const headers = {'content-type' : 'application/json'}; 

  let strGetUrl = this.strUrl  + "/events/deleteRegister/" + id; 

  return this.http.delete<string>(strGetUrl, {'headers' : headers, responseType:'text' as 'json'}) 

} 

 

 

} 