import { NgModule } from '@angular/core'; 

import { RouterModule, Routes } from '@angular/router'; 

import { AdminComponent } from './admin/admin.component'; 

import { OrganizerComponent } from './organizer/organizer.component'; 

import { AttendeeComponent } from './attendee/attendee.component'; 

import { AboutusComponent } from './aboutus/aboutus.component'; 

import { authGuard } from './auth.guard'; 

import { roleGuard } from './role.guard'; 

 

const routes: Routes = [ 

  {path : "admin", component : AdminComponent, canActivate:[authGuard, roleGuard], data:{role: 'Admin'}}, 

  {path : "organizer", component : OrganizerComponent, canActivate:[authGuard, roleGuard], data:{role: 'Organizer'}}, 

  {path : "attendee", component : AttendeeComponent, canActivate:[authGuard, roleGuard], data:{role: 'Attendee'}}, 

  {path : "aboutus", component : AboutusComponent, canActivate:[authGuard]} 

]; 

 

@NgModule({ 

  imports: [RouterModule.forRoot(routes)], 

  exports: [RouterModule] 

}) 

export class AppRoutingModule { } 