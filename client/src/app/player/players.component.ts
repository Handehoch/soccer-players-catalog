import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';

export class Player {
  constructor(
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

  players: Player[] | undefined;

  async getPlayers() {
    (await this.playerService.getPlayers()).subscribe(
      (data) => (this.players = data)
    );
  }

  async ngOnInit(): Promise<void> {
    await this.getPlayers();
  }
}
