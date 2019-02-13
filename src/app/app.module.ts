import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {AuthGuard} from "./_guards/auth.guard";
import {AuthenticationService} from "./_services/authentication.service";
import {AlertService} from "./_services/alert.service";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {routing} from "./app-routing.module";
import {AlertComponent} from "./_directive/alert.component";
import {FileSelectDirective} from "ng2-file-upload";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    FormsModule

  ],
  declarations: [

    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    FileSelectDirective,


  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
