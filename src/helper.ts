export interface IBrewery {
    id: string;
    name: string;
    brewery_type: string;
    street: string;
    address_2: string;
    address_3: string;
    city: string;
    state: string;
    county_province: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    website_url: string;
    updated_at: string;
    created_at: string;
}

export interface IBreweryState {
    breweries: Array<IBrewery>;
    loading: boolean;
    error: string;
    hasNextPage: boolean;
}

export interface IAction {
    type: ACTIONS;
    payload?: Partial<IBreweryState>;
}

export interface ISearchParams {
    name: string;
}

export enum ACTIONS {
    MAKE_REQUEST = 'make-request',
    GET_DATA = 'get-data',
    ERROR = 'error',
    UPDATE_HAS_NEXT_PAGE = 'update-has-next-page'
}

export const BASE_URL = 'https://api.openbrewerydb.org/breweries'
