import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import {StorageService} from "../../services/storage/storage.service";
import {User} from "../../models/user";
import {Message, SocketService} from "../../services/socket/socket.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  main: string = "";

  constructor(private http: HttpClient, storageService: StorageService, socketService: SocketService) {
    socketService.send(new Message("test", "fasdf"))
  }

  ngOnInit(): void {

  }
}
