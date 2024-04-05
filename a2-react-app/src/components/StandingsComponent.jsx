import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { supabase } from "../supabaseClient.js";



const StandingsComponent = (props) => {

    const { raceId } = useParams();
    const [driverStanding, setDriverStanding] = useState([]);


   
    useEffect(() => {
        const fetchStandings = async () => {
            const { data: raceData, error: raceError} = await supabase
            .from("driver_standings")
            .select("position, drivers(forename, surname), points, wins")
            .eq("raceId", raceId)
            .order("position", {ascending: true});

            if(raceError) {
                console.error('Error fetching data', raceError)
            } else {
                console.log(raceData)
                setDriverStanding(raceData);
            }
        }

        if(raceId) {
            fetchStandings();
        }
    }, [raceId])



    return(
        <div>
            <h1>Standings</h1>
            {/* <h2>{`After Round ${}`}</h2> */}
            <div>
                <div>
                    <table>
                        <head>
                            <tr>
                                <th>Pos</th>
                                <th>Driver</th>
                                <th>Points</th>
                                <th>Wins</th>
                            </tr>
                        </head>
                        <tbody>
                                {driverStanding.map((result, indx) => (
                                    <tr key={indx}>
                                        <td>{result.position}</td>
                                        <td href="#" onClick={(e) => {
                                            e.preventDefault();

                                        }}>
                                            <a>{`${result.drivers.forename} ${result.drivers.surname}`}</a>
                                        </td>
                                        <td>{result.points}</td>
                                        <td>{result.wins}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StandingsComponent;