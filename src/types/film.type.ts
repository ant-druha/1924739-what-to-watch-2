import {Genre} from './genre.enum';

export type Film = {
  title: string,
  description: string,
  publishDate: Date,
  genre: Genre,
  airDate: Date,
  rating: number,
  previewVideo: string,
  video: string,
  actors: string[],
  director: string,
  duration: number,
  commentsNumber: number,
  user: string,
  poster: string,
  backgroundImage: string,
  backgroundColor: string,
}
