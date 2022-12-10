import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlayer } from '../interfaces/player.intreface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(
    @Inject('BASE_API_URL') private readonly baseUrl: string,
    private readonly httpService: HttpClient
  ) {}

  getPlayers(): Observable<IPlayer[]> {
    return this.httpService.get<IPlayer[]>(`${this.baseUrl}/api/players`);
  }

  getAvatarByPlayerId(avatarId: number) {
    return this.httpService.get(
      `${this.baseUrl}/api/players/${avatarId}/avatar`,
      {
        responseType: 'blob',
      }
    );
  }
}
