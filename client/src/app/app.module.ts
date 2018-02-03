import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListchatComponent } from './components/listchat/listchat.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ListchatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
