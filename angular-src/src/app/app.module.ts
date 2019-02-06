import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';



import {TokenService} from "./services/token-service/token.service";
import {MessageService} from "./services/message-service/message.service";
import {UserService} from "./services/user-service/user.service";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from '@angular/common/http';
import { InboxComponent } from './components/inbox/inbox.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { OperationPanelComponent } from './components/operation-panel/operation-panel.component';
import { UserlogComponent } from './components/userlog/userlog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InboxComponent,
    OutboxComponent,
    SendMailComponent,
    MessageListComponent,
    OperationPanelComponent,
    UserlogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [UserService,TokenService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
