import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {UsersComponent} from "./components/users/users.component";
import {TerminalsComponent} from "./components/terminals/terminals.component";
import {TerminalComponent} from "./components/terminal/terminal.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'main', component: MainComponent},
  {path: 'users', component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'terminals', component: TerminalsComponent},
  {path: 'terminal/:id', component: TerminalComponent},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
