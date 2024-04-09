const DriverDetailModal = (props) => {
  if (!props.driverDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addDriverToFavorites(props.driverDetail);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="container mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        {/* Modal content */}
        <div className="text-right">
          <button
            onClick={props.onClose}
            className="text-lg p-2 hover:bg-gray-200 rounded"
          >
            &times; Close
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold my-4">Driver Details</h1>
          <div className="bg-white border rounded-lg shadow-md p-4">
            <p className="font-medium font-serif text-2xl tracking-wide text-left">
              Name: <span  className="font-light text-xl tracking-wide pl-2">{props.driverDetail.forename} {props.driverDetail.surname}</span>
            </p>
            <p className="font-medium font-serif text-2xl tracking-wide text-left">Nationality: <span className="font-light text-xl tracking-wide pl-2">{props.driverDetail.nationality}</span></p>
            <p className="font-medium font-serif text-2xl tracking-wide text-left">Age: <span className="font-light text-xl tracking-wide pl-2">{calculateAge(props.driverDetail.dob)}</span></p>
            <p>
              <a
                href={props.driverDetail.url}
                target="_blank"
                rel="noopener noreferrer"
              className="hover:underline font-semibold">
                More info
              </a>
            </p>
            <div className="mt-4">
              <button onClick={onAddToFavorites} className="mr-2 bg-customRed3 hover:bg-gray-800 px-3 py-2 rounded text-white">Add to Favorites</button>
              {/* <button onClick={props.onClose}>Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailModal;
