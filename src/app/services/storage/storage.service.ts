import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  logged_in: EventEmitter<Boolean>= new EventEmitter<Boolean>();

  token: string | null = null;
  user: User | null = null;

  constructor() {

  }

  logOut(){
    this.deleteToken();
    this.setUser(new User());
    this.logged_in.emit(false);
  }

  getToken(): string{
    return <string>localStorage.getItem('token');
  }

  static  token(): string{
    return <string>localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token')
  }

  getUser(): User | null {
    if (this.user == null){
      this.user = JSON.parse(<string>localStorage.getItem('user'));
    }
    return this.user;
  }

  setUser(user: User){
    this.user = null;
    localStorage.setItem("user", JSON.stringify(user))
  }
}
