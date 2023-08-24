import { getPayload } from "./getPayload.ts";
import { FinishedMatch } from "./types.ts";

type CreateMatch = Omit<FinishedMatch, "_id">;

const createGroupMatchResult = async (match: CreateMatch) => {
  const BASE_URL = Deno.env.get("MONGODB_BASE_URL");
  const API_KEY = Deno.env.get("MONGODB_API_KEY");

  if (!BASE_URL || !API_KEY) {
    throw new Error("Unable to retrieve needed ENV variables");
  }

  const response = await fetch(`${BASE_URL}/action/insertOne`, {
    method: "POST",
    body: getPayload("matches", { document: match }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": API_KEY,
    },
  });

  const data = await response.json();

  return data;
};

export { createGroupMatchResult };
