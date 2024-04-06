import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { supabase } from "../supabaseClient.js";



const StandingsComponent = (props) => {

    const { raceId } = useParams();
    const [driverStanding, setDriverStanding] = useState([]);
    const [constructorStanding, setConstructorStanding] = useState([]);


   
    useEffect(() => {
        // Fetch driver standings
        const fetchDriversStandings = async () => {
            const { data: driversStdData, error: driversStdError} = await supabase
            .from("driver_standings")
            .select("position, drivers(forename, surname, dob, nationality, url), points, wins")
            .eq("raceId", raceId)
            .order("position", {ascending: true});
        
        // Fetch constructor standings
        const {data: constructorStdData, error: constructorStdError} = await supabase
            .from('constructor_standings')
            .select("position, constructors (name, nationality, url), points, wins")
            .eq("raceId", raceId)
            .order("position", {ascending: true});

        //==============================================
        // Error handling and updates useStates for driverStanding, constructorStanding
            if(driversStdError) {
                console.error('Error fetching data', driversStdError)
            } else {
                // console.log(driversStdData)
                console.log('Drivers standings data:', driversStdData);
                setDriverStanding(driversStdData);
            }

            // Standings Constructors
            if(constructorStdError) {
                console.error('Error fetching constructor standing', constructorStdError)
            } else {
                console.log('Constructor standings data:', constructorStdData);
                setConstructorStanding(constructorStdData)
                console.log('useState for constructorStanding array', constructorStdData)
            }
        }

        

        if(raceId) {
            fetchDriversStandings();
        }
    }, [raceId])



    return(
        <div>
            <h1>Standings</h1>
            {/* <h2>{`After Round ${}`}</h2> */}
            <div>
                <div>
                    <table>
                        <caption>Drivers</caption>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th></th>
                                <th>Points</th>
                                <th>Wins</th>
                            </tr>
                        </thead>
                        <tbody>
                                {driverStanding.map((result, indx) => (
                                    <tr key={indx}>
                                        <td>{result.position}</td>
                                        <td>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                props.showDriverDetails(result.drivers);
                                            }}>{`${result.drivers.forename} ${result.drivers.surname}`}</a>
                                        </td>
                                        <td>{result.points}</td>
                                        <td>{result.wins}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <br />
                <div>
                    <table>
                        <caption>Constructors</caption>
                        <thead>
                            <tr>
                                <th>Pos</th>    
                                <th></th>    
                                <th>Points</th>
                                <th>Wins</th>
                            </tr>                                
                        </thead>
                        <tbody>
                               {constructorStanding.map((result, indx) => (
                                <tr key={indx}>
                                    <td>{result.position}</td>
                                    <td><a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        props.showConstructorDetails(result.constructors);
                                    }}>{result.constructors.name}</a></td>
                                    <td>{result.points != null ? result.points : 0}</td>
                                    <td>{result.wins != null ? result.wins : 0}</td>
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