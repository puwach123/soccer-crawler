import Team from '../team';

export default interface NormalizedTeam {
  [league: string]: Team[];
}
