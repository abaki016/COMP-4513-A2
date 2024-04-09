import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

const StandingsComponent = (props) => {
  const { raceId } = useParams();
  const [driverStanding, setDriverStanding] = useState([]);
  const [constructorStanding, setConstructorStanding] = useState([]);

  useEffect(() => {
    // Fetch driver standings
    const fetchDriversStandings = async () => {
      const { data: driversStdData, error: driversStdError } = await supabase
        .from("driver_standings")
        .select(
          "position, drivers(forename, surname, dob, nationality, url), points, wins"
        )
        .eq("raceId", raceId)
        .order("position", { ascending: true });

      // Fetch constructor standings
      const { data: constructorStdData, error: constructorStdError } =
        await supabase
          .from("constructor_standings")
          .select(
            "position, constructors (name, nationality, url), points, wins"
          )
          .eq("raceId", raceId)
          .order("position", { ascending: true });

      //==============================================
      // Error handling and updates useStates for driverStanding, constructorStanding
      if (driversStdError) {
        console.error("Error fetching data", driversStdError);
      } else {
        // console.log(driversStdData)
        console.log("Drivers standings data:", driversStdData);
        setDriverStanding(driversStdData);
      }

      // Standings Constructors
      if (constructorStdError) {
        console.error(
          "Error fetching constructor standing",
          constructorStdError
        );
      } else {
        console.log("Constructor standings data:", constructorStdData);
        setConstructorStanding(constructorStdData);
        console.log(
          "useState for constructorStanding array",
          constructorStdData
        );
      }
    };

    if (raceId) {
      fetchDriversStandings();
    }
  }, [raceId]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl text-white font-bold text-center py-5 bg-gray-800 rounded ">
        Standings After Round 2
      </h1>
      <div className="flex justify-between space-x-10">
        {/* Drivers Table */}
        <div className="flex-1">
          <table className="min-w-full border-collapse border border-gray-200 shadow-lg ">
            <caption className="text-xl font-bold p-3">Drivers</caption>
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Pos
                </th>
                <th className="border border-gray-200 px-2 py-2 bg-customRed3 text-customBeige1"></th>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Pts
                </th>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Wins
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {driverStanding.map((result, indx) => (
                <tr key={indx} className="hover:bg-gray-200">
                  <td className="text-center py-3">{result.position}</td>
                  <td className="text-center hover:underline">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        props.showDriverDetails(result.drivers);
                      }}
                    >
                      {`${result.drivers.forename} ${result.drivers.surname}`}
                    </a>
                  </td>
                  <td className="text-center">{result.points}</td>
                  <td className="text-center">{result.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Constructors Table */}
        <div className="flex-1">
          <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
            <caption className="text-xl font-bold p-3">Constructors</caption>
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Pos
                </th>
                <th className="border border-gray-200 px-2 py-2 bg-customRed3 text-customBeige1"></th>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Pts
                </th>
                <th className="border border-gray-200 px-5 py-2 bg-customRed3 text-customBeige1">
                  Wins
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {constructorStanding.map((result, indx) => (
                <tr key={indx} className="hover:bg-gray-200">
                  <td className="text-center py-3">{result.position}</td>
                  <td className="text-center hover:underline">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        props.showConstructorDetails(result.constructors);
                      }}
                    >
                      {result.constructors.name}
                    </a>
                  </td>
                  <td className="text-center">
                    {result.points != null ? result.points : 0}
                  </td>
                  <td className="text-center">
                    {result.wins != null ? result.wins : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StandingsComponent;
