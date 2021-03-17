import TeamCrawler from '../src/crawler/team';
import MatchCrawler from '../src/crawler/match';

describe('test team crawler', () => {
  test('it should be ok', async () => {
    const url =
      'http://app.gooooal.com/odds.do?lid=1&sid=2020&lang=tr';
    const crawler = new TeamCrawler(url);
    await crawler.run();
    const teams = crawler.data();
    expect(teams.length).toEqual(20);
  });
});

describe('test match crawler', () => {
  test('it should be ok', async () => {
    const url =
      'http://app.gooooal.com/teamAllMatch.do?sid=2020&lid=1&tid=104&t=2&lang=tr';
    const crawler = new MatchCrawler(url);
    await crawler.run();
    const matches = crawler.data();
    expect(matches[matches.length-1]).toEqual({
      "league": "意甲",
      "time": "2020-09-22",
      "host": "AC米蘭",
      "away": "博洛尼亞",
      "full": "2-0",
      "half": "1-0",
      "handicap": "贏[-1/1.5]",
      "hilo": "小[3]",
      "oddeven": "雙"
    });
  });
});