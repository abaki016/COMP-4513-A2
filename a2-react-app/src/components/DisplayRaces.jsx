import { Link } from "react-router-dom";

const DisplayRaces = (props) => {
  return (
    <div className="relative min-h-screen bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: `url('/sara-ruffoni-MjVdmqBCoXg-unsplash.jpg')` }}>
    <section className="font-sans mx-auto w-1/2">
      {props.selectedSeason && (
        <h2 className="text-center text-5xl font-sans font-bold tracking-wide text-white mb-3">
          {props.selectedSeason} Races
        </h2>
      )}
      <div className="divide-y divide-gray-200 ">
        <div className="bg-gray-300 flex justify-between px-6 py-3 text-left text-xs py-4 font-medium text-gray-500 uppercase tracking-wider bg-opacity-60">
          <div className="text-white font-sans font-semibold">Round</div>
          <div className="text-white font-sans font-semibold">Circuit</div>
          <div className="text-white font-sans font-semibold">Actions</div>
        </div>
        <div className="bg-white bg-opacity-60">
          {props.seasonRaces &&
            props.seasonRaces.map((race, indx) => (
              <div key={indx} className={`flex justify-between px-6 py-2 font-sans ${indx % 2 !== 0 ? 'bg-[#F8F8F8]' : ''}`}>
                <div className="whitespace-nowrap">{race.round}</div>
                <div className="whitespace-nowrap">{race.name}</div>
                <div className="whitespace-nowrap">
                  <Link to={`/race-results/${race.raceId}`} className="mr-2">
                    <button className="text-white bg-[#A9A9A9] hover:bg-[#6b7075] hover:text-white font-medium rounded text-sm px-3 py-2 text-center inline-flex items-center">
                      Results
                    </button>
                  </Link>
                  <Link to={`/race-standings/${race.raceId}`} className="mr-2">
                    <button className="text-white bg-[#A9A9A9] hover:bg-[#6b7075] hover:text-white font-medium rounded text-sm px-3 py-2 text-center inline-flex items-center">
                      Standings
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default DisplayRaces;

