type PlayerPoints = {
  played: number;
  won: number;
  lost: number;
  difference: number;
};

type Props = {
  data: Record<string, PlayerPoints>;
};

const GroupTable = ({ data }: Props) => {
  const orderedData = Object.entries(data).sort(
    ([_, apoints], [__, bpoints]) => {
      if (bpoints.won === apoints.won) {
        return bpoints.difference - apoints.difference;
      }
      return bpoints.won - apoints.won;
    },
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
          P
        </th>
        <th>
          + / -
        </th>
      </tr>
      {orderedData.map(([player, points], index) => (
        <tr key={player} className={index > 1 ? "bg-red-100" : undefined}>
          <td className="max-w-0 p-1">{player}</td>
          <td className="text-center p-1">{points.played}</td>
          <td className="text-center p-1">{points.won}</td>
          <td className="text-center p-1">{points.lost}</td>
          <td className="text-center p-1">{points.difference}</td>
        </tr>
      ))}
    </table>
  );
};

export { GroupTable };
