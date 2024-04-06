import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient.js";
import Header from "./components/Header.jsx";
import DisplayRaces from "./components/DisplayRaces.jsx";
import ResultsComponent from "./components/ResultsComponent.jsx";
import StandingsComponent from "./components/StandingsComponent.jsx";
import DriverDetailModal from "./components/DriverDetailModal.jsx";
import ConstructorDetailModal from "./components/ConstructorDetailModal.jsx";
import FavoritesModal from "./components/FavoritesModal.jsx";

function App() {
  const navigate = useNavigate();

  // favorites 
  const [favoriteDrivers, setFavoriteDrivers] = useState([]);
  const [favoriteConstructors, setFavoriteConstructors] = useState([]);
  const [favoriteCircuits, setFavoriteCircuits] = useState([]);
  const [isFavoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const addDriverToFavorites = (driver) => {
    setFavoriteDrivers(prevFavorites => {
      // Prevent duplication
      const isAlreadyFavorite = prevFavorites.some(favDriver => favDriver.driverId === driver.driverId);

      if(!isAlreadyFavorite) {
        return [...prevFavorites, driver];
      } else {
        return prevFavorites;
      }
    })
  }

  const emptyFavorites = () => {
    setFavoriteDrivers([]);
  }

  const toggleFavoritesModal = () => {
    setFavoritesModalOpen(prev => !prev);
  }

  //====================================

  // useState for selecting season
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasons, setSeasons] = useState([]); // State for the list of seasons
  const [racesForSeason, setRacesForSeason] = useState([]); // State for races of the selected season
  const [modalAboutOpen, setModalAboutOpen] = useState(false); // Modal state

  // Use state for selected driver, constructor (modals)
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedConstructor, setSelectedConstructor] = useState(null);


  const showDriverDetails = (driver) => {
    setSelectedDriver(driver);
  };
  const showConstructorDetails = (constructor) => {
    setSelectedConstructor(constructor)
  }
  const closeModal = () => {
    setSelectedDriver(null);
    setSelectedConstructor(null);
  }

  //=========================================

  // Fetch seasons on component mount
  useEffect(() => {
    const fetchSeasons = async () => {
      console.log("Fetching seasons from Supabase...");
      try {
        const { data, error } = await supabase
          .from("seasons")
          .select("*")
          .gte("year", 2000)
          .lte("year", 2023)
          .order("year", { ascending: true });
        if (error) throw error;
        setSeasons(data);
      } catch (err) {
        console.error("Error fetching seasons:", err);
      }
    };
    fetchSeasons();
  }, []);

  // Fetch races when selectedSeason changes
  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const { data, error } = await supabase
          .from("races")
          .select("*, seasons!inner(year)")
          .eq("seasons.year", selectedSeason);
        console.log("data only", data);
        setRacesForSeason(data);
      } catch (err) {
        console.error("Error fetching races:", err);
      }
    };
    if (selectedSeason) {
      fetchRaces();
    }
  }, [selectedSeason]);

  // Handlers for modal and season change
  const openAboutModal = () => setModalAboutOpen(true);
  const closeAboutModal = () => setModalAboutOpen(false);

  const handleSeasonChange = (e) => {
    const newSelectedSeason = e.target.value;
    console.log("New selected season:", newSelectedSeason); // Check the selected value
    setSelectedSeason(newSelectedSeason); // Update the selected season
    navigate("/");
  };

  return (
    <div>
      <Header
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
        seasons={seasons}
        modalAboutOpen={modalAboutOpen}
        openAboutModal={openAboutModal}
        closeAboutModal={closeAboutModal}
        toggleFavoritesModal={toggleFavoritesModal}
      />

      <Routes key={selectedSeason}>
        {/* if we selected Season then display races */}
        <Route
          path="/"
          element={
            selectedSeason ? (
              <DisplayRaces
                seasonRaces={racesForSeason}
                selectedSeason={selectedSeason}
              />
            ) : (
              <div>
                <h2>Select season year 😁</h2>
              </div>
            )
          }
        />
        <Route
          path={"/race-results/:raceId"}
          element={<ResultsComponent showDriverDetails={showDriverDetails} 
          showConstructorDetails={showConstructorDetails} selectedDriver={selectedDriver} 
          selectedConstructor={selectedConstructor}/>}
        />
        <Route path={"/race-standings/:raceId"} 
          element={<StandingsComponent showDriverDetails={showDriverDetails} 
          showConstructorDetails={showConstructorDetails} selectedDriver={selectedDriver} 
          selectedConstructor={selectedConstructor}/>} />
        </Routes>

      {/* Modals for clickable links (driver, constructor) */}
      {selectedDriver && (<DriverDetailModal driverDetail={selectedDriver} addDriverToFavorites={addDriverToFavorites} onClose={closeModal}/>)}
      {selectedConstructor && (<ConstructorDetailModal constructorDetail={selectedConstructor} onClose={closeModal} />)}

      {/* Modal for favorites (driver, circuit, contructors) */}
      {isFavoritesModalOpen && (<FavoritesModal favoriteDrivers={favoriteDrivers} emptyFavorites={emptyFavorites} onClose={() => setFavoritesModalOpen(false)}/>)}
    </div>
  );
}

export default App;
