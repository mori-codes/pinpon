type Player = {
  _id: string;
  name: string;
  group: 0 | 1 | 2 | 3;
};

type UnfinishedMatch = {
  _id: string;
  finished: false;
  player1?: Player["_id"];
  player2?: Player["_id"];
  score?: [number, number];
  type: "group" | "final";
  index: undefined | 0 | 1 | 2 | 3 | 4 | 5 | 6;
  finishedDate?: string
};

type FinishedMatch = {
  _id: string;
  finished: true;
  player1: Player["_id"];
  player2: Player["_id"];
  score: [number, number];
  type: "group" | "final";
  index: undefined | 0 | 1 | 2 | 3 | 4 | 5 | 6;
  finishedDate: string
};

type Match = FinishedMatch | UnfinishedMatch;

export type { FinishedMatch, Match, Player, UnfinishedMatch };
