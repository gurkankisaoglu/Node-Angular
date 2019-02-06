import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  login(username: HTMLInputElement,password: HTMLInputElement) {
    var user = {username:username.value,password:password.value};
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/loginpage', user, {
      headers: headers
    })
      .subscribe(data => {
        if(data["success"]==true){
          sessionStorage.setItem("user",username.value);
          sessionStorage.setItem("token",data["token"]);
          sessionStorage.setItem("authority",data["lists"][0]["authority"]);
          location.replace("/home");
        }
      });
  }

}
