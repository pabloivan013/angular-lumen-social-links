import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { environment as env } from '../environments/environment';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SaveLoggedUserComponent } from './pages/save-logged-user/save-logged-user.component';

// Components
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';

// Material
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { SocialLinkCardComponent } from './components/social-link-card/social-link-card.component';
import { SocialLinkDisplayComponent } from './components/social-link-display/social-link-display.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ErrorComponent } from './components/error/error.component';
import { UserLinksComponent } from './pages/user-links/user-links.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { LinkButtonComponent } from './components/link-button/link-button.component';


@NgModule({
  declarations: [
    AppComponent,
    SaveLoggedUserComponent,
    HomeComponent,
    ProfileComponent,
    LoadingComponent,
    NavBarComponent,
    FooterComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    SocialLinkCardComponent,
    SocialLinkDisplayComponent,
    ProfileCardComponent,
    ErrorComponent,
    UserLinksComponent,
    ShareLinkComponent,
    LinkButtonComponent
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.dev.serverUrl}/api/auth0/*`],
      }
    },),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
