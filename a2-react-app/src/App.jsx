import { useState, useEffect } from 'react';
import { createClient} from '@supabase/supabase-js';

const supaUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supaUrl, supabaseAnonKey);
//works now ! Merging side_br to Main branch !

function App() {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const fetchSeasons = async () => {
      console.log('Fetching season rom Supabase...')
      try{
        const { data, error} = await supabase.from('seasons').select('*');
        console.log('before filling setSeasons:', data);
        setSeasons(data);
        console.log('after setSeasons(data)', seasons);
      } catch (err) {
        console.error('Error fetching seasons', err);
      }
    }
    fetchSeasons();
  }, [])



  return (
    <div>
      {/* if loading/error is true, execute the following  */}
      {loading && <p>Loading seasons...</p>}
      {error && <p>Error fetching data</p>}
      {seasons.length > 0 && (
        <ul>
          {seasons.map((season, indx) => (
            <li key={indx}>{season.year}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
