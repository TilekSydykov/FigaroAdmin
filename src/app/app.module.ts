import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { UsersComponent } from './components/users/users.component';
import { TerminalsComponent } from './components/terminals/terminals.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {StorageService} from "./services/storage/storage.service";
import {HttpService} from "./services/http/http.service";
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthInterceptor} from "./services/http/AuthInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    TerminalsComponent,
    TerminalComponent,
    PageNotFoundComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    StorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
