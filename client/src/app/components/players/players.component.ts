import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { map, Observable } from 'rxjs';
import { IPlayers } from '../../interfaces/app.intreface';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  title: string = 'players';
  players$: Observable<IPlayers> | undefined;
  page: number = 0;
  itemsPerPage: number = 8;
  totalItems!: number;

  constructor(private readonly playerService: PlayersService) {}

  getPlayers() {
    this.playerService.getPlayers().subscribe((res) => {
      this.totalItems = res.length;
    });
  }

  onPlayerDelete(playerId: number): void {
    this.players$ = this.players$?.pipe(
      map((players) => {
        return {
          length: this.totalItems,
          players: players.players.filter((p) => p.id !== playerId),
        };
      })
    );
  }

  loadPlayers(limit: number, offset: number) {
    this.players$ = this.playerService.getPlayersByParams(limit, offset);
  }

  pageChanged(event: PageChangedEvent) {
    this.page = event.page - 1;
    this.getPlayers();
    this.loadPlayers(this.itemsPerPage, this.page * this.itemsPerPage);
  }

  ngOnInit(): void {
    this.getPlayers();
    this.loadPlayers(this.itemsPerPage, this.page * this.itemsPerPage);
  }
}
