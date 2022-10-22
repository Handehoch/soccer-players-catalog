import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';
import { Observable } from 'rxjs';

export class Player {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public sex: 'мужской' | 'женский' | 'male' | 'female',
    public birthday: Date,
    public teamName: string,
    public country: string
  ) {}
}

@Component({
  selector: 'app-player',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  constructor(private readonly playerService: PlayersService) {}

  players$: Observable<Player[]> | undefined;

  async getPlayers() {
    this.players$ = await this.playerService.getPlayers();
  }

  async ngOnInit(): Promise<void> {
    await this.getPlayers();
  }
}
