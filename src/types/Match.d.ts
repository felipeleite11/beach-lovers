interface Match {
  id: string;
  datetime: string;
  tournament_id: string;
  arena_id: string;
  winner_team_member_id: string | null;

  tournament: Tournament;
  arena: Arena;
  teams: MatchTeam[];
  winner_team_member: TeamMember | null;
}

interface MatchTeam {
  id: string;
  match_id: string;
  team_id: string;
  score: number | null;
}