import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {LoginComponent} from "./login/login.component";

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

const appRoutes: Routes = [
  { path: 'index.html', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'index.html' }
];

export const routing = RouterModule.forRoot(appRoutes);
