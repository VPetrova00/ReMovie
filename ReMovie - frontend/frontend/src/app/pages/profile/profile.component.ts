import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserService} from "../../services/user.service";
import {ProfileInterface} from "../../interfaces/profile-interface";
import {ProfileRatingInterface} from "../../interfaces/profile-rating-interface";
import {MovieService} from "../../services/movie.service";
import {MovieInterface} from "../../interfaces/movie-interface";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  history!: ProfileInterface;
  favs!: ProfileInterface;
  rated!: ProfileRatingInterface;
  historyMovies: MovieInterface[] = [];
  favsMovies: MovieInterface[] = [];
  ratedMovies: MovieInterface[] = [];

  constructor(private service: ProfileService, private userService: UserService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(sessionStorage['username']).subscribe((user) => {
      this.userId = user.id;
      this.getHistory(user.id);
      this.getFavs(user.id);
      this.getRated(user.id);
    });
  }

  getHistory(userId: number) {
    this.service.getSearchHistory(userId).subscribe((data) => {
      this.history = data;
      this.addToHistoryMovies(data);
    });
  }

  getFavs(userId: number) {
    this.service.getFavMovies(userId).subscribe((data) => {
      this.favs = data;
      this.addToFavsMovies(data);
    });
  }

  getRated(userId: number) {
    this.service.getRatedMovies(userId).subscribe((data) => {
      this.rated = data;
      this.addToRatedMovies(data);
    });
  }

  addToHistoryMovies(history: ProfileInterface) {
    for (let movieId of history.movies) {
      let movie!: MovieInterface;
      this.movieService.getMovieById(movieId).subscribe((data) => {
        movie = data;
        this.historyMovies.push(movie);
      });
    }
  }

  addToFavsMovies(favs: ProfileInterface) {
    for (let movieId of favs.movies) {
      let movie!: MovieInterface;
      this.movieService.getMovieById(movieId).subscribe((data) => {
        movie = data;
        this.favsMovies.push(movie);
      });
    }
  }

  addToRatedMovies(rated: ProfileRatingInterface) {
    console.log(rated)
    for (let movieId of rated.movies) {
      let movie!: MovieInterface;
      this.movieService.getMovieById(movieId).subscribe((data) => {
        movie = data;
        this.ratedMovies.push(movie);
      });
    }
  }
}
