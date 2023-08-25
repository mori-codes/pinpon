import {
  ExtendedFinalMatch,
  FinalMatchDisplay,
} from "../components/FinalMatchDisplay.tsx"
import { fetchAllFinalMatches } from "../server/fetchAllFinalMatches.ts"
import { fetchAllPlayers } from "../server/fetchAllPlayers.ts"

type Props = {
  matches: Array<ExtendedFinalMatch>
  title: string
  final?: boolean
}

const ChampionshipSlide = ({ matches, title, final }: Props) => {
  return (
    <div
      className="w-screen flex-grow flex-shrink-0 flex flex-col items-center relative"
      style={{
        scrollSnapAlign: "start",
      }}
    >
      <h2 className="text-xl">{title}</h2>
      <div className="flex flex-col flex-grow justify-around">
        {final ? (
          <>
            <FinalMatchDisplay match={matches[0]} />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg">Tercer Puesto</h2>
              <div className="flex" style={{ transform: "scale(80%)" }}>
                <FinalMatchDisplay match={matches[1]} />
              </div>
            </div>
          </>
        ) : (
          matches.map((match) => <FinalMatchDisplay match={match} />)
        )}
      </div>
      <div
        className="absolute top-1/2 right-full pr-2"
        style={{ filter: "hue-rotate(320deg)" }}
      >
        ➡️
      </div>
    </div>
  )
}

const Championship = async () => {
  const matches = await fetchAllFinalMatches()
  const players = await fetchAllPlayers()

  const extendedMatches = matches.map((match) => ({
    ...match,
    player1: players.find((player) => player._id === match.player1),
    player2: players.find((player) => player._id === match.player2),
  }))

  return (
    <div
      className="w-screen flex-grow flex overflow-auto mt-2"
      style={{
        scrollSnapType: "x mandatory",
      }}
    >
      <ChampionshipSlide
        matches={extendedMatches.slice(0, 4)}
        title="Cuartos de final"
      />
      <ChampionshipSlide
        matches={extendedMatches.slice(4, 6)}
        title="Semifinal"
      />
      <ChampionshipSlide
        matches={extendedMatches.slice(6)}
        title="Final"
        final
      />
    </div>
  )
}

export default Championship
