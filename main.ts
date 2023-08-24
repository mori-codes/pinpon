/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";

if (Deno.env.get("PRODUCTION") !== "true") {
  console.log("Using local environment settings: ", Deno.env.get("PRODUCTION"));
  import("./environment.ts");
}

await start(manifest, config);
