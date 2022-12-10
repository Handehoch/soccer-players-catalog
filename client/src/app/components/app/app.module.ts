import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayersComponent } from '../players/players.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from '../player/player.component';
import {HeaderComponent} from "../header/header.component";

@NgModule({
  declarations: [AppComponent, PlayersComponent, PlayerComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{
    provide: "BASE_API_URL", useValue: "http://localhost:3030"
  }],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule {}
