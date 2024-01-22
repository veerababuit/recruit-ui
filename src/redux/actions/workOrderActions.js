// import { Code } from 'quill';

export const FETCH_ACTIVE_CONTRACTS_REQUEST = 'FETCH_ACTIVE_CONTRACTS_REQUEST';
export const FETCH_ACTIVE_CONTRACTS_SUCCESS = 'FETCH_ACTIVE_CONTRACTS_SUCCESS';
export const FETCH_ACTIVE_CONTRACTS_ERROR = 'FETCH_ACTIVE_CONTRACTS_ERROR';
export const FETCH_COUNTRIES = 'FETCH_COUNTRIES';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_ERROR = 'FETCH_COUNTRIES_ERROR';
export const FETCH_COUNTRYUI = 'FETCH_COUNTRYUI';
export const RESET_COUNTRYUI = 'RESET_COUNTRYUI';
export const FETCH_COUNTRYUI_SUCCESS = 'FETCH_COUNTRYUI_SUCCESS';
export const FETCH_COUNTRYUI_ERROR = 'FETCH_COUNTRYUI_ERROR';
export const FETCH_ALL_COMPANY_REQUEST = 'FETCH_ALL_COMPANY_REQUEST';
export const FETCH_ALL_COMPANY_SUCCESS = 'FETCH_ALL_COMPANY_SUCCESS';
export const FETCH_ALL_COMPANY_FAILURE = 'FETCH_ALL_COMPANY_FAILURE';
export const CREATE_WORK_ORDER = 'CREATE_WORK_ORDER';
export const CREATE_WORK_ORDER_SUCCESS = 'CREATE_WORK_ORDER_SUCCESS';
export const CREATE_WORK_ORDER_ERROR = 'CREATE_WORK_ORDER_ERROR';

export const fetchAllCompanyRequest = () => ({
    type: FETCH_ALL_COMPANY_REQUEST,
});

export const fetchAllCompanySuccess = (data) => ({
    type: FETCH_ALL_COMPANY_SUCCESS,
    payload: data,
});

export const fetchAllCompanyFailure = (error) => ({
    type: FETCH_ALL_COMPANY_FAILURE,
    payload: error,
});

export const fetchActiveContracts = (id) => ({
    type: FETCH_ACTIVE_CONTRACTS_REQUEST,
    payload: id,
});

export const fetchActiveContractsSuccess = (data) => ({
    type: FETCH_ACTIVE_CONTRACTS_SUCCESS,
    payload: data,
});

export const fetchActiveContractsError = (err) => ({
    type: FETCH_ACTIVE_CONTRACTS_ERROR,
    payload: err,
});

export const fetchCountries = () => ({
    type: FETCH_COUNTRIES,
});

export const fetchCountriesSuccess = (data) => ({
    type: FETCH_COUNTRIES_SUCCESS,
    payload: data,
});

export const fetchCountriesError = (err) => ({
    type: FETCH_COUNTRIES_ERROR,
    payload: err,
});

export const fetchCountryUi = (code) => ({
    type: FETCH_COUNTRYUI,
    payload: code,
});

export const resetCountryUi = (clear) => ({
    type: RESET_COUNTRYUI,
    payload: clear,
});

export const fetchCountryUiSuccess = (data) => ({
    type: FETCH_COUNTRYUI_SUCCESS,
    payload: data,
});

export const fetchCountryUiError = (err) => ({
    type: FETCH_COUNTRYUI_ERROR,
    payload: err,
});

export const createWorkOrder = (data1) => ({
    type: CREATE_WORK_ORDER,
    payload: data1,
});

export const createWorkOrderSuccess = (data) => ({
    type: CREATE_WORK_ORDER_SUCCESS,
    payload: data,
});

export const createWorkOrderError = (err) => ({
    type: CREATE_WORK_ORDER_ERROR,
    payload: err,
});

export const STORE_WORK_LOCATION_DATA = 'STORE_WORK_LOCATION_DATA';

export const storeWorkLocation = (location) => ({
    type: STORE_WORK_LOCATION_DATA,
    payload: location,
});
