import { GroupTable } from "../components/GroupTable.tsx";
import { fetchAllPlayers } from "../server/fetchAllPlayers.ts";
import { fetchGroupMatches } from "../server/fetchGroupMatches.ts";

type Data = Parameters<typeof GroupTable>[0]["data"];

export default async function Home() {
  const players = await fetchAllPlayers();
  const groupMatches = await fetchGroupMatches();

  const groups = players.reduce<Record<number, Data>>((acc, player) => {
    const playedMatches = groupMatches.filter((match) =>
      match.player1 === player._id || match.player2 === player._id
    );
    const wonMatches = playedMatches.reduce((acc, match) => {
      if (match.player1 === player._id && match.score[0] > match.score[1]) {
        return acc + 1;
      }
      if (match.player2 === player._id && match.score[0] < match.score[1]) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return {
      ...acc,
      [player.group]: {
        ...acc[player.group],
        [player.name]: {
          played: playedMatches.length,
          won: wonMatches,
          lost: playedMatches.length - wonMatches,
        },
      },
    };
  }, {
    0: {},
    1: {},
    2: {},
    3: {},
  });

  return (
    <div className="w-full flex flex-col">
      <div className="m-4 flex-grow">
      {Object.values(groups).map((group, index) => (
        <div key={index} className="mb-4 w-full bg-gray-100">
          <GroupTable data={group} />
        </div>
      ))}
      </div>
      <a href="/result" className="w-full text-center p-2 bg-green-300">Añadir resultado</a>
    </div>
  );
}
