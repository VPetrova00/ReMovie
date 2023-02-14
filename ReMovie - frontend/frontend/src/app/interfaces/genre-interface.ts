export interface GenreInterface {
  genre_name: string;
}

export class Genre implements GenreInterface {
  genre_name: string = '';

  constructor(name: string) {
    this.genre_name = name;
  }
}
