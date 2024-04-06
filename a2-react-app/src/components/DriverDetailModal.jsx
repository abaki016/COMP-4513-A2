const DriverDetailModal = (props) => {
  if (!props.driverDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addDriverToFavorites(props.driverDetail);
  };

  return (
    <div>
      <h1>Driver Details</h1>
      <div>
        <h2>
          {props.driverDetail.forename} {props.driverDetail.surname}
        </h2>
        <p>{props.driverDetail.dob}</p>
        <p>{props.driverDetail.nationality}</p>
        <h3>{props.driverDetail.dob}</h3>
        <p>
          <a
            href={props.driverDetail.url}
            target="_blank"
            rel="noopen noreferrer"
          >
            More info
          </a>
        </p>
        {/* instead of dob, we need to calculate their age */}

        <div>
          <button onClick={props.onClose}>Close</button>
          <button onClick={() => onAddToFavorites(props.driverDetail)}>
            Add Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailModal;
