import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user-service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public userServ:UserService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }
  }

  checkAdmin() {
    return sessionStorage.getItem("authority")=="1";
  }

  getInbox() {
    location.replace("/inbox");
  }

  getOutbox() {
    location.replace("/outbox");
  }

  getMailScreen() {
    location.replace("/send-mail");
  }

  getOpPanel() {
    location.replace("/operation-panel");
  }

  getLoginScreen() {
    sessionStorage.clear();
    this.userServ.logoutUser(sessionStorage.getItem("token"));
    location.replace("/");
  }
}
