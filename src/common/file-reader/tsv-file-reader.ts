import {readFileSync} from 'fs';
import {FileReaderInterface} from './file-reader.interface.js';
import {Film} from '../../types/film.type.js';
import {Genre} from '../../types/genre.enum.js';
import chalk from 'chalk';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public logColored(): void {
    for (const film of this.toArray()) {
      console.log(
        '\n',
        'Title: ', chalk.red(film.title), '\n',
        'Description: ', film.description, '\n',
        'publishDate: ', film.publishDate, '\n',
        'genre: ', film.genre, '\n',
        'airDate: ', film.airDate, '\n',
        'rating: ', film.rating, '\n',
        'previewVideo: ', film.previewVideo, '\n',
        'video: ', film.video, '\n',
        'actors: ', film.actors, '\n',
        'director: ', film.director, '\n',
        'duration: ', film.duration, '\n',
        'commentsNumber: ', film.commentsNumber, '\n',
        'user: ', film.user, '\n',
        'poster: ', film.poster, '\n',
        'backgroundImage: ', film.backgroundImage, '\n',
        'backgroundColor: ', chalk.yellow(film.backgroundColor),
      );
    }
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
        title: name,
        description,
        publishDate: new Date(postedDate),
        genre: genre as Genre,
        airDate: new Date(airDate),
        rating: Number.parseInt(rating, 10),
        previewVideo,
        video,
        actors: actors.split(','),
        director,
        duration: Number.parseInt(duration, 10),
        commentsNumber: Number.parseInt(commentsNumber, 10),
        user,
        poster,
        backgroundImage,
        backgroundColor
      }));
  }
}
