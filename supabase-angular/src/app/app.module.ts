import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AccountComponent } from './application/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './application/avatar/avatar.component';
import { HomeComponent } from './application/home/home.component'

import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.router';
import {RouterOutlet} from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from './application/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ApiInterceptor } from './interceptor/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AccountComponent,
    AvatarComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule, 
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [provideRouter(routes),{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
