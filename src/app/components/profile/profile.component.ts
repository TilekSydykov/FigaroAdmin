import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = new User();
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    let u = this.storageService.getUser();
    if(u !== null){
      this.user = u;
    }
  }

}
