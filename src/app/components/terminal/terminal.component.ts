import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http/http.service";
import {Terminal} from "../../models/terminal";
import {ActivatedRoute} from "@angular/router";
import {AppRoutingModule} from "../../app-routing.module";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {SocketService} from "../../services/socket/socket.service";
import {TerminalGroup} from "../../models/terminal-group";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  terminal = new Terminal();
  groups: TerminalGroup[] = [];
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private socketService: SocketService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id == null){
        this.toast.error("Произошла ошибка");
      } else {
        this.httpService.getTerminal(+id).subscribe(terminal => {
          this.terminal = terminal;
        })
      }
    });

    this.socketService.handlers.set("new_connection", (data: any) => {
      if (this.terminal.MacID == data.data){
        this.terminal.Online = true
      }
    });
    this.socketService.handlers.set("connection_closed", (data: any) => {
      if (this.terminal.MacID == data.data){
        this.terminal.Online = false
      }
    });

    this.httpService.getTerminalGroups().subscribe((arr)=>{
      this.groups = arr
    })
  }

  save(){
    this.httpService.updateTerminal(this.terminal).subscribe(terminal =>{
      this.terminal = terminal;
      this.toast.success("Сохранено")
    })
  }
}
