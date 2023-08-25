import { getPayload } from "./getPayload.ts";
import { Match } from "./types.ts";

type UpdateMatch = Partial<Match>

const updateFinalMatch = async (index: number, match: UpdateMatch) => {
  const BASE_URL = Deno.env.get("MONGODB_BASE_URL");
  const API_KEY = Deno.env.get("MONGODB_API_KEY");

  if (!BASE_URL || !API_KEY) {
    throw new Error("Unable to retrieve needed ENV variables");
  }
  
  await fetch(`${BASE_URL}/action/updateMany`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": API_KEY,
    },
    body: getPayload("matches", {
      filter: {
        "index": index,
      },
      update: {
        "$set": match,
      },
    }),
  });
};

export { updateFinalMatch };
