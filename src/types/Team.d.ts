interface Team {
  id: string;
  name: string | null;

  members: TeamMember[];
  matches: MatchTeam[];
}

interface TeamMember {
  id: string;
  team_id: string;
  person_id: string;
}