// deno-lint-ignore no-explicit-any
const getPayload = (collection: "players" | "matches", query: any) => {
  return JSON.stringify(
    { database: "pinpon", dataSource: "Cluster", collection, ...query },
  );
};

export { getPayload };
