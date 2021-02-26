import { Injectable } from '@angular/core';
import {StorageService} from "../storage/storage.service";
import {observable} from "rxjs";
import {environment} from "../../../environments/environment";


export class Message {
  type : string = "";
  data : any = "";

  constructor(type: string, data: any) {
    this.data = data;
    this.type = type;
  }
  json(): string{
    return JSON.stringify(this)
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // url = "ws://37.139.42.202/socket/terminal/user?email=";
  url = "ws://"+ environment.host +"/socket/terminal/user?email=";
  ws: WebSocket | undefined;

  constructor(storageService: StorageService) {
    this.url += storageService.getUser()?.Email;
    this.connect()
  }
  handlers = new Map([
    ["new_connection", (data: any) => {}],
    ["connection_closed", (data: any) => {}],
  ]);
  public sendDate(){}

  send(data: Message){
    if (this.ws != undefined){
      this.ws.send(data.json());
    }
  }

  private connect(){
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener('open', (event: Event) => {
      this.send(new Message("initUser" ,"test@gmail.com"));
    });

    this.ws.addEventListener('message', (event: { data: any; }) => {
      let e = JSON.parse(event.data);
      let f = this.handlers.get(e.type);
      if(f !== undefined){
        f(e)
      }
    });
  }
}
