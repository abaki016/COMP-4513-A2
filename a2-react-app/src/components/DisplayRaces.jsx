import { Link } from "react-router-dom";

const DisplayRaces = (props) => {
  return (
    <div className="relative min-h-screen bg-center bg-cover"
         style={{ backgroundImage: `url('/sara-ruffoni-MjVdmqBCoXg-unsplash.jpg')` }}>
      <section className="font-sans mx-auto w-full md:w-3/4 lg:w-1/2 pt-10">
        {props.selectedSeason && (
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-thin text-white mb-3">
            {props.selectedSeason} Races
          </h2>
        )}
        <table className="divide-y divide-gray-200 w-full bg-white bg-opacity-60 rounded-lg overflow-hidden">
          <thead className="bg-opacity-60">
            <tr>
              <th className="text-white font-semibold text-lg px-6 py-4">Round</th>
              <th className="text-white font-semibold text-lg px-6 py-4">Circuit</th>
              <th className="text-white font-semibold text-lg px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.seasonRaces && props.seasonRaces.map((race, index) => (
             <tr key={index} className={`${index % 2 === 0 ? 'bg-white bg-opacity-60' : 'bg-gray-200 bg-opacity-60'} hover:bg-gray-300`}>
                <td className="font-semibold px-6 py-2 bg-opacity-60 text-center">{race.round}</td>
                <td className="px-6 py-2 bg-opacity-60 text-center">{race.name}</td>
                <td className="px-6 py-2 bg-opacity-60 text-center">
                  <Link to={`/race-results/${race.raceId}`} className="mr-2">
                    <button className="text-gray-700 bg-[#8DA399] hover:bg-gray-300 rounded px-3 py-1">
                      Results
                    </button>
                  </Link>
                  <Link to={`/race-standings/${race.raceId}`}>
                    <button className="text-gray-700 bg-[#8DA399] hover:bg-gray-300 rounded px-3 py-1">
                      Standings
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default DisplayRaces;
