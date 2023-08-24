import { FinishedMatch, Player } from "../server/types.ts";

type ExtendedMatch = Omit<FinishedMatch, "player1" | "player2"> & {
  player1: Player;
  player2: Player;
};

type Props = {
  match: ExtendedMatch;
};

const MatchSummary = ({ match }: Props) => {
  const date = new Date(match.finishedDate);

  const hour = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  return (
    <div className="flex flex-col rounded-md bg-gray-200">
      <div className="flex justify-between text-sm p-1">
        <div>{day}</div>
        <div>{hour}</div>
      </div>
      <div className="grid grid-cols-3 w-full pt-8 pb-16 px-2 text-center items-center">
        <div className="text-xl font-bold">{match.player1.name}</div>
        <div>
          <span className="text-lg">{match.score[0]}</span> -{" "}
          <span className="text-lg">{match.score[1]}</span>
        </div>
        <div className="text-xl font-bold">{match.player2.name}</div>
      </div>
    </div>
  );
};

export { MatchSummary };
