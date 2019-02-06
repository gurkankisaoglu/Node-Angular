///<reference path="../../../../node_modules/rxjs/internal/Observable.d.ts"/>
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Message} from "../../models/message-model/Message";
import {HttpClient, HttpHeaderResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class MessageService {

  constructor(private http: Http) { }
  private serverApi= "http://localhost:3000/";
  public messages:Message[]=[];

  public getMessages(username:string,inOrOut:number){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    if(inOrOut==1){
      //inbox
      this.http.get(this.serverApi+"inbox/"+username,{headers:headers})
        .subscribe(data =>{
          for(var i=0 ; i<JSON.parse(data["_body"])["lists"].length ; i++){
            this.messages.push(JSON.parse(data["_body"])["lists"][i]);
          }
      })
    }
    else{
      //outbox;
      this.http.get(this.serverApi+"outbox/"+username,{headers:headers})
        .subscribe(data =>{
          for(var i=0 ; i<JSON.parse(data["_body"])["lists"].length ; i++){
            this.messages.push(JSON.parse(data["_body"])["lists"][i]);
          }
        })
    }

  }
}



