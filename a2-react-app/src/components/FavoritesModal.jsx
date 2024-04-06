const FavoritesModal = (props) => {

    return (
        <div>
            <div>
                <h2>Favorites</h2>
                <div>
                    <h3>Drivers</h3>
                    <ul>
                        {props.favoriteDrivers.map((driver, indx) => (
                            <li key={indx}>{driver.forename} {driver.surname}</li> 
                        ))}
                    </ul>
                </div>

                <div>
                        {props.favoriteConstructors.map((constructor, indx) => (
                            <li key={indx}>{constructor.name}</li>
                        ))}
                </div>

                <div>
                        {props.favoriteCircuits.map((circuit, indx) => {
                            <li key={indx}>{circuit.name}</li>
                        })}
                </div>
            </div>
            <button onClick={props.emptyFavorites}>Empty Favorites</button>
            <button onClick={props.onClose}>Close</button>
        </div>
    )
}

export default FavoritesModal;
// or instead of driver.drivers.driverId is indx?