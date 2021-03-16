import Exporter from '../exporter/exporter';
import { getDefaultRecord, isValidRecord } from '../misc/helper';
import Record from '../type/record';
import BaseCrawler from './base';

export interface Option {}

export default class RecordCrawler extends BaseCrawler {
  private coldef: { [key: string]: number } = {
    rank: 0,
    team: 1,
    win: 2,
    draw: 3,
    lose: 4,
    lastsix: 7,
    detail: 8,
  };
  private records: Record[];

  constructor(url: string, option?: Option) {
    super(url);
    this.records = [];
  }

  public fetch(root: cheerio.Root): void {
    root('tbody > tr').each((_, tr) => {
      let record: Record = getDefaultRecord();
      root(tr)
        .find('td')
        .each((idx, td) => {
          switch (idx) {
            case this.coldef.rank:
              record.rank = Number(root(td).text());
              break;
            case this.coldef.team:
              record.team = root(td)
                .find('a')
                .text()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
              break;
            case this.coldef.win:
              record.win = Number(root(td).text());
              break;
            case this.coldef.draw:
              record.draw = Number(root(td).text());
              break;
            case this.coldef.lose:
              record.lose = Number(root(td).text());
              break;
            case this.coldef.detail:
              record.detail =
                'http://app.gooooal.com/' +
                  root(td)
                    .find('a')
                    .attr('href') || '';
              break;
          }
        });
      if (isValidRecord(record)) this.records.push(record);
    });
  }

  public exporto(exporter: Exporter<Record[]>): void {
    exporter.export(this.records);
  }
}
