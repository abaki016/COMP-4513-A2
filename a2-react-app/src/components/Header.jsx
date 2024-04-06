import AboutModal from "./AboutModal.jsx";
import { Link } from "react-router-dom";

const Header = (props) => {

  //if empty returns true
  const areFavoritesEmpty = 
    props.favoriteDrivers.length == 0 && 
    props.favoriteConstructors.length == 0 && 
    props.favoriteCircuits.length == 0;
  

  return (
    <header>
      <div>
        <h1>F1 Dashboard Project</h1>
      </div>
      <div>
        <label>Season:</label>
        <select value={props.selectedSeason} onChange={props.onSeasonChange}>
          {props.seasons.map((season, indx) => (
            <option key={indx} value={season.year}>
              {season.year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={props.toggleFavoritesModal} disabled={areFavoritesEmpty}>Favorites</button>
        <button onClick={props.openAboutModal}>About</button>
      </div>
      <AboutModal open={props.modalAboutOpen} close={props.closeAboutModal} />
    </header>
  );
};

export default Header;
