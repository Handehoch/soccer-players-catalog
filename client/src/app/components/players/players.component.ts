import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { map, Observable } from 'rxjs';
import { IPlayer } from '../../interfaces/app.intreface';

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

  onPlayerDelete(playerId: number): void {
    this.players$ = this.players$?.pipe(
      map((players) => {
        return players.filter((p) => p.id !== playerId);
      })
    );
  }

  ngOnInit(): void {
    this.getPlayers();
  }
}
