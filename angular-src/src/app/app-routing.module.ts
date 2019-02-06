///<reference path="../../node_modules/@angular/router/src/router_module.d.ts"/>
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {InboxComponent} from "./components/inbox/inbox.component";
import {OutboxComponent} from "./components/outbox/outbox.component";
import {SendMailComponent} from "./components/send-mail/send-mail.component";
import {OperationPanelComponent} from "./components/operation-panel/operation-panel.component";
import {UserlogComponent} from "./components/userlog/userlog.component";

const appRoutes: Routes = [
  { path: '', component: LoginComponent},

  {path: 'home', component: HomeComponent},

  {path: 'inbox', component: InboxComponent},

  {path: 'outbox', component: OutboxComponent},

  {path: 'send-mail', component: SendMailComponent},

  {path: 'operation-panel', component: OperationPanelComponent},

  {path: 'userlog', component:UserlogComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
