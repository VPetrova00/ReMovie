import {Component, Input, OnInit} from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";
import {MovieService} from "../../services/movie.service";
import {RatingInterface} from "../../interfaces/rating-interface";

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

  constructor() {

  }

  ngOnInit(): void {
  }

  trackItem(index: number, item: any) {
    return item.id;
  }
}
