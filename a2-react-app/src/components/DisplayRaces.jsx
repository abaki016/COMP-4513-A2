import { Link } from "react-router-dom";

const DisplayRaces = (props) => {
  return (
    <section className="font-sans ml-10">
      {props.selectedSeason && (
        <h2 className="text-sans text-lg font-normal  tracking-wide">
          {props.selectedSeason} Races
        </h2>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Round
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Circuit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.seasonRaces &&
            props.seasonRaces.map((race, indx) => (
              <tr key={indx}>
                <td className="px-6 py-4 whitespace-nowrap">{race.round}</td>
                <td className="px-6 py-4 whitespace-nowrap">{race.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/race-results/${race.raceId}`}>
                    <button className="text-white bg-customGray hover:bg-[#6b7075] hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                      Results
                    </button>
                  </Link>
                  <Link to={`/race-standings/${race.raceId}`}>
                    <button className="text-white bg-customGray hover:bg-[#6b7075] hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                      Standings
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default DisplayRaces;
