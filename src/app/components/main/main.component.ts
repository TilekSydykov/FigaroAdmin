import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import {StorageService} from "../../services/storage/storage.service";
import {User} from "../../models/user";
import {Message, SocketService} from "../../services/socket/socket.service";
import {Terminal} from "../../models/terminal";
import {HttpService} from "../../services/http/http.service";
import {TerminalGroup} from "../../models/terminal-group";
import {AddTerminalGroupResponse} from "../../models/response/add-terminal-group-response";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy{
  main: string = "";
  terminals: Array<Terminal> = [];
  groups: Array<TerminalGroup> = [];

  newGroup = new TerminalGroup();

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private socketService: SocketService) {}

  ngOnInit(): void {

    this.update();
    this.updateGroups();
    this.socketService.handlers.set("new_connection", (data: any) => {
        let found = false;
        let dataTerminal: Terminal = JSON.parse(data.data);
        this.terminals.forEach(i => {
          if (i.MacID == dataTerminal.MacID){
            i.Online = true;
            found = true;
          }
        });
        if(!found){
          dataTerminal.Online = true;
          this.terminals.push(dataTerminal)
        }
      }
    );

    this.socketService.handlers.set("connection_closed", (data: any) => {
      this.terminals.forEach(i => {
        if (i.MacID == data.data){
          i.Online = false
        }
      })
    });
  }

  createGroup(){
    this.httpService.addTerminalGroup(this.newGroup).subscribe((i:AddTerminalGroupResponse) => {
      if(i.Error == null){
        this.updateGroups()
      }
    })
  }

  updateGroups(){
    this.httpService.getTerminalGroups().subscribe((arr)=>{
      this.groups = arr
    })
  }

  update(){
    this.httpService.getTerminals().subscribe((t:Terminal[]) => {
      this.terminals = t;
    });
  }

  ngOnDestroy(): void {
    this.socketService.handlers.set("connection_closed", (data: any) => {});
    this.socketService.handlers.set("new_connection", (data: any) => {});
  }
}
