import {CliCommandInterface} from './cli-command.interface.js';
import got from 'got';
import {MockData} from '../types/mock-data.type.js';
import FilmGenerator from '../common/film-generator/film-generator.js';
import TSVFileWriter from '../common/file-writer/file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  readonly name = '--generate';
  private initialData!: MockData;

  async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const filmsCount = Number.parseInt(count, 10);
    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }

    const filmGeneratorString = new FilmGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < filmsCount; i++) {
      await tsvFileWriter.write(filmGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }

}
