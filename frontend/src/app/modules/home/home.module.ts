import { NgModule } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { SocialLinkDisplayComponent } from './components/social-link-display/social-link-display.component';
import { SocialLinkCardComponent } from './components/social-link-card/social-link-card.component';
import { HomeComponent } from './pages/home/home.component';

//Shared
import { SharedModule } from '../../shared/shared.module'



@NgModule({
  declarations: [
    ProfileCardComponent, 
    ShareLinkComponent, 
    SocialLinkDisplayComponent, 
    SocialLinkCardComponent, 
    HomeComponent,
    //LinkButtonComponent
  ],
  imports: [
    SharedModule,
  ]
})
export class HomeModule { }
