import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { IPlayer } from '../../interfaces/player.intreface';

@Component({
  selector: 'app-create-player-form',
  templateUrl: './create-player-form.component.html',
  styleUrls: ['./create-player-form.component.scss'],
})
export class CreatePlayerFormComponent implements OnInit {
  form: FormGroup | undefined;

  constructor(
    @Inject('BASE_API_URL') public readonly baseUrl: string,
    private readonly playersService: PlayersService,
    private readonly fb: FormBuilder
  ) {}

  onSubmit(): void {
    const dto: Omit<IPlayer, 'avatarId' | 'avatar' | 'id'> = {
      ...this.form?.value,
    };

    this.playersService.createPlayer(dto).subscribe((r) => console.log(r));
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        sex: new FormControl(''),
        birthday: new FormControl(''),
        teamName: new FormControl(''),
        country: new FormControl(''),
      },
      {
        validators: [Validators.required],
      }
    );
  }
}
