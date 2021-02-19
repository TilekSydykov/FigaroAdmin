import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http/http.service";
import {StorageService} from "../../services/storage/storage.service";
import {User} from "../../models/user";
import {LoginResponse} from "../../models/response/login-response";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {}

  login() {
    this.httpService.login(this.user).subscribe((res: LoginResponse) => {
      if (res.Status) {
        this.storageService.setToken(res.Token);
        this.storageService.setUser(res.User);
        this.toastr.success(res.Message);
        this.storageService.logged_in.emit(true);

        window.location.reload();
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

}
