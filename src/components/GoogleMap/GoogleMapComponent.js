//Other
import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 42.136,
  lng: 24.742,
};

const boundsCord = {
  lat: 42.13,
  lng: 24.74,
};

function GoogleMapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC9mUfnBDqsPPzx4H3AouEVvLmsvh8caVg',
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(boundsCord, center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}>
      <Marker
        position={new window.google.maps.LatLng(center.lat, center.lng)}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default GoogleMapComponent;
