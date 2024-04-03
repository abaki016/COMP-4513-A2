import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import DisplayRaces from "./components/DisplayRaces.jsx";
import ResultsComponent from "./components/ResultsComponent.jsx";
import StandingsComponent from "./components/StandingsComponent.jsx";
import { supabase } from "./supabaseClient.js";

function App() {
  const navigate = useNavigate();

  // useState for selecting season
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasons, setSeasons] = useState([]); // State for the list of seasons
  const [racesForSeason, setRacesForSeason] = useState([]); // State for races of the selected season
  const [modalAboutOpen, setModalAboutOpen] = useState(false); // Modal state

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
          path={"/results/:raceId"}
          element={<ResultsComponent selectedSeason={selectedSeason} />}
        />
        <Route path="/standings" element={<StandingsComponent />} />
      </Routes>
    </div>
  );
}

export default App;
