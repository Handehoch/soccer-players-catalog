import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './players.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private readonly httpService: HttpClient) {}

  async getPlayers(): Promise<Observable<Player[]>> {
    return this.httpService.get('http://localhost:3030/api/players').pipe(
      map((data) => {
        return (data as Player[]).map((value) => {
          return new Player(
            value.id,
            value.firstname,
            value.lastname,
            value.sex,
            value.birthday,
            value.teamName,
            value.country,
            value.avatarId
          );
        });
      })
    );
  }

  async getAvatarByPlayerId(player: Player) {
    return this.httpService.get(
      `http://localhost:3030/api/players/${player.id}/avatar`
    );
  }
}
