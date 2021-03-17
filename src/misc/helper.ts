import Match from '../type/match';
import Team from '../type/team';

export const getDefaultMatch = (): Match => ({
  league: '',
  time: '',
  host: '',
  away: '',
  full: '',
  half: '',
  handicap: '',
  hilo: '',
  oddeven: '',
});

export const isValidMatch = (match: Match): boolean =>
  match.league != '' &&
  match.time != '' &&
  match.host != '' &&
  match.away != '' &&
  match.full != '' &&
  match.half != '' &&
  match.handicap != '' &&
  match.hilo != '' &&
  match.oddeven != '';

export const getDefaultTeam = (): Team => ({
  tid: -1,
  lid: -1,
  name: '',
});

export const isValidTeam = (team: Team): boolean =>
  team.tid != -1 && team.lid != -1 && team.name != '';
