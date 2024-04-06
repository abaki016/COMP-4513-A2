const ConstructorDetailModal = (props) => {
  if (!props.constructorDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addConstructorToFavorites(props.constructorDetail)
  };
  return (
    <div>
      <h1>Constructor Details</h1>
      <div>
        <h2>Name: {props.constructorDetail.name}</h2>
        <p>Nationality: {props.constructorDetail.nationality}</p>
        <a
          href={props.constructorDetail.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Constructor info!
        </a>
      </div>
      <br />
      <div>
        <button onClick={props.onClose}>Close</button>
        <button onClick={() => onAddToFavorites(props.constructorDetail)}>
          Add Favorites
        </button>
      </div>
    </div>
  );
};

export default ConstructorDetailModal;
