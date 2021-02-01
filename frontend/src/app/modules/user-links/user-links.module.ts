import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLinksComponent } from './pages/user-links/user-links.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';



@NgModule({
  declarations: [UserLinksComponent, ProfileCardComponent],
  imports: [
    CommonModule
  ]
})
export class UserLinksModule { }
