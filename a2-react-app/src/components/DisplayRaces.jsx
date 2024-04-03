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

            <Link to={`/results/${race.raceId}`}>
              <button>Results</button>
            </Link>
            <Link to="/standings">
              <button>Standings</button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DisplayRaces;
