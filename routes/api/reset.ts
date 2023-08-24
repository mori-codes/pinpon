import { HandlerContext } from "$fresh/server.ts";
import { resetTournament } from "../../server/resetTournament.ts";

const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    await resetTournament();
    return new Response("Successfully assigned groups");
  } catch (e) {
    return new Response(e.message)
  }
};

export { handler };
