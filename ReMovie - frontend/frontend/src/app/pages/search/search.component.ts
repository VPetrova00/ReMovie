import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'related',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movieSearchParam: string = '';
  options: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  searchMovie() {

  }
}
