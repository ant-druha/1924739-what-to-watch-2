import {FilmGeneratorInterface} from './film-generator.interface.js';
import {MockData} from '../../types/mock-data.type.js';
import {getRandomItem, getRandomItems} from '../../utils/random.js';

export default class FilmGenerator implements FilmGeneratorInterface {

  constructor(private readonly mockData: MockData) {}

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publishDate = getRandomItem(this.mockData.publishDates);
    const genre = getRandomItem(this.mockData.genres);
    const airDate = getRandomItem(this.mockData.airDates);
    const rating = getRandomItem(this.mockData.ratings);
    const previewVideo = getRandomItem(this.mockData.previewVideos);
    const video = getRandomItem(this.mockData.videos);
    const actors = getRandomItems(this.mockData.actors);
    const director = getRandomItem(this.mockData.directors);
    const duration = getRandomItem(this.mockData.durations);
    const commentsNumber = getRandomItem(this.mockData.commentsNumbers);
    const user = getRandomItem(this.mockData.users);
    const poster = getRandomItem(this.mockData.posters);
    const backgroundImage = getRandomItem(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem(this.mockData.backgroundColors);

    return [
      title, description, publishDate, genre, airDate, rating, previewVideo, video, actors,
      director, duration, commentsNumber, user, poster, backgroundImage, backgroundColor
    ].join('\t');
  }
}
