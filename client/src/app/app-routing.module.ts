import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ListchatComponent } from './components/listchat/listchat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path:'chat', component:ListchatComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}