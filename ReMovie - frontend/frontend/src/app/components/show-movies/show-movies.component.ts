import {Component, Input, OnInit} from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";
import {MovieService} from "../../services/movie.service";
import {RatingInterface} from "../../interfaces/rating-interface";
import {RelatedService} from "../../services/related.service";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-show-movies',
  templateUrl: './show-movies.component.html',
  styleUrls: ['./show-movies.component.css']
})
export class ShowMoviesComponent implements OnInit {
  @Input() movies!: MovieInterface[];
  movie: MovieInterface | null = null;
  @Input() isFromRatingTable: boolean = false;
  @Input() ratings: RatingInterface[] = [];
  isRelatedMoviesModalOpen: boolean = false;
  isRateMovieModalOpen: boolean = false;
  results: MovieInterface[] = [];
  sub!: Subscription;
  ratingOptions: string = '';

  constructor(private relatedService: RelatedService, private userService: UserService, private movieService: MovieService, private profileService: ProfileService) {

  }

  ngOnInit(): void {
  }

  trackItem(index: number, item: any) {
    return item.id;
  }

  showRelatedMovies(movie_id: number | undefined) {
    this.isRelatedMoviesModalOpen = true;

    this.sub = this.relatedService.getRelated(movie_id).subscribe((data) => {
      this.results = data;
    });
  }

  close() {
    this.isRelatedMoviesModalOpen = false;
    this.sub.unsubscribe();
    this.results = []
  }

  closeRateModal() {
    this.isRateMovieModalOpen = false;
  }

  showRateModal(movieId: number) {
    this.isRateMovieModalOpen = true;
  }

  rate(movieId: number | undefined, rating: string) {
    let username = sessionStorage.getItem('username')
    if (username != null){
      this.userService.getUserByUsername(username).subscribe((user) => {
        this.profileService.rateMovie(user.id, movieId, Number(rating)).subscribe();
      });
    }

    this.isRateMovieModalOpen = false;
  }

  addToFavs(movieId: number) {
    let username = sessionStorage.getItem('username')
    if (username != null){
      this.userService.getUserByUsername(username).subscribe((user) => {
        this.profileService.addToFavourites(user.id, movieId).subscribe();
      });
    }
  }
}
