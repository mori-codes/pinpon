import { getPayload } from "./getPayload.ts";
import { Match } from "./types.ts";

const fetchMatch = async (index: number) => {
  const BASE_URL = Deno.env.get("MONGODB_BASE_URL");
  const API_KEY = Deno.env.get("MONGODB_API_KEY");

  if (!BASE_URL || !API_KEY) {
    throw new Error("Unable to retrieve needed ENV variables");
  }

  const response = await fetch(`${BASE_URL}/action/findOne`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": API_KEY,
    },
    body: getPayload("matches", {
      filter: {
        index,
      },
    }),
  });

  const data = await response.json();

  return data.document as Match;
};

export { fetchMatch };
