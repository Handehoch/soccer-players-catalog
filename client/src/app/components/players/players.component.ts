import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { Observable } from 'rxjs';
import { IPlayer } from '../../interfaces/player.intreface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  title: string = 'players';
  players$: Observable<IPlayer[]> | undefined;

  constructor(private readonly playerService: PlayersService) {}

  getPlayers() {
    this.players$ = this.playerService.getPlayers();
  }

  ngOnInit(): void {
    this.getPlayers();
  }
}
