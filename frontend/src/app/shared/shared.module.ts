import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { LinkButtonComponent } from './components/link-button/link-button.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginButtonComponent } from './components/auth/login-button/login-button.component';
import { LogoutButtonComponent } from './components/auth/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/auth/authentication-button/authentication-button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LinkButtonComponent, 
    LoadingComponent, 
    ErrorComponent, 
    LoginButtonComponent, 
    LogoutButtonComponent, 
    AuthenticationButtonComponent, 
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LinkButtonComponent,
    LoadingComponent,
    ErrorComponent,
    LoginButtonComponent, 
    LogoutButtonComponent, 
    AuthenticationButtonComponent,
    HeaderComponent, 
    FooterComponent,

    CommonModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
