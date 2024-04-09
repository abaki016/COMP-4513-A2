import AboutModal from "./AboutModal.jsx";

const Header = (props) => {
  const areFavoritesEmpty =
    props.favoriteDrivers.length === 0 &&
    props.favoriteConstructors.length === 0 &&
    props.favoriteCircuits.length === 0;

  return (
    <header className="flex items-center justify-between p-4 bg-customBeige1">
      <div className="flex">
        <label
          htmlFor="season-select"
          className="mt-1 text-gray-600 font-sans font-bold"
        >
          Season
        </label>
        <select
          id="season-select"
          className="ml-2 p-1.5 border border-gray-300 text-gray-700 rounded-md bg-white"
          value={props.selectedSeason}
          onChange={props.onSeasonChange}
        >
          {props.seasons.map((season, indx) => (
            <option key={indx} value={season.year}>
              {season.year}
            </option>
          ))}
        </select>
      </div>

      {/* This div is just for centering the title */}
      <div className="flex-grow text-center">
        <span className="text-2xl font-sans font-extrabold tracking-wide text-gray-700">
          F1 Dashboard Project
        </span>
      </div>

      <div className="flex">
        <button
          className={`font-sans font-bold px-4 py-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-300 ${
            areFavoritesEmpty ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={props.toggleFavoritesModal}
          disabled={areFavoritesEmpty}
        >
          Favorites
        </button>
        <button
          className="ml-2 px-4 py-2 border rounded-md text-gray-700 border-gray-300 bg-light-gray hover:bg-customBeige2 font-sans font-bold"
          onClick={props.openAboutModal}
        >
          About
        </button>
      </div>
      <AboutModal open={props.modalAboutOpen} close={props.closeAboutModal} />
    </header>
  );
};

export default Header;
