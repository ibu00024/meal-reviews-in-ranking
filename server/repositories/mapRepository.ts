import axios from "axios";
import ApiKeyConfig from "../config/api_key_config";
import {inject, injectable} from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import Config from "../config/config";
import PlaceDetailsResponse, {PlaceDetailsResponseData} from "../models/place_details_response";

@injectable()
class MapRepository {

    private apiKeyConfig: ApiKeyConfig;

    constructor(
        @inject(SERVICE_IDENTIFIER.CONFIG)
        config: Config
    ) {
        this.apiKeyConfig = config.apiKeyConfig;
    }

    public async getLongUrl(shortUrl: string) {
        const response = await axios.get(shortUrl, {
            maxRedirects: 0,
            validateStatus: (status) => status >= 300 && status < 400,
        });
        const redirectUrl: string = response.headers.location;

        if (!redirectUrl) {
            throw new Error("Failed to retrieve redirect URL");
        }
        return redirectUrl;
    }

    public async getPlaceDetails(ft_id: string) {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${this.apiKeyConfig.GOOGLE_MAPS_API_KEY}&ftid=${ft_id}`;
        const response = await axios.get(url) as PlaceDetailsResponse;
        if (response.status === 200) {
            return response.data.result;
        } else {
            throw new Error('Google Maps API error:' + response.status);
        }
    }
}

export default MapRepository;