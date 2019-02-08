import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './_services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'profile', 
    canActivate: [AuthGuardService],
    loadChildren: './profile/profile.module#ProfileModule', 
  },
  { 
    path: 'overview', 
    canActivate: [AuthGuardService],
    loadChildren: './overview/overview.module#OverviewModule', 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
