const ConstructorDetailModal = (props) => {
  if (!props.constructorDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addConstructorToFavorites(props.constructorDetail);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
      <div className="container mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="text-right">
          <button
            onClick={props.onClose}
            className="text-lg p-2 hover:bg-gray-200 rounded"
          >
            &times; Close
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold my-4">Constructor Details</h1>
          <div className="bg-white border rounded-lg shadow-md p-4">
            <p className="font-sans font-bold text-gray-600 text-lg text-left">
              Name: <span className="font-light text-xl tracking-wide pl-2">{props.constructorDetail.name}</span>
            </p>
            <p className="font-sans font-bold text-gray-600 text-lg text-left">
              Nationality: <span className="font-light text-xl tracking-wide pl-2">{props.constructorDetail.nationality}</span>
            </p>
            <p>
              <a
                href={props.constructorDetail.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
              >
                More info
              </a>
            </p>
            <div className="mt-4">
              <button 
                onClick={onAddToFavorites} 
                className="mr-2 bg-customRed3 hover:bg-gray-800 px-3 py-2 rounded text-white"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructorDetailModal;
