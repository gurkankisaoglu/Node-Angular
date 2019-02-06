import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import {User} from "../../models/user-model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }
  private serverApi= "http://localhost:3000/";
  public users:User[]=[];

  public getUsers(){
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    this.http.get(this.serverApi+"userlist",{headers:headers})
      .subscribe(data =>{
        for(var i=0 ; i<JSON.parse(data["_body"])["lists"].length ; i++){
          this.users.push(JSON.parse(data["_body"])["lists"][i]);
        }
      });
  }

  addUser(value: string, value2: string, value3: string, value4: string, value5: string, value6: string) {
    var request = {username:value,password:value2,email:value3,gender:value4,address:value5,authority:value6};
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    this.http.post(this.serverApi+"userlist",{request,headers})
      .subscribe(data=>{
        location.replace("operation-panel");
      })
  }

  deleteUser(value:string){
    var request = {username:value};
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    this.http.delete(this.serverApi+"userlist/"+value,{headers:headers})
      .subscribe(data =>{
        console.log(data);
        location.replace("operation-panel");
      })
  }

  updateUser(username:string, user:Object){
    var request = user;
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));
    this.http.post(this.serverApi+"userlist/"+username,{request,headers})
      .subscribe(data =>{
        location.replace("operation-panel");
      })
  }

  logoutUser(item: string | null) {
    var req;
    const headers = new Headers();
    headers.append('Content-type','application/json');
    headers.append('Authorization',sessionStorage.getItem("token"));

    this.http.put(this.serverApi+"loginpage/"+sessionStorage.getItem("token"),headers)
      .subscribe(data=>{
      })
  }
}
