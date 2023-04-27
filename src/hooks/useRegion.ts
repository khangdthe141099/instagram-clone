import { useState, useEffect } from "react";

export const useRegion = () => {
  const [region, setRegion] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            const region = data.address.country;
            setRegion(region);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return { region, setRegion };
};
