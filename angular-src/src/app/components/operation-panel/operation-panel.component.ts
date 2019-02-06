import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user-service/user.service";

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {

  constructor(public userServ:UserService) { }

  ngOnInit() {
    if(sessionStorage.getItem("user")==null){
      location.replace("/");
    }
    else{
      this.loadUsers();
    }
  }

  public loadUsers(){
    this.userServ.getUsers();
  }

  addUser(u: HTMLInputElement, p: HTMLInputElement, e: HTMLInputElement, g: HTMLInputElement, a: HTMLInputElement, a2: HTMLInputElement) {
    this.userServ.addUser(u.value,p.value,e.value,g.value,a.value,a2.value);
  }

  deleteUser(button:HTMLButtonElement){
    console.log(button.parentNode.parentNode.parentNode)
    var username=button.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].nodeValue;
    this.userServ.deleteUser(username);
  }

  updateUser(button: HTMLButtonElement, newProperty: HTMLInputElement , changeProperty:HTMLInputElement){
    var row=button.parentNode.parentNode.parentNode;
    var user;
    var username=row.childNodes[0].childNodes[0].nodeValue;
    var i=0;
    console.log(newProperty.value + " " + changeProperty.value);
    switch (changeProperty.value){
      case "username":
        user={username:newProperty.value,
          password:row.childNodes[1].childNodes[0].nodeValue,
          email:row.childNodes[2].childNodes[0].nodeValue,
          gender:row.childNodes[3].childNodes[0].nodeValue,
          address:row.childNodes[4].childNodes[0].nodeValue,
          authority:row.childNodes[5].childNodes[0].nodeValue
        };
        break;
      case "password":
        user={username:row.childNodes[0].childNodes[0].nodeValue,
          password:newProperty.value,
          email:row.childNodes[2].childNodes[0].nodeValue,
          gender:row.childNodes[3].childNodes[0].nodeValue,
          address:row.childNodes[4].childNodes[0].nodeValue,
          authority:row.childNodes[5].childNodes[0].nodeValue
        };
        break;
      case "email":
        user={username:row.childNodes[0].childNodes[0].nodeValue,
          password:row.childNodes[1].childNodes[0].nodeValue,
          email:newProperty.value,
          gender:row.childNodes[3].childNodes[0].nodeValue,
          address:row.childNodes[4].childNodes[0].nodeValue,
          authority:row.childNodes[5].childNodes[0].nodeValue
        };
        break;
      case "address":
        user={username:row.childNodes[0].childNodes[0].nodeValue,
          password:row.childNodes[1].childNodes[0].nodeValue,
          email:row.childNodes[2].childNodes[0].nodeValue,
          gender:row.childNodes[3].childNodes[0].nodeValue,
          address:newProperty.value,
          authority:row.childNodes[5].childNodes[0].nodeValue
        };
        break;
      case "authority":
        user={username:row.childNodes[0].childNodes[0].nodeValue,
          password:row.childNodes[1].childNodes[0].nodeValue,
          email:row.childNodes[2].childNodes[0].nodeValue,
          gender:row.childNodes[3].childNodes[0].nodeValue,
          address:row.childNodes[4].childNodes[0].nodeValue,
          authority:newProperty.value
        };
        break;
      default:
        i++;
        break;
    }
    if(i==0)this.userServ.updateUser(username,user);

  }

  public sort(a) {
    var sorted=0;
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("usersTable");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.getElementsByTagName("TR");

      for (i = 1; i < (rows.length - 1); i++) {
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
    table = document.getElementById("usersTable");
    switching = true;

    while (switching) {

      switching = false;
      rows = table.getElementsByTagName("TR");

      for (i = 1; i < (rows.length - 1); i++) {
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

  public goHome(){
    location.replace("/home");
  }


  loadInfo() {
    location.replace("/userlog");
  }
}
