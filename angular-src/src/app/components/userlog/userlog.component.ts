import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token-service/token.service";
import {MessageService} from "../../services/message-service/message.service";

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent implements OnInit {

  constructor(public tokenServ: TokenService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }else{
      this.loadLogs();
    }
  }

  private loadLogs() {
    this.tokenServ.loadLogs();
  }

  public goBack(){
    location.replace("/operation-panel");
  }
}
