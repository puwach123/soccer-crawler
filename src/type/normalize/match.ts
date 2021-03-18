import Match from '../match';

export default interface NormalizedMatch {
  [tid: string]: Match[];
}
