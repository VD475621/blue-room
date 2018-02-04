import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListchatComponent } from './components/listchat/listchat.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',  pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path:'chat', component:ListchatComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}