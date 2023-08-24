import { fetchAllPlayers } from "../server/fetchAllPlayers.ts";
import { Handlers } from "$fresh/server.ts";
import { createGroupMatchResult } from "../server/createGroupMatchResult.ts";

export const handler: Handlers<unknown> = {
  POST: async (req, ctx) => {
    const formData = await req.formData();
    const player1 = formData.get("player1") as string;
    const player2 = formData.get("player2") as string;
    const points1 = Number(formData.get("points1") ?? 0);
    const points2 = Number(formData.get("points2") ?? 0);

    if (!player1 || !player2) {
      return new Response(null, {
        status: 302,
        headers: {
          location: "/result",
        },
      });
    }

    const data = await createGroupMatchResult({
      finished: true,
      finishedDate: new Date().toISOString(),
      index: undefined,
      player1,
      player2,
      score: [points1,points2],
      type: "group",
    });

    return new Response(null, {
      status: 302,
      headers: {
        location: "/",
      },
    });
  },
};

const ResultPage = async () => {
  const players = await fetchAllPlayers();

  return (
    <div className="w-full flex flex-col">
      <h1 className=" mt-4 ml-4 text-2xl">Añadir resultado de partido</h1>
      <form className="m-4 flex-grow" method="POST">
        <div>
          <div>
            <label>Jugador 1:</label>
            <select className="ml-1" name="player1">
              {players.map((player) => (
                <option value={player._id}>{player.name}</option>
              ))}
            </select>
          </div>
          <label>Puntuación:</label>
          <input type="number" className="border-1 w-10 ml-1" name="points1" />
        </div>
        <div className="mt-2 mb-8">
          <div>
            <label>Jugador 2:</label>
            <select className="ml-1" name="player2">
              {players.map((player) => (
                <option value={player._id}>{player.name}</option>
              ))}
            </select>
          </div>
          <label>Puntuación:</label>
          <input type="number" className="border-1 w-10 ml-1" name="points2" />
        </div>
        <button type="submit" className="w-full text-center p-2 bg-green-300">
          Añadir resultado
        </button>
      </form>
    </div>
  );
};

export default ResultPage;
