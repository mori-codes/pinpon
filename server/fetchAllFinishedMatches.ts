import { getPayload } from "./getPayload.ts";
import { FinishedMatch } from "./types.ts";

const fetchAllFinishedMatches = async () => {
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
        finished: true,
      },
      sort: {
        finishedDate: -1
      }
    }),
  });

  const data = await response.json();

  console.log(data)

  return data.documents as Array<FinishedMatch>;
};

export { fetchAllFinishedMatches };
