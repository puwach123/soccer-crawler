import Exporter from '../exporter/exporter';
import Match from '../type/match';
import BaseCrawler from './base';

export interface Option {}

export default class MatchCrawler extends BaseCrawler {
  private coldef: { [key: string]: number } = {
    rank: 0,
    team: 1,
    win: 2,
    draw: 3,
    lose: 4,
    lastsix: 7,
    detail: 8,
  };
  private matchs: Match[];

  constructor(url: string, option?: Option) {
    super(url);
    this.matchs = [];
  }

  public fetch(root: cheerio.Root): void {}

  public exporto(exporter: Exporter<Match[]>): void {
    exporter.export(this.matchs);
  }
}
