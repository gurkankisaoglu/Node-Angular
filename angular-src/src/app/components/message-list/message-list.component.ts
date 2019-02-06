import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }
    else{
    }
  }

}
