import {AxiosResponse} from "axios";

export interface PlaceData {
    // address_components: AddressComponent[];
    formatted_address: string;
    /** is a representation of the place's address in the [adr microformat](http://microformats.org/wiki/adr). */
    adr_address: string;
    /**
     * contains the following information:
     *  - `location`: contains the geocoded latitude,longitude value for this place.
     *  - `viewport`: contains the preferred viewport when displaying this place on a map as a `LatLngBounds` if it is known.
     */
    geometry: AddressGeometry;
    /**
     * contains the place's phone number in international format.
     * International format includes the country code, and is prefixed with the plus (+) sign.
     * For example, the `international_phone_number` for Google's Sydney, Australia office is `+61 2 9374 4000`.
     */

    international_phone_number: string;
    /**
     * contains the human-readable name for the returned result.
     * For establishment results, this is usually the canonicalized business name.
     */
    name: string;
    /** place opening hours. */
    opening_hours: OpeningHours;
    /**
     * is a boolean flag indicating whether the place has permanently shut down (value `true`).
     * If the place is not permanently closed, the flag is absent from the response. This field is deprecated in favor of `business_status`.
     */
    permanently_closed: boolean;
    /**
     * is a string indicating the operational status of the place, if it is a business.
     */
    business_status: string;
    /**
     * A textual identifier that uniquely identifies a place.
     * To retrieve information about the place, pass this identifier in the `placeId` field of a Places API request.
     */
    place_id: string;
    /**
     * The price level of the place, on a scale of 0 to 4.
     * The exact amount indicated by a specific value will vary from region to region.
     *
     * Price levels are interpreted as follows:
     *  - `0`: Free
     *  - `1`: Inexpensive
     *  - `2`: Moderate
     *  - `3`: Expensive
     *  - `4`: Very Expensive
     */
    price_level: number;
    /**
     * contains the URL of the official Google page for this place.
     * This will be the Google-owned page that contains the best available information about the place.
     * Applications must link to or embed this page on any screen that shows detailed results about the place to the user.
     */
    url: string;
    /**
     * lists a simplified address for the place, including the street name, street number, and locality,
     * but not the province/state, postal code, or country. For example, Google's Sydney, Australia office
     * has a `vicinity` value of `48 Pirrama Road, Pyrmont`.
     */
    vicinity: string;
    /** lists the authoritative website for this place, such as a business' homepage. */
    website: string;
}

export interface LatLngLiteral {
    lat: number;
    lng: number;
}

export interface LatLngBounds {
    northeast: LatLngLiteral;
    southwest: LatLngLiteral;
}


export interface AddressGeometry {
    /** contains the geocoded latitude, longitude value. For normal address lookups, this field is typically the most important. */
    location: LatLngLiteral;
}

export interface OpeningHoursTime {
    /** a number from 0–6, corresponding to the days of the week, starting on Sunday. For example, 2 means Tuesday. */
    day: number;
    /**
     *  may contain a time of day in 24-hour hhmm format. Values are in the range 0000–2359. The `time`
     * will be reported in the place's time zone.
     */
    time?: string;
}

export interface OpeningPeriod {
    /** contains a pair of day and time objects describing when the place opens. */
    open: OpeningHoursTime;
    /**
     * may contain a pair of day and time objects describing when the place closes.
     * **Note:** If a place is **always open**, the `close` section will be missing from the response.
     * Clients can rely on always-open being represented as an `open` period containing `day` with value 0
     * and `time` with value 0000, and no `close`.
     */
    close?: OpeningHoursTime;
}

export interface OpeningHours {
    /** is a boolean value indicating if the place is open at the current time. */
    open_now: boolean;
    /** is an array of opening periods covering seven days, starting from Sunday, in chronological order. */
    periods: OpeningPeriod[];
    /**
     * is an array of seven strings representing the formatted opening hours for each day of the week.
     * If a `language` parameter was specified in the Place Details request, the Places Service will format
     * and localize the opening hours appropriately for that language. The ordering of the elements in this array
     * depends on the `language` parameter. Some languages start the week on Monday while others start on Sunday.
     */
    weekday_text: string[];
}

export type Place = Partial<PlaceData>;

export interface PlaceDetailsResponseData {
    result: Place;
    /** contains a set of attributions about this listing which must be displayed to the user. */
    html_attributions: string[];
}

interface PlaceDetailsResponse extends AxiosResponse {
    data: PlaceDetailsResponseData;
}

export default PlaceDetailsResponse;