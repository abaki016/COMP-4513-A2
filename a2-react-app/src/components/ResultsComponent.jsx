// ResultsComponent.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';

const ResultsComponent = () => {
    const { raceId } = useParams();
    const [raceDetails, setRaceDetails] = useState('');
    const [qualifyingResults, setQualifyingResults] = useState([]);

    useEffect(() => {
        console.log('raceId from useParams:', raceId);

        const fetchRaceDetailsAndQualifying = async () => {
            const { data: raceData, error: raceError } = await supabase
                .from('races')
                .select(`name, round, date, circuits(name), year, date, url`) // we still need date, url
                .eq('raceId', raceId) 
                .single();

                if(raceError) {
                    console.error('Error fetching race details', raceError);
                    return;
                }
                setRaceDetails(raceData);

                    // fetch Qualifying 
                    const {data: qualifyingData, error: qualifyingError} = await supabase
                    .from('qualifying')
                    .select(`position, drivers (forename, surname), constructors(name), q1, q2, q3`)
                    .eq('raceId', raceId)
                    .order('position', {ascending: true});

                if(qualifyingError) {
                    console.error('Error fetchign qualifying results', qualifyingError);
                    return;
                }
                setQualifyingResults(qualifyingData);
            
        };

        if (raceId) {
            fetchRaceDetailsAndQualifying();
        }

    // You should depend on raceId here, not raceDetails
    }, [raceId]);

    return (
        <div>
            <h1>Race Details</h1>
            {raceDetails && (
                <div>
                    {`Name: ${raceDetails.name} | Round Number: ${raceDetails.round} | Circuits: ${raceDetails.circuits.name} | Date: ${raceDetails.year} | URL: ${raceDetails.url} `}
                </div>
            )}
            {/* adding space between table and header */}
            <br /> 
            <table>
                <thead>
                    <tr>
                        <th>
                            Pos
                        </th>
                        <th>
                            Driver
                        </th>
                        <th>
                            Constructor
                        </th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                    </tr>
                </thead>
                <tbody>
                    {qualifyingResults.map((result) => (
                        <tr key={result.position}>
                            <td>{result.position}</td>
                            <td>{`${result.drivers.forename} ${result.drivers.surname}`}</td>
                            <td>{result.constructors.name}</td>
                            <td>{result.q1}</td>
                            <td>{result.q2}</td>
                            <td>{result.q3}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsComponent;
