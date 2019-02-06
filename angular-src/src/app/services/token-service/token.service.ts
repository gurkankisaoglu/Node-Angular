import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Token} from "../../models/token-model/Token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: Http) { }
  private serverApi= "http://localhost:3000/";
  public logs:Token[]=[];

  loadLogs() {
    this.http.get(this.serverApi+"userlist/"+sessionStorage.getItem("user"))
      .subscribe(data =>{
        for(let i=0 ; i<JSON.parse(data["_body"])["lists"].length ; i++){
          this.logs.push(JSON.parse(data["_body"])["lists"][i]);
        }
      });
  }
}
