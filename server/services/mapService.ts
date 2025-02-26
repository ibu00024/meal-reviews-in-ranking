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
    const pattern = /(0x[0-9a-fA-F]+:0x[0-9a-fA-F]+)/;
    const match = url.match(pattern);
    if (!match || match.length === 0) {
      throw new Error("Cannot extract place id from url");
    }
    return match[1];
  }

  public async getPlaceDetails(url: string) {
    const longUrl = await this.mapRepository.getLongUrl(url)
    const placeId = this.getFTIDFromUrl(longUrl);
    return this.mapRepository.getPlaceDetails(placeId);
  }
}

export default MapService;
