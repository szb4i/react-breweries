import { useEffect, useReducer } from "react";
import axios from 'axios';
import { ACTIONS, BASE_URL, IAction, IBreweryState, ISearchParams } from "./helper";

const breweryReducer = (state: Partial<IBreweryState>, action: IAction) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { ...state, loading: true, breweries: [] };
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, breweries: action.payload?.breweries };
        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload?.error, breweries: [] };
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload?.hasNextPage };
        default:
            return state;
    }
}

const useFetchBreweries = (searchParams: ISearchParams, page: number): IBreweryState => {
    const [state, dispatch] = useReducer(breweryReducer, { breweries: [], loading: true, error: '', hasNextPage: false });

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, { 
            cancelToken: cancelToken1.token,
            params: { page: page, per_page: 10, by_name: searchParams.name }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { breweries: res.data } });
        }).catch(e => {
            if (axios.isCancel(e)) {
                return;
            }
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

        const cancelToken2 = axios.CancelToken.source();
        axios.get(BASE_URL, { 
            cancelToken: cancelToken2.token,
            params: { page: page + 1, per_page: 10, by_name: searchParams.name }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: 0 !== res.data.length } });
        }).catch(e => {
            if (axios.isCancel(e)) {
                return;
            }
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
        });

        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        };
    }, [searchParams, page]);

    return state as IBreweryState;
}

export default useFetchBreweries