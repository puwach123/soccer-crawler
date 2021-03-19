import TeamCrawler from '../crawler/team';
import JSONExporter from '../exporter/json';
import JSONImporter from '../importer/json';

import NormalizedTeam from '../type/normalize/team';
import League from '../type/league';

const genTeamURL = (lid: number): string =>
  `http://app.gooooal.com/odds.do?lid=${lid}&sid=2020&lang=tr`;

export default async function getTeamData() {
  try {
    const ipath = `C:\\Users\\admin\\Desktop\\scraper\\src\\data\\leagues.json`;
    const opath = `C:\\Users\\admin\\Desktop\\scraper\\src\\data\\teams.json`;
    const exporter = new JSONExporter<NormalizedTeam>(opath);
    const importer = new JSONImporter<League[]>(ipath);
    const idata = importer.import();
    const odata: NormalizedTeam = {};
    for (const league of idata) {
      const url = genTeamURL(league.lid);
      const crawler = new TeamCrawler(url);
      await crawler.run();
      odata[league.name] = crawler.data();
    }
    exporter.export(odata);
  } catch (error) {
    console.error(error);
  }
}
