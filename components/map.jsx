"use client";

import { useRef, useEffect, useState } from "react";
import { WeatherSlider } from "@/components/wether-component";
import { Search } from "@/components/search";

export const TomTomMap = () => {
  const mapElement = useRef(null);
  const mapInitialized = useRef(false); // Add this ref to track initialization
  const [map, setMap] = useState(null);
  const [latitude, setLatitude] = useState(21.23109640716349);
  const [longitude, setLongitude] = useState(72.81864357229097);

  useEffect(() => {
    const initTomTom = async () => {
      if (mapInitialized.current) {
        return;
      }
      const tt = await import("@tomtom-international/web-sdk-maps");
      const mapInstance = tt.map({
        key: "2bkK3wXqnBvlGCpuSyKv4r2uD1se4A87",
        container: mapElement.current,
        center: [longitude, latitude],
        zoom: 17,
        stylesVisibility: {
          trafficIncidents: true,
          trafficFlow: true,
        },
      });
      setMap(mapInstance);
      mapInitialized.current = true; // Mark as initialized

      mapInstance.addControl(new tt.NavigationControl());

      return () => {
        mapInstance.remove();
      };
    };

    initTomTom();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    if (map) {
      map.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude, map]);

  useEffect(() => {
    if (map) {
      const handleClick = (event) => {
        setLatitude(event.lngLat.lat);
        setLongitude(event.lngLat.lng);
        alert(`lat: ${event.lngLat.lat} long: ${event.lngLat.lng}`);
      };

      map.on("click", handleClick);

      return () => {
        map.off("click", handleClick);
      };
    }
  }, [map]);

  const handleSelectLocation = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 w-full h-full" id="theMap" ref={mapElement} />
      <div className="absolute top-0 z-10 w-full">
        <Search onSelectLocation={handleSelectLocation} />
      </div>
      {latitude && longitude && (
        <div className="absolute bottom-2 right-2">
          <WeatherSlider latitude={latitude} longitude={longitude} />
        </div>
      )}
    </div>
  );
};
