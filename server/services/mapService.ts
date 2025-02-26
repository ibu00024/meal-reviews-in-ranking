import { inject, injectable } from "inversify";
import axios from "axios";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import RestaurantRepository from "../repositories/restaurantRepository";
import MapRepository from "../repositories/mapRepository";

@injectable()
class MapService {
  private mapRepository: MapRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.MAP_REPOSITORY)
    mapRepository: MapRepository,
  ) {
    this.mapRepository = mapRepository;
  }

  public getFTIDFromUrl(url: string) {
    const pattern = /(0x[0-9a-fA-F]+:0x[0-9a-fA-F]+)/g;
    const match = [...url.matchAll(pattern)];
    if (!match || match.length === 0) {
      throw new Error("Cannot extract place id from url");
    }
    return match;
  }

  public async getPlaceDetails(url: string) {
    const longUrl = await this.mapRepository.getLongUrl(url);
    const possiblePlaceIds = this.getFTIDFromUrl(longUrl);
    for (const placeId of possiblePlaceIds) {
      const result = await this.mapRepository.getPlaceDetails(placeId[0]);
      if (result.name != '1') {
        return result;
      }
    }
    throw new Error("Could not find place details");
  }
}

export default MapService;
