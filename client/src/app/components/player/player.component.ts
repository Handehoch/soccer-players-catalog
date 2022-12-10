import {Component, Input, OnInit} from '@angular/core';
import {IPlayer} from "../../interfaces/player.intreface";
import {PlayersService} from "../../services/players.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(
    private readonly playersService: PlayersService,
    private readonly sanitizer: DomSanitizer
  ) { }

  @Input() player!: IPlayer;

  getAvatar() {
    this.playersService.getAvatarByPlayerId(this.player.id).subscribe(avatar => {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      console.log(this.player.avatar);

      reader.onload = () => {
        this.player.avatar = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        console.log(this.player.avatar);
      }
    })
  }

  ngOnInit(): void {
    this.getAvatar();
  }
}
