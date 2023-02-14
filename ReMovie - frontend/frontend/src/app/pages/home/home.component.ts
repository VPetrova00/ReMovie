import { Component, OnInit } from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";
import {HomeService} from "../../services/home.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: MovieInterface[] = [];

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    const moviesObservable = this.service.getTop15();
    moviesObservable.subscribe((movies: MovieInterface[]) => {
      this.movies = movies;
    });
  }
}
