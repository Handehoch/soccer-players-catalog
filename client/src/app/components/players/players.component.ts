import {Component, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {Observable} from 'rxjs';
import {IPlayer} from '../../interfaces/player.intreface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  constructor(
    private readonly playerService: PlayersService,
  ) {}

  players$: Observable<IPlayer[]> | undefined;

  getPlayers() {
    this.players$ = this.playerService.getPlayers();
  }

  ngOnInit(): void {
    this.getPlayers();
  }
}
