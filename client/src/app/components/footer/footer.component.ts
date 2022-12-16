import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  title = 'Created by Handehoch';

  constructor() {}

  // TODO keep footer on bottom of page
  ngOnInit(): void {}
}
