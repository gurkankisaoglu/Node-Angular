import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../services/message-service/message.service";

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {

  constructor(public messageServ: MessageService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }
    else{
      this.loadMessages();
    }
  }

  public loadMessages(){
    this.messageServ.getMessages(sessionStorage.getItem("user"),0);
  }

  goHome() {
    location.replace("/home");
  }


  public sort(a) {
    var sorted=0;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("outboxTable");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.getElementsByTagName("TR");

      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[a];
        y = rows[i + 1].getElementsByTagName("TD")[a];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        sorted++;
        switching = true;
      }
    }
    if(sorted==0){
      this.sort2(a);
    }
  }
  public sort2(a) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("outboxTable");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.getElementsByTagName("TR");

      for (i = 0; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("TD")[a];
        y = rows[i + 1].getElementsByTagName("TD")[a];
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
}
