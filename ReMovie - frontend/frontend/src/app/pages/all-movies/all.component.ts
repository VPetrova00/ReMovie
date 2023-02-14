import {Component, OnInit} from '@angular/core';
import {AllMoviesService} from "../../services/all-movies.service";
import {MovieInterface} from "../../interfaces/movie-interface";

@Component({
  selector: 'all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  public allMovies: MovieInterface[] = [];
  public isDataLoaded: boolean = false;

  constructor(private service: AllMoviesService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(){
    this.service.getAll().subscribe((data) => {
      this.allMovies = data;
      this.isDataLoaded = true;
    });
  }
}
