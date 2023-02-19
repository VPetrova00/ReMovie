import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserService} from "../../services/user.service";
import {ProfileInterface} from "../../interfaces/profile-interface";
import {ProfileRatingInterface} from "../../interfaces/profile-rating-interface";
import {MovieService} from "../../services/movie.service";
import {MovieInterface} from "../../interfaces/movie-interface";
import {RatingInterface} from "../../interfaces/rating-interface";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  history!: ProfileInterface[];
  favs!: ProfileInterface[];
  rated!: ProfileRatingInterface[];
  historyMovies: MovieInterface[] = [];
  favsMovies: MovieInterface[] = [];
  ratedMovies: MovieInterface[] = [];
  ratings: RatingInterface[] = [];

  constructor(private service: ProfileService, private userService: UserService, private movieService: MovieService) {
  }

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

  addToHistoryMovies(history: ProfileInterface[]) {
    for (let i = 0; i < history.length; i++) {
      let current = history[i];
      for (let movieId of current.movies) {
        let movie!: MovieInterface;
        this.movieService.getMovieById(movieId).subscribe((data) => {
          movie = data;
          this.historyMovies.push(movie);
        });
      }
    }
  }

  addToFavsMovies(favs: ProfileInterface[]) {
    for (let i = 0; i < favs.length; i++) {
      let current = favs[i];
      for (let movieId of current.movies) {
        let movie!: MovieInterface;
        this.movieService.getMovieById(movieId).subscribe((data) => {
          movie = data;
          this.favsMovies.push(movie);
        });
      }
    }
  }

  addToRatedMovies(rated: ProfileRatingInterface[]) {
    for (let i = 0; i < rated.length; i++) {
      let current = rated[i];
      for (let movieId of current.movies) {
        let movie!: MovieInterface;
        this.movieService.getMovieById(movieId).subscribe((data) => {
          movie = data;
          this.ratedMovies.push(movie);
          let ratingObject: RatingInterface = {
            id: movieId,
            rating: current.rating
          };
          this.ratings.push(ratingObject);
        });
      }
    }
  }
}
