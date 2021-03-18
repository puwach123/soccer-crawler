import Team from '../team';

export default interface NormalizedTeam {
  [lid: string]: Team[];
}
