import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlayer } from '../../interfaces/player.intreface';
import { PlayersService } from '../../services/players.service';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player!: IPlayer;
  @Output() deletePlayerEvent = new EventEmitter<number>();

  constructor(
    private readonly playersService: PlayersService,
    private readonly sanitizer: DomSanitizer
  ) {}

  getAvatar() {
    this.playersService
      .getAvatarByPlayerId(this.player.id)
      .subscribe((avatar) => {
        const reader = new FileReader();
        reader.readAsDataURL(avatar);
        console.log(this.player.avatar);

        reader.onload = () => {
          this.player.avatar = this.sanitizer.bypassSecurityTrustUrl(
            reader.result as string
          );
          console.log(this.player.avatar);
        };
      });
  }

  deletePlayer() {
    this.playersService
      .deletePlayer(this.player.id)
      .pipe(catchError((err) => of(`Caught one error: ${err.message}`)))
      .subscribe((res) => {
        if (typeof res === 'string') {
          console.log(res);
        }
        this.deletePlayerEvent.emit(this.player.id);
      });
  }

  ngOnInit(): void {
    this.getAvatar();
  }
}
