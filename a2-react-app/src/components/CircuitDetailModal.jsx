import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CircuitDetailModal = (props) => {
  if (!props.circuitDetail) {
    return null;
  }

  const onAddToFavorites = () => {
    props.addCircuitToFavorites(props.circuitDetail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="container w-3/4 p-5 mx-auto bg-white border rounded-md shadow-lg">
        <div className="text-right">
          <button
            onClick={props.onClose}
            className="p-2 text-lg rounded hover:bg-gray-200"
          >
            &times; Close
          </button>
        </div>

        <div className="text-center">
          <h1 className="my-4 text-2xl font-bold">Circuit Details</h1>
          <div className="p-4 bg-white border rounded-lg shadow-md">
            <p className="text-lg font-bold text-left text-gray-600">
              Name: <span className="pl-2 text-xl font-light tracking-wide">{props.circuitDetail.name}</span>
            </p>
            <p className="text-lg font-bold text-left text-gray-600">
              Location: <span className="pl-2 text-xl font-light tracking-wide">{props.circuitDetail.location}, {props.circuitDetail.country}</span>
            </p>
            <p>
              <a
                href={props.circuitDetail.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                More info
              </a>
            </p>
            <div className="mt-4">
              <button onClick={onAddToFavorites} className="px-3 py-2 mr-2 text-white rounded bg-customRed3 hover:bg-gray-800">Add to Favorites</button>
            </div>
          </div>
        </div>
        <div>
            {/* Map Leaflet component using circuitDetail */}
            <MapContainer center={[props.circuitDetail.lat, props.circuitDetail.lng]} zoom={10} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[props.circuitDetail.lat, props.circuitDetail.lng]}>
                <Popup>
                  <div>
                    <h2>{props.circuitDetail.name}</h2>
                    <p>Location: {props.circuitDetail.location}, {props.circuitDetail.country}</p>
                    <p>Altitude: {props.circuitDetail.alt} meters</p>
                    <a href={props.circuitDetail.url} target="_blank" rel="noopener noreferrer">More Info</a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CircuitDetailModal;