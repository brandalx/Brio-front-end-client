import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Include Mapbox CSS

export default function MapComponent({ lng, lat, zoom, styleInsert = '' }) {
  const REACT_APP_MAPBOX_TOKEN = import.meta.env.VITE_MAPBOXTOKEN_SINGLE;
  const [defaultstyle, setDefaultStyle] = useState(true);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (styleInsert.minHeight) {
      setDefaultStyle(true);
    } else {
      setDefaultStyle(false);
    }
    // Create map instance
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/brndalx/clhqf89uu01qw01qtgolm9av9',
      center: [lng, lat],
      zoom: zoom,
      accessToken: REACT_APP_MAPBOX_TOKEN
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Add marker to map
    new mapboxgl.Marker({ color: '#4E60FF' }).setLngLat([lng, lat]).addTo(map);
    console.log(styleInsert);
    // Clean up on unmount
    return () => map.remove();
  }, [lng, lat, zoom]); // Only rerun the effect if lng, lat or zoom changes

  return (
    <div
      className='map-container'
      ref={mapContainerRef}
      style={defaultstyle ? { ...styleInsert } : { height: '500px' }}
    />
  );
}
