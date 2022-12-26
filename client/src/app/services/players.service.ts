import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlayer, IPlayers } from '../interfaces/app.intreface';

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

  getPlayers(): Observable<IPlayers> {
    return this.httpService.get<IPlayers>(`${this.baseUrl}/api/players`);
  }

  getPlayersByParams(limit: number, offset: number): Observable<IPlayers> {
    return this.httpService.get<IPlayers>(`${this.baseUrl}/api/players`, {
      params: {
        limit,
        offset,
      },
    });
  }

  setAvatarByPlayerId(playerId: number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpService.post(
      `${this.baseUrl}/api/players/${playerId}/avatar`,
      formData
    );
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
