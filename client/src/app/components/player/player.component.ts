import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IPlayer} from "../../interfaces/player.intreface";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }

  @Input() player$: Observable<IPlayer> | undefined;

  ngOnInit(): void {
  }

}
