import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { PlayersComponent } from './components/players/players.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { PlayerCreationComponent } from './components/player-creation/player-creation.component';
import { CreatePlayerFormComponent } from './components/create-player-form/create-player-form.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerComponent,
    HeaderComponent,
    PlayerCreationComponent,
    CreatePlayerFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    PaginationModule,
    FormsModule,
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
