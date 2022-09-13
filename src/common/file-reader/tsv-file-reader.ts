import {readFileSync} from 'fs';
import {FileReaderInterface} from './file-reader.interface.js';
import {Film} from '../../types/film.type.js';
import {Genre} from '../../types/genre.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, postedDate, genre, airDate, rating, previewVideo, video, actors, director, duration, commentsNumber, user, poster, backgroundImage, backgroundColor]) => ({
        name,
        description,
        publishDate : new Date(postedDate),
        genre: genre as Genre,
        airDate : new Date(airDate),
        rating : Number.parseInt(rating, 10),
        previewVideo,
        video,
        actors : actors.split(','),
        director,
        duration : Number.parseInt(duration, 10),
        commentsNumber : Number.parseInt(commentsNumber, 10),
        user,
        poster,
        backgroundImage,
        backgroundColor
      }));
  }
}
