import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from './components/Header.jsx';
import DisplayRaces from './components/DisplayRaces.jsx';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
    // useState for selecting season
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [seasons, setSeasons] = useState([]); // State for the list of seasons
    const [racesForSeason, setRacesForSeason] = useState([]); // State for races of the selected season
    const [modalAboutOpen, setModalAboutOpen] = useState(false); // Modal state

    // Fetch seasons on component mount
    useEffect(() => {
        const fetchSeasons = async () => {
            console.log('Fetching seasons from Supabase...');
            try {
                const { data, error } = await supabase.from('seasons').select('*');
                if (error) throw error;
                setSeasons(data);
            } catch (err) {
                console.error('Error fetching seasons:', err);
            }
        };
        fetchSeasons();
    }, []);

    // Fetch races when selectedSeason changes
    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const { data, error } = await supabase
                .from('races')
                .select('*, seasons!inner(year)')
                .eq('seasons.year', selectedSeason)
                console.log('data only', data)
                setRacesForSeason(data);
                console.log('within setRacesForSeason array', setRacesForSeason)
            } catch (err) {
                console.error('Error fetching races:', err);
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
        console.log("Selected season:", e.target.value);
        setSelectedSeason(e.target.value);
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
            <DisplayRaces seasonRaces={racesForSeason} />
        </div>
    );
}

export default App;
