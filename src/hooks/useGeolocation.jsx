import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useGeolocation() {
  const VITE_IPAPI = import.meta.env.VITE_IPAPI;
  const [city, setCity] = useState(null);
  const [update, setUpdate] = useState(0);
  const [isTrue, setIsTrue] = useState(false);
  const [times, setTimes] = useState(0);
  useEffect(() => {
    if (times >= 3) {
      setIsTrue(false);
      setCity(null);
    }
  }, []);

  useEffect(() => {
    // Fallback to IP-based location
    const fetchIPLocation = async () => {
      try {
        const response = await axios.get(`https://api.ipapi.com/check?access_key=${VITE_IPAPI}`);
        setCity(response.data.city);
      } catch (error) {
        console.error('Error fetching IP location: ', error);
      }
    };

    // Try to get geolocation
    if (navigator.geolocation && times < 3) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const response = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          setCity(response.data.locality);
        },
        (error) => {
          // If user declines to share location, get location based on IP
          console.log('Geolocation permission denied, falling back to IP-based location');
          fetchIPLocation();
          setTimes(times + 1);
        }
      );
    } else if (times < 3) {
      // If geolocation is not supported by the browser, get location based on IP
      console.log('Geolocation not available, falling back to IP-based location');
      fetchIPLocation();
    } else {
      console.log('Geolocation denided');
    }
  }, [update]);

  return { city, setCity, update, setUpdate, isTrue, setIsTrue };
}
