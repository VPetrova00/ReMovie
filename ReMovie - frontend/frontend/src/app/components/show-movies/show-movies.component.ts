import {Component, Input, OnInit} from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css']
})
export class ShowMoviesComponent implements OnInit {
  @Input() movies!: MovieInterface[];

  constructor() {

  }

  ngOnInit(): void {
  }
}
