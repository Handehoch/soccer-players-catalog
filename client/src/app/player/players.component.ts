import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export class Player {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public sex: 'мужской' | 'женский' | 'male' | 'female',
    public birthday: Date,
    public teamName: string,
    public country: string,
    public avatarId: number,
    public avatar?: SafeUrl
  ) {}
}

@Component({
  selector: 'app-player',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  constructor(
    private readonly playerService: PlayersService,
    private readonly sanitizer: DomSanitizer
  ) {}

  players$: Observable<Player[]> | undefined;

  async getPlayers() {
    this.players$ = await this.playerService.getPlayers();
  }

  async getAvatar(player: Player) {
    this.playerService.getAvatarByPlayerId(player).then((r) =>
      r.subscribe((data) => {
        let objUrl = 'data:image/png;base64,' + data;
        player.avatar = this.sanitizer.bypassSecurityTrustUrl(objUrl);
      })
    );
  }

  async ngOnInit(): Promise<void> {
    await this.getPlayers();

    await this.players$?.subscribe((players) => {
      players.forEach(async (value) => {
        await this.getAvatar(value);
      });
    });
  }
}
