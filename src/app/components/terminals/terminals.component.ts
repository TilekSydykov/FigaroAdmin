import {Component, OnDestroy, OnInit} from '@angular/core';
import {Terminal} from "../../models/terminal";
import {HttpService} from "../../services/http/http.service";
import {AddTerminalResponse} from "../../models/response/add-terminal-response";
import {ToastrService} from "ngx-toastr";
import {SocketService} from "../../services/socket/socket.service";
import {TerminalGroup} from "../../models/terminal-group";
import {AddTerminalGroupResponse} from "../../models/response/add-terminal-group-response";

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.css']
})
export class TerminalsComponent implements OnInit, OnDestroy{
  newTerminal: Terminal = new Terminal();
  terminals: Array<Terminal> = [];

  groups: Array<TerminalGroup> = [];

  newGroup = new TerminalGroup();

  constructor(private httpService: HttpService,
              private toastr: ToastrService,
              private socketService: SocketService) { }

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

  update(){
    this.httpService.getTerminals().subscribe((t:Terminal[]) => {
      this.terminals = t;
    });
  }

  updateGroups(){
    this.httpService.getTerminalGroups().subscribe((arr)=>{
      this.groups = arr
    })
  }

  add(){
    if (this.newTerminal.Name == ""){
      this.toastr.error(`название не может быть '${this.newTerminal.Name}'`);
      return
    }
    this.httpService.addTerminal(this.newTerminal).subscribe( (res: AddTerminalResponse)=>{
      if(res.Error == null){
        this.terminals.push(res.Value);
        this.toastr.success("Добавлено");
        this.newTerminal = new Terminal();
      }else{
        this.toastr.error(res.Error.message)
      }
    })
  }

  ngOnDestroy(): void {
    this.socketService.handlers.set("connection_closed", (data: any) => {});
    this.socketService.handlers.set("new_connection", (data: any) => {});
  }
}
