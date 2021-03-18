import Exporter from '../exporter/exporter';
import { getDefaultTeam, isValidTeam } from '../misc/helper';
import Team from '../type/team';
import BaseCrawler from './base';

interface ColDef {
  [key: string]: number;
}

export default class TeamCrawler extends BaseCrawler {
  private coldef: ColDef = {
    rank: 0,
    team: 1,
    win: 2,
    draw: 3,
    lose: 4,
    lastsix: 7,
    detail: 8,
  };
  private teams: Team[];

  constructor(url: string) {
    super(url);
    this.teams = [];
  }

  public fetch(root: cheerio.Root): void {
    root('#data_odds_fbStatTeam_0_0').each((_, tr) => {
      let team: Team = getDefaultTeam();
      root(tr)
        .find('td')
        .each((idx, td) => {
          switch (idx) {
            case this.coldef.team:
              team.name = root(td)
                .find('a')
                .text()
                .replace(/(\r\n|\n|\r|\t)/gm, '');
              break;
            case this.coldef.detail:
              const link =
                root(td)
                  .find('a')
                  .attr('href') || '';
              const tid = link.match(/.*tid=(\d+).*/) || '';
              const lid = link.match(/.*lid=(\d+).*/) || '';
              team.tid = Number(tid[1]);
              team.lid = Number(lid[1]);
              break;
            default:
              break;
          }
        });
      if (isValidTeam(team)) this.teams.push(team);
    });
  }

  public data(): Team[] {
    return [...this.teams];
  }
}
