import { Match, Player } from "../server/types.ts"

type ExtendedFinalMatch = Omit<Match, "player1" | "player2"> & {
  player1?: Player
  player2?: Player
}

type Props = {
  match: ExtendedFinalMatch
}

const FinalMatchDisplay = ({ match }: Props) => {
  const score = match.score ?? [0, 0]
  return (
    <a className="w-64" href={`/update/${match.index}`}>
      <div
        className={`border-1 w-full flex justify-between py-1 px-2 ${
          score[0] > score[1] ? "font-bold" : ""
        }`}
      >
        <span>{match.player1?.name ?? "-"}</span>
        <span>{match.score?.[0] ?? "0"}</span>
      </div>
      <div
        className={`border-1 w-full flex justify-between py-1 px-2 bg-gray-100 ${
          score[0] < score[1] ? "font-bold" : ""
        }`}
      >
        <span>{match.player2?.name ?? "-"}</span>
        <span>{match.score?.[1] ?? "0"}</span>
      </div>
    </a>
  )
}

export { FinalMatchDisplay }
export type { ExtendedFinalMatch }
