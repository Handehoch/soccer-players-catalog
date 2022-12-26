import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlayer } from '../../interfaces/app.intreface';
import { PlayersService } from '../../services/players.service';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  selectedFile!: File;
  form!: FormGroup;
  @Input() player!: IPlayer;
  @Output() deletePlayerEvent = new EventEmitter<number>();

  constructor(
    private readonly playersService: PlayersService,
    private readonly sanitizer: DomSanitizer,
    private readonly toastr: ToastrService
  ) {}

  setAvatar() {
    this.playersService
      .setAvatarByPlayerId(this.player.id, this.selectedFile)
      .pipe(
        catchError((err) => {
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
            closeButton: true,
          });

          console.log(err.error.message);

          return of(`Caught one error: ${err.error.message}`);
        })
      )
      .subscribe((res) => {
        if (typeof res === 'string') {
          console.log(res);
        } else {
          this.toastr.success('Avatar uploaded', 'Success!', {
            progressBar: true,
            closeButton: true,
          });
          this.getAvatar();
        }
      });
  }

  getAvatar() {
    this.playersService
      .getAvatarByPlayerId(this.player.id)
      .subscribe((avatar) => {
        const reader = new FileReader();
        reader.readAsDataURL(avatar);

        reader.onload = () => {
          this.player.avatar = this.sanitizer.bypassSecurityTrustUrl(
            reader.result as string
          );
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(),
    });

    this.getAvatar();
  }
}
