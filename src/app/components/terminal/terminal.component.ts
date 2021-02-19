import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http/http.service";
import {Terminal} from "../../models/terminal";
import {ActivatedRoute} from "@angular/router";
import {AppRoutingModule} from "../../app-routing.module";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {
  termminal = new Terminal();
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id == null){
        this.toast.error("Произошла ошибка");
      } else {
        this.httpService.getTerminal(+id).subscribe(terminal => {
          this.termminal = terminal;
        })
      }
    });

  }
}
