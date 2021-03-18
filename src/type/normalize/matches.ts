import NormalizedMatch from './match';

export default interface NormalizedMatches {
  [lid: string]: NormalizedMatch[];
}
