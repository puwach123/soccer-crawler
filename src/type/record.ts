import Match from './match';

export default interface Record {
  rank: number;
  team: string;
  win: number;
  draw: number;
  lose: number;
  detail: string;
  lastsix?: string[];
  matches?: Match[];
}
