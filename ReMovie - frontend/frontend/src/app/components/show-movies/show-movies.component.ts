import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css']
})
export class ShowMoviesComponent implements OnInit {
  detailState: boolean | undefined;

  constructor() {

  }

  ngOnInit(): void {
    this.detailState = true;
  }
}
