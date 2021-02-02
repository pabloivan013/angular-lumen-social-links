import { NgModule } from '@angular/core';

import { UserLinksComponent } from './pages/user-links/user-links.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [UserLinksComponent, ProfileCardComponent],
  imports: [
    SharedModule
  ]
})
export class UserLinksModule { }
