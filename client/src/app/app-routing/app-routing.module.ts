import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayerCreationComponent } from '../components/player-creation/player-creation.component';
import { PlayersComponent } from '../components/players/players.component';

const routes: Routes = [
  { path: '', component: PlayerCreationComponent },
  { path: 'players', component: PlayersComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
