import {
  ExtendedFinalMatch,
  FinalMatchDisplay,
} from "../components/FinalMatchDisplay.tsx";
import { fetchAllFinalMatches } from "../server/fetchAllFinalMatches.ts";
import { fetchAllPlayers } from "../server/fetchAllPlayers.ts";

type Props = {
  matches: Array<ExtendedFinalMatch>;
  title: string;
};

const ChampionshipSlide = ({ matches, title }: Props) => {
  return (
    <div
      className="w-screen flex-grow flex-shrink-0 flex flex-col items-center"
      style={{
        scrollSnapAlign: "start",
      }}
    >
      <h2 className="text-xl">{title}</h2>
      <div className="flex flex-col flex-grow justify-around">
        {matches.map((match) => <FinalMatchDisplay match={match} />)}
      </div>
    </div>
  );
};

const Championship = async () => {
  const matches = await fetchAllFinalMatches();
  const players = await fetchAllPlayers();

  const extendedMatches = matches.map((match) => ({
    ...match,
    player1: players.find((player) => player._id === match.player1),
    player2: players.find((player) => player._id === match.player2),
  }));

  return (
    <div
      className="w-screen flex-grow flex overflow-auto mt-2"
      style={{
        scrollSnapType: "x mandatory",
      }}
    >
      <ChampionshipSlide
        matches={extendedMatches.slice(0, 4)}
        title="Cuartos de final"
      />
      <ChampionshipSlide
        matches={extendedMatches.slice(4, 6)}
        title="Semifinal"
      />
      <ChampionshipSlide matches={extendedMatches.slice(6)} title="Final" />
    </div>
  );
};

export default Championship;
