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
  const [isModalOpen, setIsModalOpen] = useState(false);
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


  const modalResult = () => {
    setIsModalOpen(true);
  };


  const closeModalResult = () => {
    setIsModalOpen(false);
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
      if (!raceId) {
        console.log("No raceId available");
        return;
      }
      // Fetch race details
      const { data: raceData, error: raceError } = await supabase
        .from("races")
        .select(
          `name, round, date, circuits(name, location, country, url, lat, lng, alt), year, date, url`
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
    <div className="flex flex-col">
      {/* Qualifying table    */}
      <div className="flex justify-between items-center bg-customRed3 text-white flex-1">
        <div className="container mx-auto bg-gray-800 text-white p-6 text-center">
          {raceDetails && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2 lg:col-span-1">
                <span className="font-semibold text-lg">Race:</span>
                <span className="text-md ml-2">{raceDetails.name}</span>
              </div>
              <div>
                <span className="font-semibold text-lg">Round:</span>
                <span className="text-md ml-2">{raceDetails.round}</span>
              </div>
              <div className="lg:col-span-1">
                <span className="font-semibold text-lg">Circuit:</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.showCircuitDetails(raceDetails.circuits);
                  }}
                  className="text-md ml-2 hover:underline"
                >
                  {raceDetails.circuits.name}
                </a>
              </div>
              <div>
                <span className="font-semibold text-lg">Date:</span>
                <span className="text-md ml-2">{raceDetails.year}</span>
              </div>
              <div>
                <span className="font-semibold text-lg">URL:</span>
                <a
                  href={raceDetails.url}
                  className="text-md ml-2 hover:underline"
                >
                  More info here!
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* adding space between table and header */}
      <br />
      <table className="min-w-min border-collapse border border-gray-200" bg-opacity-60 style={{ backgroundImage: `url('/fpvmat-a-sFPoi1s-1Eo-unsplash.jpg')` }}>
        
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-5 py-2">Pos</th>
            <th className="border border-gray-200 px-2 py-2">Driver</th>
            <th className="border border-gray-200 px-2 py-2">Constructor</th>
            <th className="border border-gray-200 px-5 py-2">Q1</th>
            <th className="border border-gray-200 px-5 py-2">Q2</th>
            <th className="border border-gray-200 px-5 py-2">Q3</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {qualifyingResults.map((result, indx) => (
            // <div>
            <tr key={indx}>
              <td className="text-center  py-3">{result.position}</td>


              <td className="text-center hover:bg-gray-200 hover:underline">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    props.showDriverDetails(result.drivers);
                  }}
                >{`${result.drivers.forename} ${result.drivers.surname}`}</a>
              </td>


              <td className="text-center hover:bg-gray-200 hover:underline">
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
              <td className="text-center">{result.q1}</td>
              <td className="text-center">{result.q2}</td>
              <td className="text-center">{result.q3}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* //here */}
      {/* Button to open the modal */}
      <button
        onClick={modalResult}
        className="mt-4 px-4 py-5 bg-customRed3 text-white text-lg font-bold hover:bg-gray-800 rounded"
      >
        Show Race Results
      </button>

      {props.selectedDriver && (
      <DriverDetailModal
        driverDetail={props.selectedDriver}
        addDriverToFavorites={props.addDriverToFavorites}
        // onClose={props.closeDriverModal}
        
      />
    )}

    {props.selectedConstructor && (
    <ConstructorDetailModal
      constructorDetail={props.selectedConstructor}
     addConstructorToFavorites={props.addConstructorToFavorites}
    // onClose={() => setSelectedConstructor(null)} // Ensure you have a function to close the modal
    />
    )}

    {props.selectedCircuit && (<CircuitDetailModal 
      circuitDetail={props.circuitDetail}
      addCircuitToFavorites={props.addCircuitToFavorites}/>)}

    
  
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="container mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
            {/* Modal content */}
            <div className="text-right">
              <button
                onClick={closeModalResult}
                className="text-lg p-2 hover:bg-gray-200 rounded"
              >
                &times; Close
              </button>
            </div>

            
            <div >
              <h1 className="text-2xl font-bold text-center my-4">
                Race Details
              </h1>
              <div className="flex justify-center space-x-4 my-4 ">
                {topThree
                  .filter(
                    (result) => result.position >= 1 && result.position <= 3
                  )
                  .sort((a, b) => parseInt(a.position) - parseInt(b.position))
                  .map((result) => (
                    <div
                      key={result.position}
                      className="bg-white border rounded-lg shadow-md p-4 text-center hover:bg-gray-500 hover:text-white"
                    >
                      <div className="font-bold text-lg hover:underline">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            props.showDriverDetails(result.drivers);
                          }}
                        >
                          {`${result.drivers.forename} ${result.drivers.surname}`}{" "}
                        </a>
                      </div>
                      <div className="text-md text-gray-700 mt-2">
                        {getPosition(result.position)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* <h2 className="text-xl font-bold text-center mb-4">Race Results</h2> */}


            {/* Results table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-5 py-2">Pos</th>
                    <th className="border border-gray-200 px-2 py-2">Driver</th>
                    <th className="border border-gray-200 px-2 py-2">
                      Constructor
                    </th>
                    <th className="border border-gray-200 px-5 py-2">Laps</th>
                    <th className="border border-gray-200 px-5 py-2">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-gray-200">
                  {raceResults
                    .filter((result) => result.position) // Filter out results without a position
                    .map((result, index) => (
                      <tr key={index} className="hover:bg-gray-200">
                        <td className="text-center py-3">{result.position}</td>
                        <td className="text-center hover:underline">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              props.showDriverDetails(result.drivers);
                            }}
                          >{`${result.drivers.forename} ${result.drivers.surname}`}</a>
                        </td>
                        <td className="text-center hover:underline">
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
                        <td className="text-center">{result.laps}</td>
                        <td className="text-center">{result.points}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


      <div>
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





