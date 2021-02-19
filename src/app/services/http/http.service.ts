import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {LoginResponse} from "../../models/response/login-response";
import {Endpoints} from "./endpoints";
import {Terminal} from "../../models/terminal";
import {StorageService} from "../storage/storage.service";
import {AddTerminalResponse} from "../../models/response/add-terminal-response";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private e: Endpoints;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.e = new Endpoints();
  }

  public register(user: User){}

  public login(user: User): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.e.login, JSON.stringify(user))
  }

  public getTerminals(): Observable<Array<Terminal>>{
    return this.http.get<Array<Terminal>>(this.e.terminal)
  }

  public addTerminal(t: Terminal): Observable<AddTerminalResponse>{
    return this.http.post<AddTerminalResponse>(this.e.terminal, t)
  }

  public getTerminal(id: number){
    return this.http.get<Terminal>(this.e.terminal + "/" + id)
  }
}
