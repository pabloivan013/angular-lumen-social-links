import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './pages/home/home.component';
import { HomeComponent} from './modules/home/pages/home/home.component'

import { UserLinksComponent } from './pages/user-links/user-links.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: ':username',
    component: UserLinksComponent
  },
  {
    path: '**' , redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
