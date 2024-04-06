// ResultsComponent.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient.js";
import CircuitDetailModal from "./CircuitDetailModal.jsx";
import DriverDetailModal from "./DriverDetailModal.jsx";
import ConstructorDetailModal from "./ConstructorDetailModal.jsx";

const ResultsComponent = (props) => {
  const { raceId } = useParams();
  const [raceDetails, setRaceDetails] = useState("");
  const [qualifyingResults, setQualifyingResults] = useState([]);
  const [raceResults, setRaceResults] = useState([]);
  const [topThree, setTopThree] = useState([]);
  // ===================================
  // Use states for selecting links of circuit
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  

  const showCircuitDetails = (circuit) => {
    // set the selected circuit for the modal
    setSelectedCircuit(circuit);
  };

 

  // ===================================
  const closeModal = () => {
    setSelectedCircuit(null);
    // setSelectedDriver(null);
    // setSelectedConstructor(null);
  };

  // Get position suffix for top three
  const getPosition = (position) => {
    switch (position) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return `${position}th`;
    }
  };

  useEffect(() => {
    console.log("raceId from useParams:", raceId);

    const fetchRaceDetailsAndQualifying = async () => {
      // Fetch race details
      const { data: raceData, error: raceError } = await supabase
        .from("races")
        .select(
          `name, round, date, circuits(name, location, country, url), year, date, url`
        )
        .eq("raceId", raceId)
        .single();

      // Fetch Qualifying results
      const { data: qualifyingData, error: qualifyingError } = await supabase
        .from("qualifying")
        .select(
          `position, drivers (forename, surname, dob, nationality, url), constructors(name, nationality, url), q1, q2, q3`
        )
        .eq("raceId", raceId)
        .order("position", { ascending: true });

      
      // Fetch Results detail
      const { data: resultsData, error: resultsError } = await supabase
        .from("results")
        .select(
          "position, drivers (forename, surname, dob, nationality, url), constructors(name, nationality, url), laps, points"
        )
        .eq("raceId", raceId)
        .order("position", { ascending: true });

      //==============================================
      // Error handling and updating useStates for raceDetails, qualifyingResults, raceResults
      if (raceError) {
        console.error("Error fetching race details", raceError);
      } else {
        console.log("Race details:", raceData);
        setRaceDetails(raceData);
      }

      if (qualifyingError) {
        console.error("Error fetchign qualifying results", qualifyingError);
      } else {
        console.log("Qualifying results:", qualifyingData);
        setQualifyingResults(qualifyingData);
      }

      if (resultsError) {
        console.error("Error fetching race details", resultsError);
      } else {
        // sort result Data
        const sortResultsData = resultsData.sort((a, b) => {
          return parseInt(a.position) - parseInt(b.position);
        });

        setRaceResults(sortResultsData);

        const filteredResults = sortResultsData.filter(
          (result) => result.position >= 1 && result.position <= 3
        );
        const sortedAndFilteredResults = filteredResults.sort(
          (a, b) => parseInt(a.position) - parseInt(b.position)
        );
        setTopThree(sortedAndFilteredResults);
      }
    };

    if (raceId) {
      fetchRaceDetailsAndQualifying();
    }
  }, [raceId]);

  return (
    <div>
      {/* Qualifying table    */}
      <div>
        {raceDetails && (
          <div>
            Name: {raceDetails.name} | Round Number: {raceDetails.round} |
            Circuits:{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showCircuitDetails(raceDetails.circuits);
              }}
            >
              {raceDetails.circuits.name}
            </a>{" "}
            | Date: {raceDetails.year} | URL:{" "}
            <a href={raceDetails.url}>More info here!</a>
          </div>
        )}
        {/* adding space between table and header */}
        <br />
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Q1</th>
              <th>Q2</th>
              <th>Q3</th>
            </tr>
          </thead>
          <tbody>
            {qualifyingResults.map((result, indx) => (
              <tr key={indx}>
                <td>{result.position}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      props.showDriverDetails(result.drivers)
                    }}
                  >{`${result.drivers.forename} ${result.drivers.surname}`}</a>
                </td>

                <td>
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
                <td>{result.q1}</td>
                <td>{result.q2}</td>
                <td>{result.q3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results table    */}
      <div>
        <div>
          <h1>Race Details</h1>
          {/* Top three drivers */}
          {topThree
            .filter((result) => result.position >= 1 && result.position <= 3)
            .sort((a, b) => parseInt(a.position) - parseInt(b.position))
            .map((result) => (
              <div key={result.position}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.showDriverDetails(result.drivers);
                  }}
                >
                  {`${result.drivers.forename} ${result.drivers.surname}`} -{" "}
                  {getPosition(result.position)}
                </a>
              </div>
            ))}
        </div>
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Constructor</th>
              <th>Laps</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {raceResults.map((result, index) => (
              <tr key={index}>
                <td>{result.position}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      props.showDriverDetails(result.drivers);
                    }}
                  >{`${result.drivers.forename} ${result.drivers.surname}`}</a>
                </td>
                <td>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      props.showConstructorDetails(result.constructors);
                    }}
                  >
                    {result.constructors.name}
                  </a>
                </td>
                <td>{result.laps}</td>
                <td>{result.position}</td>
                <td>{result.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* if selectedCircuit is selected then render the following component */}
        {selectedCircuit && (
          <CircuitDetailModal
            circuitDetail={selectedCircuit}
            onClose={closeModal}
          />
        )}

      </div>
    </div>
  );
};

export default ResultsComponent;
