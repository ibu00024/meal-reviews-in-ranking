import { inject, injectable } from "inversify";
import axios from "axios";

@injectable()
class MapService {
  constructor() {}

  // 📌 Get the latitude and longitude and RestaurantName from the Google Maps shortened URL
  public async getLatLonAndPlaceNameFromGoogleMapsShortUrl(
    shortUrl: string,
  ): Promise<{ lat: number; lon: number; restaurantName: string } | null> {
    try {
      // 📌 Retrieve the Google Maps shortened URL and get the redirected URL
      const response = await axios.get(shortUrl, {
        maxRedirects: 0,
        validateStatus: (status) => status >= 300 && status < 400,
      });
      const redirectUrl = response.headers.location;

      if (!redirectUrl) {
        console.error("Failed to retrieve redirect URL");
        return null;
      }

      // 📌 Regular expression to extract the `@lat,lon` format
      const coordMatch = redirectUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      // 📌 Regular expression to extract the restaurantName format
      const nameMatch = redirectUrl.match(/\/place\/([^\/]+)/);

      // 📌 Extract the latitude and longitude from the URL and return Restaurant Infos
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        const restaurantName = nameMatch
          ? decodeURIComponent(nameMatch[1]).replace(/\+/g, " ")
          : "";

        return { lat, lon, restaurantName };
      }

      console.error("Failed to extract coordinates from URL");
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  // 📌 Get the city and country from the coordinates using OpenStreetMap (Nominatim API)
  public async getCityAndCountryFromCoordinates(
    lat: number,
    lon: number,
  ): Promise<{ city: string; country: string }> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            format: "json",
            lat: lat,
            lon: lon,
            "accept-language": "en", // results in English
          },
        },
      );

      const address = response.data.address;
      return {
        city: address.city || address.town || address.village || "",
        country: address.country || "",
      };
    } catch (error) {
      console.error("Failed to fetch location data:", error);
      return { city: "", country: "" }; // 取得できなかった場合
    }
  }
}

export default MapService;
