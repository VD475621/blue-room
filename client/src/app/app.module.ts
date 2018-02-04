import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { DataService } from './services/data.service';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListchatComponent } from './components/listchat/listchat.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { SignupComponent } from './components/signup/signup.component';
 
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("174193133309943")
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ListchatComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
