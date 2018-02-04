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
import { SharingService } from './services/sharing.service';
import { ChatService } from './services/chat.service';
import { DemandeComponent } from './components/demande/demande.component';
import { ListdemandeComponent } from './components/listdemande/listdemande.component';
import { SignupFacebookComponent } from './components/signup-facebook/signup-facebook.component';
 
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
    SignupComponent,
    DemandeComponent,
    ListdemandeComponent,
    SignupFacebookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [DataService, SharingService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
