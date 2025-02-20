import { inject, injectable } from "inversify";
import axios from "axios";

@injectable()
class MapService {

  constructor() {}

  public async getLatLonAndPlaceNameFromGoogleMapsShortUrl(shortUrl: string): Promise<{ lat: number, lon: number, restaurantName: string } | null> {
    try {
      // 📌 Google Maps の短縮 URL を取得し、リダイレクト先の URL を取得
      const response = await axios.get(shortUrl, { maxRedirects: 0, validateStatus: status => status >= 300 && status < 400 });
      const redirectUrl = response.headers.location;

      if (!redirectUrl) {
        console.error("Failed to retrieve redirect URL");
        return null;
      }

      // 📌 `@lat,lon` の形式を抽出する正規表現
      const coordMatch = redirectUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      const nameMatch = redirectUrl.match(/\/place\/([^\/]+)/);

      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        const restaurantName = nameMatch ? decodeURIComponent(nameMatch[1]).replace(/\+/g, " ") : "";

        return { lat, lon, restaurantName };
      }

      console.error("Failed to extract coordinates from URL");
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  }

  public async getCityAndCountryFromCoordinates(lat: number, lon: number): Promise<{ city: string, country: string }> {
    try {
			const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
				params: {
					format: "json",
					lat: lat,
					lon: lon,
					"accept-language": "en" // results in English
				}
			});

			const address = response.data.address;
			return {
				city: address.city || address.town || address.village || "",
				country: address.country || ""
			};
    } catch (error) {
			console.error("Failed to fetch location data:", error);
			return { city: "", country: "" }; // 取得できなかった場合
    }
  }
}

export default MapService;