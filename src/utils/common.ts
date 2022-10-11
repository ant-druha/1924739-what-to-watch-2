import {Film} from '../types/film.type.js';
import {Genre} from '../types/genre.enum.js';
import dayjs from 'dayjs';

const getGenres = (genres: string): Genre[] => {
  const result: Genre[] = [];
  for (const genre of genres) {
    if (genre in Genre) {
      const genreItem = Genre[genre as keyof typeof Genre];
      result.push(genreItem);
    }
  }
  return result;
};

export const createFilm = (row: string): Film => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, publishDate, genre, airDate, rating, previewVideo, video, actors,
    director, duration, commentsNumber, user, poster, backgroundImage, backgroundColor] = tokens;
  return {
    title,
    description,
    publishDate: new Date(publishDate),
    genre: getGenres(genre),
    airDate: dayjs(airDate).toDate(),
    rating: Number.parseFloat(rating),
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
  } as Film;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
