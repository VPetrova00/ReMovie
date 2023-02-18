import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";
import {MovieService} from "../../services/movie.service";
import {GenreInterface} from "../../interfaces/genre-interface";
import {GenreService} from "../../services/genre.service";
import {RatingInterface} from "../../interfaces/rating-interface";

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.css']
})
export class ShowMovieComponent implements OnInit {
  @Input() movieId!: number;
  movie: MovieInterface | null = null;
  genres: GenreInterface[] = [];
  @Input() isFromRatingTable: boolean = false;
  @Input() ratings: RatingInterface[] = [];

  constructor(private service: MovieService, private genreService: GenreService) { }

  ngOnInit(): void {
    this.getData();
  }

  getRating(movieId: number | undefined) {
    for (let i = 0; i < this.ratings.length; i++) {
      if (this.ratings[i].id == movieId) {
        return this.ratings[i].rating;
      }
    }

    return -1;
  }

  getData() {
    this.service.getMovieById(this.movieId).subscribe((data) => {
      this.movie = data;
      for (let genre of data.movie_genres) {
        this.genreService.getGenreById(genre).subscribe((data) => {
          this.genres.push(data);
        });
      }
    });
  }
}
