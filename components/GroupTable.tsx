type PlayerPoints = {
  played: number;
  won: number;
  lost: number;
};

type Props = {
  data: Record<string, PlayerPoints>;
};

const GroupTable = ({ data }: Props) => {
  const orderedData = Object.entries(data).sort(([_, apoints], [__, bpoints]) =>
    apoints.won - bpoints.won
  );

  return (
    <table className="table-auto w-full">
      <tr className="bg-black text-white">
        <th className="text-left p-1">
          Jugador
        </th>
        <th className="p-1">
          J
        </th>
        <th className="p-1">
          G
        </th>
        <th className="p-1">
          D
        </th>
      </tr>
      {orderedData.map(([player, points]) => (
        <tr key={player}>
          <td className="max-w-0 p-1">{player}</td>
          <td className="text-center p-1">{points.played}</td>
          <td className="text-center p-1">{points.won}</td>
          <td className="text-center p-1">{points.lost}</td>
        </tr>
      ))}
    </table>
  );
};

export { GroupTable };
