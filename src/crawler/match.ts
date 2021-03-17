import Exporter from '../exporter/exporter';
import { getDefaultMatch, isValidMatch } from '../misc/helper';
import Match from '../type/match';
import BaseCrawler from './base';

export default class MatchCrawler extends BaseCrawler {
  private coldef: { [key: string]: number } = {
    league: 0,
    time: 1,
    host: 2,
    full: 3,
    away: 4,
    half: 5,
    handicap: 6,
    hilo: 7,
    oddeven: 8,
  };
  private matchs: Match[];

  constructor(url: string) {
    super(url);
    this.matchs = [];
  }

  public fetch(root: cheerio.Root): void {
    root('table#fb_match_odds_result_table_0_0 > tbody > tr').each((_, tr) => {
      let match: Match = getDefaultMatch();
      root(tr)
        .find('td')
        .each((idx, td) => {
          switch (idx) {
            case this.coldef.league:
              match.league = root(td).text();
              break;
            case this.coldef.time:
              match.time = root(td).text();
              break;
            case this.coldef.host:
              match.host =
                root(td)
                  .find('a > span')
                  .text() ||
                root(td)
                  .find('a')
                  .text();
              break;
            case this.coldef.full:
              match.full = root(td)
                .find('a')
                .text();
              break;
            case this.coldef.away:
              match.away =
                root(td)
                  .find('a > span')
                  .text() ||
                root(td)
                  .find('a')
                  .text();
              break;
            case this.coldef.half:
              match.half = root(td).text();
              break;
            case this.coldef.handicap:
              const hres = root(td)
                .find('span')
                .text();
              const hsub = root(td)
                .find('a')
                .text();
              match.handicap = `${hres}[${hsub}]`;
              break;
            case this.coldef.hilo:
              const ores = root(td)
                .find('span')
                .text();
              const osub = root(td)
                .find('a')
                .text();
              match.hilo = `${ores}[${osub}]`;
              break;
            case this.coldef.oddeven:
              match.oddeven = root(td)
                .find('span')
                .text();
              break;
            default:
              break;
          }
        });
      if (isValidMatch(match)) this.matchs.push(match);
    });
  }

  public data(): Match[] {
    return [...this.matchs];
  }

  public exporto(exporter: Exporter<Match[]>): void {
    exporter.export(this.matchs);
  }
}
