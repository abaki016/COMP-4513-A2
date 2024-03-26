const DisplayRaces = (props) => {

    return(
        <div>
            <div>
                <br></br>
                <br></br>

            </div>
            <div>
                <h3>Round = - = - = Circuit</h3>
            </div>
            {props.seasonRaces.map((race, indx) => (
                <div>
                    <div key={indx}>
                        {race.round}    {race.name}     
                    </div>
                    <button>Results</button>
                    <button>Standings</button>
                </div>
            ))}
        </div>
    )
}

export default DisplayRaces;