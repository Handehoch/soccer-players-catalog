import {Component, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {IPlayer} from '../../interfaces/player.intreface';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  constructor(
    private readonly playerService: PlayersService,
    private readonly sanitizer: DomSanitizer
  ) {}

  players$: Observable<IPlayer[]> | undefined;

  getPlayers() {
    this.players$ = this.playerService.getPlayers();
  }

  getAvatar(player: IPlayer) {
    this.playerService.getAvatarByPlayerId(player).subscribe((avatar) => {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);

      reader.onload = () => {
        player.avatar = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        console.log(player.avatar);
      };
    });
  }

  ngOnInit(): void {
    this.getPlayers();

    this.players$?.subscribe(players => {
      players.forEach(player => this.getAvatar(player))
    });
  }
}
