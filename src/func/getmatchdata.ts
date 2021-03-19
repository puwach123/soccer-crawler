import MatchCrawler from '../crawler/match';
import JSONExporter from '../exporter/json';
import JSONImporter from '../importer/json';

import NormalizedMatches from '../type/normalize/matches';
import NormalizedTeam from '../type/normalize/team';

const genMatchURL = (lid: number, tid: number): string =>
  `http://app.gooooal.com/teamAllMatch.do?sid=2020&lid=${lid}&tid=${tid}&t=2&lang=tr`;

export default async function getMatchData() {
  try {
    const ipath = `C:\\Users\\admin\\Desktop\\scraper\\src\\data\\teams.json`;
    const opath = `C:\\Users\\admin\\Desktop\\scraper\\src\\data\\matchs.json`;
    const exporter = new JSONExporter<NormalizedMatches>(opath);
    const importer = new JSONImporter<NormalizedTeam>(ipath);
    const idata = importer.import();
    const odata: NormalizedMatches = {};
    for (const league in idata) {
      odata[league] = {};
      for (const team of idata[league]) {
        const url = genMatchURL(team.lid, team.tid);
        const crawler = new MatchCrawler(url);
        await crawler.run();
        odata[league][team.name] = crawler.data();
      }
    }
    exporter.export(odata);
  } catch (error) {
    console.error(error);
  }
}
