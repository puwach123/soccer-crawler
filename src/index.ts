import { Command } from 'commander';
import getMatchData from './command/getmatchdata';
import getTeamData from './command/getteamdata';

const program = new Command();

program.version('1.0.0').description('Command Line Crawler');

program
  .command('team')
  .description('crawl information of teams')
  .action(() => getTeamData());

program
  .command('match')
  .description('crawl information of matches')
  .action(() => getMatchData());

program.parse(process.argv);
