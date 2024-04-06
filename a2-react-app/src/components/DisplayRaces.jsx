import { Link } from "react-router-dom";

const DisplayRaces = (props) => {
  return (
    <div>
      <div>
        {/* render only if season is selected */}
        {props.selectedSeason && <h2>{props.selectedSeason} Races</h2>}
        <h3>Round - Circuit</h3>
      </div>
      {props.seasonRaces &&
        props.seasonRaces.map((race, indx) => (
          <div key={indx}>
            <div>
              {race.round} {race.name}
            </div>

            <Link to={`/race-results/${race.raceId}`}>
              <button>Results</button>
            </Link>
            <Link to={`/race-standings/${race.raceId}`}>
              <button>Standings</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DisplayRaces;
