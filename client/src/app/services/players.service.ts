import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlayer } from '../interfaces/player.intreface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private readonly httpService: HttpClient) {}

  getPlayers(): Observable<IPlayer[]> {
    return this.httpService.get<IPlayer[]>('http://localhost:3030/api/players');
  }

  getAvatarByPlayerId(player: IPlayer) {
    return this.httpService.get(
      `http://localhost:3030/api/players/${player.id}/avatar`,
      {
        responseType: 'blob',
      }
    );
  }
}
