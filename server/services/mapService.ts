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
      let redirectUrl: string;
      // 📌 Retrieve the Google Maps shortened URL and get the redirected URL
      if (!shortUrl.includes(".com")) {
        const response = await axios.get(shortUrl, {
          maxRedirects: 0,
          validateStatus: (status) => status >= 300 && status < 400,
        });
        redirectUrl = response.headers.location;
        if (!redirectUrl) {
          console.error("Failed to retrieve redirect URL");
          return null;
        }
        console.log("redirectUrl", redirectUrl);
      } else {
        redirectUrl = shortUrl;
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

  // ある程度の範囲内と名前で検索
  public async searchPlaceWithNameAndLocation(lat: number, lon: number, name: string, apiKey: string) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: `${name}`,
            location: `${lat},${lon}`,
            radius: 1000, // 検索半径（メートル単位）
            key: apiKey,
          },
        }
      );
      if (response.data.status === "OK" && response.data.results.length > 0) {
        const place = response.data.results[0];
        return place;
      } else {
        console.log("No matching locations were found");
        return null;
      }
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  }

  // PlaceIDから情報を取得
  public async getInfosFromPlaceID(
    placeInfo: any,
    apiKey: string,
  ): Promise<string | null> {
    try {

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${placeInfo.geometry.location.lat},${placeInfo.geometry.location.lng}`,
            key: apiKey,
          },
        },
      );
      

      if (response.data.status === "OK" && response.data.results.length > 0) {
        return response.data.results[0].formatted_address;
      } else {
        console.error("Failed to fetch address from Google Maps API");
        return null;
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  }
  

  public async getPlaceInfoFromURL(url: string, apiKey: string): Promise<any> {
    try {
      const abstract_data = await this.getLatLonAndPlaceNameFromGoogleMapsShortUrl(url);
      if (!abstract_data) {
        console.error('Failed to fetch coordinates');
        return null;
      }
      // console.log('------------------------------------------------');
      // console.log('URLから抽出したデータ',abstract_data);
      // console.log(`https://www.google.com/maps/search/?api=1&query=${abstract_data.lat},${abstract_data.lon}`);
      
      const search_result = await this.searchPlaceWithNameAndLocation(abstract_data.lat, abstract_data.lon, abstract_data.restaurantName, apiKey);
      // console.log('------------------------------------------------');
      // console.log('予測されたデータ',search_result.geometry.location.lat, search_result.geometry.location.lng, search_result.name, search_result.formatted_address, search_result.place_id);

      const response = await this.getInfosFromPlaceID(search_result, apiKey);
      // console.log('------------------------------------------------');
      // console.log('詳細情報',response);
      // console.log(`https://www.google.com/maps/place/?q=place_id:${search_result.place_id}`)
      console.log(`https://www.google.com/maps/search/?api=1&query=${search_result.geometry.location.lat},${search_result.geometry.location.lng}`);
      return {lat: search_result.geometry.location.lat,
              lon: search_result.geometry.location.lng,
              name: search_result.name,
              placeId: search_result.place_id,
            };

    } catch (error) {
      console.error('Failed to retrieve information:', (error as Error).message);
      return null;
    }
  }



}

export default MapService;
