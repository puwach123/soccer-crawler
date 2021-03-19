import { Command } from 'commander';
import getMatchData from './func/getmatchdata';
import getTeamData from './func/getteamdata';

const program = new Command();

program.version('1.0.0').description('Command Line Crawler');

program
  .command('team')
  .description('crawl information of teams')
  .option(
    '-i, --ipath <input_file>',
    'specific the path of the input file',
    'C:\\Users\\admin\\Desktop\\scraper\\src\\data\\leagues.json'
  )
  .option(
    '-o, --opath <out_file>',
    'specific the path of the output file',
    'C:\\Users\\admin\\Desktop\\scraper\\src\\data\\teams.json'
  )
  .action((options) => getTeamData(options.ipath, options.opath));

program
  .command('match')
  .description('crawl information of matches')
  .option(
    '-i, --ipath <input_file>',
    'specific the path of the input file',
    'C:\\Users\\admin\\Desktop\\scraper\\src\\data\\teams.json'
  )
  .option(
    '-o, --opath <out_file>',
    'specific the path of the output file',
    'C:\\Users\\admin\\Desktop\\scraper\\src\\data\\matchs.json'
  )
  .action((options) => getMatchData(options.ipath, options.opath));

program.parse(process.argv);
