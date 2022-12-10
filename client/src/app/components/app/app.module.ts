import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayersComponent } from '../players/players.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from '../player/player.component';

@NgModule({
  declarations: [AppComponent, PlayersComponent, PlayerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{
    provide: "BASE_API_URL", useValue: "http://localhost:3030"
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
