import {Component, Input, OnInit} from '@angular/core';
import {MovieInterface} from "../../interfaces/movie-interface";
import {MovieService} from "../../services/movie.service";
import {RatingInterface} from "../../interfaces/rating-interface";
import {RelatedService} from "../../services/related.service";
import {Subscription} from "rxjs";

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
  isModalOpen: boolean = false;
  results: MovieInterface[] = [];
  sub!: Subscription;

  constructor(private relatedService: RelatedService) {

  }

  ngOnInit(): void {
  }

  trackItem(index: number, item: any) {
    return item.id;
  }

  showRelatedMovies(movie_id: number | undefined) {
    this.isModalOpen = true;

    this.sub = this.relatedService.getRelated(movie_id).subscribe((data) => {
      this.results = data;
    });
  }

  close() {
    this.isModalOpen = false;
    this.sub.unsubscribe();
    this.results = []
  }
}
