import MatchCrawler from "../crawler/match";
import JSONExporter from "../exporter/json";
import NormalizedMatch from "../type/normalize/match";
import NormalizedMatches from "../type/normalize/matches";
import NormalizedTeam from "../type/normalize/team";

import teams from '../data/teams.json';

const genMatchURL = (lid: number, tid: number): string =>
  `http://app.gooooal.com/teamAllMatch.do?sid=2020&lid=${lid}&tid=${tid}&t=2&lang=tr`;


export default async function getMatchData() {
  try {
    const exporter = new JSONExporter<NormalizedMatches>('matchs.json');
    const idata = teams as NormalizedTeam;
    const odata: NormalizedMatches = {};
    for (const lid in idata) {
      odata[lid] = [];
      for (const team of idata[lid]) {
        const url = genMatchURL(team.lid, team.tid);
        const crawler = new MatchCrawler(url);
        await crawler.run();
        const nmatch: NormalizedMatch = {};
        nmatch[team.tid] = crawler.data();
        odata[lid].push(nmatch);
      }
    }
    exporter.export(odata);
  } catch (error) {
    console.error(error);
  }
}