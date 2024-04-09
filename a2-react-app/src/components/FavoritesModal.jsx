const FavoritesModal = (props) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div className="container mx-auto p-5 border w-1/2 shadow-lg rounded-md bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold my-4">Favorites</h2>
  
            <div className="flex justify-between mb-4">
              <button onClick={props.emptyFavorites} className="bg-red-500 hover:bg-red-700 px-3 py-2 rounded text-white">Empty Favorites</button>
              <button onClick={props.onClose} className="bg-customRed3 hover:bg-gray-800 px-3 py-2 rounded text-white">Close</button>
            </div>
  
            <div className="flex justify-around ">
              <div className="flex-1">
                <h3 className="font-bold">Drivers</h3>
                <ul className="border p-4 min-h-[10rem]"> {/* Update min-h as per your design */}
                  {props.favoriteDrivers.map((driver, indx) => (
                    <li key={indx} className="py-1">{driver.forename} {driver.surname}</li>
                  ))}
                </ul>
              </div>
  
              <div className="flex-1">
                <h3 className="font-bold">Constructors</h3>
                <ul className="border p-4 min-h-[10rem]"> {/* Added min-h class */}
                  {props.favoriteConstructors.map((constructor, indx) => (
                    <li key={indx} className="py-1">{constructor.name}</li>
                  ))}
                </ul>
              </div>
  
              <div className="flex-1">
                <h3 className="font-bold">Circuits</h3>
                <ul className="border p-4 min-h-[10rem]"> {/* Added min-h class */}
                  {props.favoriteCircuits.map((circuit, indx) => (
                    <li key={indx} className="py-1">{circuit.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default FavoritesModal;
