import Match from '../match';

export default interface NormalizedMatches {
  [league: string]: { [team: string]: Match[] };
}
