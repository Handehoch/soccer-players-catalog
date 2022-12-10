import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-creation',
  templateUrl: './player-creation.component.html',
  styleUrls: ['./player-creation.component.scss'],
})
export class PlayerCreationComponent implements OnInit {
  title: string = 'add player';

  constructor() {}

  ngOnInit(): void {}
}
