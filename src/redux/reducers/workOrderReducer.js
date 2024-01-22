import {
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    FETCH_ACTIVE_CONTRACTS_SUCCESS,
    FETCH_ACTIVE_CONTRACTS_ERROR,
    STORE_WORK_LOCATION_DATA,
    FETCH_COUNTRIES,
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_ERROR,
    FETCH_COUNTRYUI,
    RESET_COUNTRYUI,
    FETCH_COUNTRYUI_SUCCESS,
    FETCH_COUNTRYUI_ERROR,
    FETCH_ALL_COMPANY_REQUEST,
    FETCH_ALL_COMPANY_SUCCESS,
    FETCH_ALL_COMPANY_FAILURE,
    CREATE_WORK_ORDER,
    CREATE_WORK_ORDER_SUCCESS,
    CREATE_WORK_ORDER_ERROR,
} from '../actions/workOrderActions';

const initialState = {
    loading: false,
    error: null,
    success: false,
    activeContracts: [],
    workLocations: [],
    countries: [],
    countryUi: [],
    allCompanies: [],
    workorderSuccess:null
};

const workOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_CONTRACTS_REQUEST:
        case FETCH_COUNTRIES:
        case FETCH_COUNTRYUI:
        case FETCH_ALL_COMPANY_REQUEST:
        case CREATE_WORK_ORDER:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ACTIVE_CONTRACTS_ERROR:
        case FETCH_COUNTRIES_ERROR:
        case FETCH_COUNTRYUI_ERROR:
        case FETCH_ALL_COMPANY_FAILURE:
        case CREATE_WORK_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_ACTIVE_CONTRACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                activeContracts: action.payload,
            };

        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                countries: action.payload,
            };
        case FETCH_COUNTRYUI_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                countryUi: action.payload,
            };
        case FETCH_ALL_COMPANY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                allCompanies: action.payload,
            };
        case RESET_COUNTRYUI:
            return {
                ...state,
                loading: false,
                success: true,
                countryUi: action.payload,
            };
        case CREATE_WORK_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                workorderSuccess: action.payload,
            };
        case STORE_WORK_LOCATION_DATA:
            return {
                ...state,
                loading: false,
                workLocations: action.payload,
            };

        default:
            return state;
    }
};

export default workOrderReducer;
