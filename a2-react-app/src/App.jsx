import { useState, useEffect } from 'react';
import { createClient} from '@supabase/supabase-js';
import Header from './components/Header';

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supaUrl, supabaseAnonKey);


function App() {

  useEffect(() =>{
    const fetchSeasons = async () => {
      console.log('Fetching season rom Supabase...')
      try{
        const { data, error} = await supabase.from('seasons').select('*');
        console.log('before filling setSeasons:', data);
        setSeasons(data);
        console.log('setSeasons data: ',seasons);
      } catch (err) {
        console.error('Error fetching seasons', err);
      }
    }
    fetchSeasons();
  }, [])

  // Seasons
  const [seasons, setSeasons] = useState([]); 

  // About modal
  const [modalAboutOpen, setModalAboutOpen] = useState(false);
  const openAboutModal = () => setModalAboutOpen(true);
  const closeAboutModal = () => setModalAboutOpen(false);

  // Selecting season <select>
  const [selectedSeason, setSelectedSeason] = useState('2023'); //change
  const handleSeasonChange = (e) => {
    console.log("Selected season:", e.target.value)
    setSelectedSeason(e.target.value);
  }


  return (
    // first div just check if season displays output 
    <div>
      <Header 
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
        seasons={seasons}
        modalAboutOpen={modalAboutOpen}
        openAboutModal={openAboutModal}
        closeAboutModal={closeAboutModal}/>
    </div>
    
    
  )
}

export default App
