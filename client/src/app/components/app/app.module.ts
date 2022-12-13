import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayersComponent } from '../players/players.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from '../player/player.component';
import { HeaderComponent } from '../header/header.component';
import { PlayerCreationComponent } from '../player-creation/player-creation.component';
import { CreatePlayerFormComponent } from '../create-player-form/create-player-form.component';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerComponent,
    HeaderComponent,
    PlayerCreationComponent,
    CreatePlayerFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: 'BASE_API_URL',
      useValue: 'http://localhost:3030',
    },
  ],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule {}
