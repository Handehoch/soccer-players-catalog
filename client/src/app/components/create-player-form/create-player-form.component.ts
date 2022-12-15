import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PlayersService } from '../../services/players.service';
import { IPlayer } from '../../interfaces/app.intreface';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService
  ) {}

  get firstname() {
    return this.form?.get('firstname');
  }

  get lastname() {
    return this.form?.get('lastname');
  }

  get sex() {
    return this.form?.get('sex');
  }

  get birthday() {
    return this.form?.get('birthday');
  }

  get teamName() {
    return this.form?.get('teamName');
  }

  get country() {
    return this.form?.get('country');
  }

  // TODO form error handling and showing on screen
  onSubmit(): void {
    const dto: Omit<IPlayer, 'avatarId' | 'avatar' | 'id'> = {
      ...this.form?.value,
    };

    this.playersService
      .createPlayer(dto)
      .pipe(
        catchError((err) => {
          this.toastr.error(err.error.message, 'Error', {
            progressBar: true,
          });

          console.log(err);

          return of(`Caught one error: ${err.error.message}`);
        })
      )
      .subscribe((res) => {
        if (typeof res == 'string') {
          console.log(res);
        } else {
          this.toastr.success('Player created!', 'Success', {
            progressBar: true,
          });
        }
      });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      teamName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });
  }
}
