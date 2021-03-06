import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListchatComponent } from './components/listchat/listchat.component';
import { SignupComponent } from './components/signup/signup.component';
import { DemandeComponent } from './components/demande/demande.component';
import { ListdemandeComponent } from './components/listdemande/listdemande.component';
import { SignupFacebookComponent } from './components/signup-facebook/signup-facebook.component';

const routes: Routes = [
  { path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ListchatComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signup_fb', component: SignupFacebookComponent},
  { path: 'demande', component: DemandeComponent},
  { path: 'demande_aide', component: ListdemandeComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}