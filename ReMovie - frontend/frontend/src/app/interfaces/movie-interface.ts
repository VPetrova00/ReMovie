export interface MovieInterface {
  movie_id: number;
  movie_title: string;
  movie_summary: string;
  movie_genres: number[];
  movie_rating: number;
  movie_release_date: Date;
}

export class Movie implements MovieInterface {
  movie_id: number = -1;
  movie_summary: string = '';
  movie_title: string = '';
  movie_genres: number[] = [];
  movie_rating: number = 0;
  movie_release_date: Date = new Date();


  constructor(id:number, summary: string, title: string, genres: number[], rating: number, releaseDate: Date) {
    this.movie_id = id;
    this.movie_summary = summary;
    this.movie_title = title;
    this.movie_genres = genres;
    this.movie_rating = rating;
    this.movie_release_date = releaseDate;
  }
}
