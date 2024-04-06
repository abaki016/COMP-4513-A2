const CircuitDetailModal = (props) => {
  if (!props.circuitDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addCircuitToFavorites(props.circuitDetail)
  };

  return (
    <div>
      <h1>Circuit Details</h1>
      <div>
        <h2>Name: {props.circuitDetail.name}</h2>
        <p>
          Location: {props.circuitDetail.location}, Country:{" "}
          {props.circuitDetail.country}
        </p>
        <p>
          <a
            href={props.circuitDetail.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            More info
          </a>
        </p>
        {/* circuit image */}
        {/* map leaflet component here */}

        <div>
          <button onClick={props.onClose}>Close</button>
          <button onClick={() => onAddToFavorites(props.circuitDetail)}>
            Add Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircuitDetailModal;
