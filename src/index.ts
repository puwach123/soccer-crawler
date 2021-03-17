import TeamCrawler from './crawler/team';
import MatchCrawler from './crawler/match';
import JSONExporter from './exporter/json';

import NormalizedMatch from './type/normalize/match';
import NormalizedMatches from './type/normalize/matches';
import NormalizedTeam from './type/normalize/team';

import leagues from './data/leagues.json';
import teams from './data/teams.json';

const genTeamURL = (lid: number): string =>
  `http://app.gooooal.com/odds.do?lid=${lid}&sid=2020&lang=tr`;
const genMatchURL = (lid: number, tid: number): string =>
  `http://app.gooooal.com/teamAllMatch.do?sid=2020&lid=${lid}&tid=${tid}&t=2&lang=tr`;

async function getTeamData() {
  try {
    const exporter = new JSONExporter('teams.json');
    const odata: NormalizedTeam = {};
    for (const league of leagues) {
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

async function getMatchData() {
  try {
    const exporter = new JSONExporter('matchs.json');
    const odata: NormalizedMatches = {};
    const idata = teams as NormalizedTeam;
    for (const lid in idata) {
      odata[lid] = [];
      for (const team of idata[lid]) {
        const url = genMatchURL(team.lid, team.tid);
        const crawler = new MatchCrawler(url);
        await crawler.run();
        const tmp: NormalizedMatch = {};
        tmp[team.tid] = crawler.data();
        odata[lid].push(tmp);
      }
    }
    exporter.export(odata);
  } catch (error) {
    console.error(error);
  }
}

getMatchData();
