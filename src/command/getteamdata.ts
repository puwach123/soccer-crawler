import TeamCrawler from '../crawler/team';
import JSONExporter from '../exporter/json';
import League from '../type/league';
import NormalizedTeam from '../type/normalize/team';

import leagues from '../data/leagues.json';

const genTeamURL = (lid: number): string =>
  `http://app.gooooal.com/odds.do?lid=${lid}&sid=2020&lang=tr`;

export default async function getTeamData() {
  try {
    const exporter = new JSONExporter<NormalizedTeam>('teams.json');
    const idata = leagues as League[];
    const odata: NormalizedTeam = {};
    for (const league of idata) {
      const url = genTeamURL(league.lid);
      const crawler = new TeamCrawler(url);
      await crawler.run();
      odata[league.lid] = crawler.data();
    }
    exporter.export(odata);
  } catch (error) {
    console.error(error);
  }
}
