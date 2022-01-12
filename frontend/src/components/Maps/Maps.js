import React from 'react';
import { GoogleMap, Circle, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '45rem',
};

const options = {
  strokeColor: '#ADD8E6',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#ADD8E6',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  zIndex: 1
}

const Maps = ({ apiKey, center }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Circle center={center} radius={7000} options={options}/>
        </GoogleMap>
      )}
    </>
  )
};

export default React.memo(Maps);