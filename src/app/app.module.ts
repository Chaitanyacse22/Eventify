import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AttendeeComponent } from './attendee/attendee.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AttendeeComponent,
    OrganizerComponent,
    AboutusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// import { NgModule } from '@angular/core'; 

// import { BrowserModule } from '@angular/platform-browser'; 

 

// import { AppRoutingModule } from './app-routing.module'; 

// import { AppComponent } from './app.component'; 

// import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// import { HttpClientModule } from '@angular/common/http'; 

// import { AdminComponent } from './admin/admin.component'; 

// import { OrganizerComponent } from './organizer/organizer.component'; 

// import { AttendeeComponent } from './attendee/attendee.component'; 

// import { AboutusComponent } from './aboutus/aboutus.component'; 

// import { NgChartsModule } from 'ng2-charts'; 

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

// import { ToastrModule } from 'ngx-toastr'; 

 

// @NgModule({ 

//   declarations: [ 

//     AppComponent, 

//     AdminComponent, 

//     OrganizerComponent, 

//     AttendeeComponent, 

//     AboutusComponent 

//   ], 

//   imports: [ 

//     BrowserModule, 

//     AppRoutingModule, 

//     FormsModule, 

//     ReactiveFormsModule, 

//     HttpClientModule, 

//     NgChartsModule, 

//     BrowserAnimationsModule, // Import the animations module 

//     ToastrModule.forRoot(),   // Import ToastrModule and configure it 

//     // Other modules 

//   ], 

//   providers: [], 

//   bootstrap: [AppComponent] 

// }) 

// export class AppModule { } 