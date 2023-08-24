import { MatchSummary } from "../components/MatchSummary.tsx";
import { fetchAllFinishedMatches } from "../server/fetchAllFinishedMatches.ts";
import { fetchAllPlayers } from "../server/fetchAllPlayers.ts";

const History = async () => {
  const matches = await fetchAllFinishedMatches();
  const players = await fetchAllPlayers()

  const extendedMatches = matches.map(match => ({
    ...match,
    player1: players.find(player => player._id === match.player1)!,
    player2: players.find(player => player._id === match.player2)!
  }))

  return (
    <div className="mx-3 my-2 flex flex-col gap-4">
      {extendedMatches.map((match) => (
        <MatchSummary match={match}/>
      ))}
    </div>
  );
};

export default History;
