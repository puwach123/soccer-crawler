import Match from '../type/match';
import Record from '../type/record';

export const getDefaultRecord = (): Record => ({
  rank: -1,
  team: '',
  win: -1,
  draw: -1,
  lose: -1,
  detail: '',
});

export const isValidRecord = (record: Record): boolean =>
  record.lose >= 0 &&
  record.win >= 0 &&
  record.draw >= 0 &&
  record.rank >= 0 &&
  record.team != '' &&
  record.detail != '';

export const getDefaultMatch = (): Match => ({
  time: '',
  host: '',
  away: '',
  full: '',
  half: '',
  handicap: '',
});

export const isValidMatch = (match: Match): boolean =>
  match.time != '' &&
  match.host != '' &&
  match.away != '' &&
  match.full != '' &&
  match.half != '' &&
  match.handicap != '';
