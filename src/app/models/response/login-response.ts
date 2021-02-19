import {User} from "../user";

export class LoginResponse {
  Message: string = '';
  Token: string = '';
  Status: boolean = false;
  User: User = new User();
}
