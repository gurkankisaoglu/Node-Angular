import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Headers} from "@angular/http";

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }
  }

  public sendMessage(receiver:HTMLInputElement,subject:HTMLInputElement,message:HTMLInputElement) {
    var request = {to:receiver.value,subject:subject.value,text:message.value};
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    this.http.post('http://localhost:3000/sendmail/'+sessionStorage.getItem("user"), {request,headers})
      .subscribe(data => {
        if(data["success"]==true){
          alert("Mail Sent!");
          location.replace("/send-mail");
        }else{
          alert("Something gone wrong ");
          location.replace("/send-mail");
        }
      });
  }

  public goHome(){
    location.replace("/home");
  }
}
