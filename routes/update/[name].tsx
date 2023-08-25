import { fetchAllPlayers } from "../../server/fetchAllPlayers.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { createGroupMatchResult } from "../../server/createGroupMatchResult.ts";
import { fetchMatch } from "../../server/fetchMatch.ts";
import { updateFinalMatch } from "../../server/updateFinalMatch.ts";

export const handler: Handlers<unknown> = {
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const player1 = formData.get("player1") as string;
    const player2 = formData.get("player2") as string;
    const points1 = Number(formData.get("points1"));
    const points2 = Number(formData.get("points2"));
    const index = Number(formData.get("index") ?? 0);

    const finished = !(points1 === 0 && points2 === 0)

    const data = await updateFinalMatch(index, {
      finished,
      finishedDate: finished ? new Date().toISOString(): undefined,
      player1,
      player2,
      score: finished ? [points1, points2] : undefined,
    });

    return new Response(null, {
      status: 302,
      headers: {
        location: "/championship",
      },
    });
  },
};

const ResultPage = async (props: PageProps) => {
  const index = props.url.toString().split("/")[4];
  const players = await fetchAllPlayers();
  const match = await fetchMatch(Number(index));

  return (
    <div className="w-full flex flex-col">
      <h1 className=" mt-4 ml-4 text-2xl">Actualizar partido final</h1>
      <form className="m-4 flex-grow" method="POST">
        <div>
          <div>
            <label>Jugador 1:</label>
            <select className="ml-1" name="player1" value={match.player1}>
              {players.map((player) => (
                <option value={player._id}>{player.name}</option>
              ))}
            </select>
          </div>
          <label>Puntuación:</label>
          <input type="number" className="border-1 w-10 ml-1" name="points1" />
          <input type="hidden" name="index" value={index} />
        </div>
        <div className="mt-2 mb-8">
          <div>
            <label>Jugador 2:</label>
            <select className="ml-1" name="player2" value={match.player2}>
              {players.map((player) => (
                <option value={player._id}>{player.name}</option>
              ))}
            </select>
          </div>
          <label>Puntuación:</label>
          <input type="number" className="border-1 w-10 ml-1" name="points2" />
        </div>
        <button type="submit" className="w-full text-center p-2 bg-green-300">
          Actualizar partido
        </button>
      </form>
    </div>
  );
};

export default ResultPage;
