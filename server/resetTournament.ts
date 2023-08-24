import { fetchAllPlayers } from "./fetchAllPlayers.ts";
import { getPayload } from "./getPayload.ts";

const resetTournament = async () => {
  const BASE_URL = Deno.env.get("MONGODB_BASE_URL");
  const API_KEY = Deno.env.get("MONGODB_API_KEY");

  if (!BASE_URL || !API_KEY) {
    throw new Error("Unable to retrieve needed ENV variables");
  }

  let players = await fetchAllPlayers();
  const playersLength = players.length;
  const newSort = [];

  for (let i = 0; i < playersLength; i++) {
    const randomIndex = Math.floor(Math.random() * players.length);

    newSort.push(players[randomIndex]);
    players = [
      ...players.slice(0, randomIndex),
      ...players.slice(randomIndex + 1),
    ];
  }

  await Promise.all(
    [
      fetch(`${BASE_URL}/action/updateMany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": API_KEY,
        },
        body: getPayload("players", {
          filter: {
            "_id": {
              "$in": newSort.slice(0, 3).map((p) => ({ "$oid": p._id })),
            },
          },
          update: {
            "$set": {
              group: 0,
            },
          },
        }),
      }),
      fetch(`${BASE_URL}/action/updateMany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": API_KEY,
        },
        body: getPayload("players", {
          filter: {
            "_id": {
              "$in": newSort.slice(3, 6).map((p) => ({ "$oid": p._id })),
            },
          },
          update: {
            "$set": {
              group: 1,
            },
          },
        }),
      }),
      fetch(`${BASE_URL}/action/updateMany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": API_KEY,
        },
        body: getPayload("players", {
          filter: {
            "_id": {
              "$in": newSort.slice(6, 9).map((p) => ({ "$oid": p._id })),
            },
          },
          update: {
            "$set": {
              group: 2,
            },
          },
        }),
      }),
      fetch(`${BASE_URL}/action/updateMany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": API_KEY,
        },
        body: getPayload("players", {
          filter: {
            "_id": { "$in": newSort.slice(9).map((p) => ({ "$oid": p._id })) },
          },
          update: {
            "$set": {
              group: 3,
            },
          },
        }),
      }),
    ],
  );
};

export { resetTournament };
