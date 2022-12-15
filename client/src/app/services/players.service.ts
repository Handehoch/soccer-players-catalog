import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlayer } from '../interfaces/app.intreface';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(
    @Inject('BASE_API_URL') private readonly baseUrl: string,
    private readonly httpService: HttpClient
  ) {}

  createPlayer(
    dto: Omit<IPlayer, 'avatarId' | 'avatar' | 'id'>
  ): Observable<IPlayer> {
    return this.httpService.post<IPlayer>(`${this.baseUrl}/api/players`, dto);
  }

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

  deletePlayer(id: number) {
    return this.httpService.delete<IPlayer>(
      `${this.baseUrl}/api/players/${id}`
    );
  }
}
