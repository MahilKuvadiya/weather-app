'use client';

import { useRef, useEffect, useState } from 'react';
import { WeatherSlider } from '@/components/wether-component';
import { Search } from '@/components/search'

export const TomTomMap = () => {
  const mapElement = useRef();
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(21.23109640716349);
  const [longitude, setLongitude] = useState(72.81864357229097);

  useEffect(() => {
    const buildMap = (tt) => {
      const mapInstance = tt.map({
        key: '2bkK3wXqnBvlGCpuSyKv4r2uD1se4A87',
        container: mapElement.current,
        center: [longitude, latitude],
        zoom: 17,
        stylesVisibility: {
          trafficIncidents: true,
          trafficFlow: true,
        },
      });
      setMap(mapInstance);
      console.log('mapLanguage:', mapInstance.getLanguage());

      mapInstance.addControl(new tt.NavigationControl());

      // Get lat and long from map click
      mapInstance.on('click', (event) => {
        console.log('event.latlng:', event);
        setLatitude(event.lngLat.lat);
        setLongitude(event.lngLat.lng);
        alert(`lat: ${event.lngLat.lat} long: ${event.lngLat.lng}`);
      });

      return () => mapInstance.remove();
    };

    const initTomTom = async () => {
      const tt = await import('@tomtom-international/web-sdk-maps');
      buildMap(tt);
    };

    initTomTom();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [longitude, latitude]); // Depend on longitude and latitude to recreate the map

  useEffect(() => {
    if (map) {
      map.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude, map]);

  const handleSelectLocation = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  return (
    <div>
      <span>the map</span>
      <div className="border w-screen h-screen" id="theMap" ref={mapElement} />
      <div className="absolute top-4 left-4 z-10">
        <Search onSelectLocation={handleSelectLocation} />
      </div>
      {latitude && longitude && (
        <WeatherSlider latitude={latitude} longitude={longitude} />
      )}
    </div>
  );
};