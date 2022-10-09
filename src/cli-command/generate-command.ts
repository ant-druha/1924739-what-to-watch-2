import {CliCommandInterface} from './cli-command.interface.js';
import got from 'got';
import {MockData} from '../types/mock-data.type.js';
import {appendFile} from 'fs/promises';
import FilmGenerator from '../common/film-generator/film-generator.js';

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

    for (let i = 0; i < filmsCount; i++) {
      await appendFile(filepath, `${filmGeneratorString.generate()}\n`, 'utf8');
    }

    console.log(`File ${filepath} was created!`);
  }

}
