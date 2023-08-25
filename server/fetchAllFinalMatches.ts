import { getPayload } from "./getPayload.ts";
import { Match } from "./types.ts";

const fetchAllFinalMatches = async () => {
  const BASE_URL = Deno.env.get("MONGODB_BASE_URL");
  const API_KEY = Deno.env.get("MONGODB_API_KEY");

  if (!BASE_URL || !API_KEY) {
    throw new Error("Unable to retrieve needed ENV variables");
  }

  const response = await fetch(`${BASE_URL}/action/find`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": API_KEY,
    },
    body: getPayload("matches", {
      filter: {
        type: "final",
      },
      sort: {
        index: 1,
      },
    }),
  });

  const data = await response.json();

  return data.documents as Array<Match>;
};

export { fetchAllFinalMatches };
