import { Component, OnInit } from '@angular/core';
import {TerminalGroup} from "../../models/terminal-group";
import {Group} from "../../models/group";
import {AddTerminalGroupResponse} from "../../models/response/add-terminal-group-response";
import {HttpService} from "../../services/http/http.service";
import {ToastrService} from "ngx-toastr";
import {AddGroupResponse} from "../../models/response/add-group-response";
import {Terminal} from "../../models/terminal";
import {User} from "../../models/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  groups: Array<Group> = [];
  users: Array<User>  = [];

  newGroup = new Group();

  constructor(private httpService: HttpService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.update();
    this.updateGroups();
  }

  createGroup(){
    if(this.newGroup.Name == ""){
      this.toastr.error("Поле пустое");
      return
    }
    this.httpService.addGroup(this.newGroup).subscribe((i:AddGroupResponse) => {
      if(i.Error == null){
        this.toastr.success("Роль создана");
        this.updateGroups();
        this.newGroup.Name = "";
      }else {
        this.toastr.error("Error");
      }
    })
  }

  saveGroup(g: Group){
    this.httpService.saveGroup(g).subscribe((i:TerminalGroup) => {
      this.toastr.success("Сохранено")
    })
  }

  deleteGroup(g: Group){
    if (confirm("Уверены что хотите удалить роль? " + g.Name)){
      this.httpService.deleteGroup(g).subscribe((t:String) => {
        this.updateGroups();
        this.toastr.success("Успешно удалено")
      });
    }
  }

  updateGroups(){
    this.httpService.getGroups().subscribe((arr)=>{
      this.groups = arr
    })
  }

  update(){
    this.httpService.getUsers().subscribe((t:User[]) => {
      this.users = t;
    });
  }

}
