import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    CREATE_WORK_ORDER,
    FETCH_ACTIVE_CONTRACTS_REQUEST,
    FETCH_ALL_COMPANY_REQUEST,
    FETCH_COUNTRIES,
    FETCH_COUNTRYUI,
    createWorkOrderError,
    createWorkOrderSuccess,
    fetchActiveContractsError,
    fetchActiveContractsSuccess,
    fetchAllCompanyFailure,
    fetchAllCompanySuccess,
    fetchCountriesError,
    fetchCountriesSuccess,
    fetchCountryUiError,
    fetchCountryUiSuccess,
} from '../actions/workOrderActions';

function* fetchAllCompanies(action) {
    try {
        const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization');
        yield put(fetchAllCompanySuccess(response.data.content));
    } catch (error) {
        yield put(fetchAllCompanyFailure(error));
    }
}

function* fetchActiveContracts(action) {
    try {
        const { id } = action.payload;
        const response = yield call(
            axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contracts?organizationId=${id}`
        );
        yield put(fetchActiveContractsSuccess(response.data));
    } catch (error) {
        yield put(fetchActiveContractsError(error));
    }
}
// http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/contractworkorder
// function* fetchActiveContracts(action) {
//     try {
//         const response = yield call(axios.get, 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/activecontracts');
//         yield put(fetchActiveContractsSuccess(response.data));
//     } catch (error) {
//         yield put(fetchActiveContractsError(error));
//     }
// }

function* createWorkOrder(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/contractworkorder',data1
        );
        yield put(createWorkOrderSuccess(response.data));
    } catch (error) {
        yield put(createWorkOrderError(error));
    }
}
function* fetchCountries(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/country'
        );
        yield put(fetchCountriesSuccess(response.data));
    } catch (error) {
        yield put(fetchCountriesError(error));
    }
}

function* fetchCountryUi(action) {
    try {
        const { code } = action.payload;
        const response = yield call(
            axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/addressformat/${code}`
        );
        yield put(fetchCountryUiSuccess(response.data));
    } catch (error) {
        yield put(fetchCountryUiError(error));
    }
}

function* workOrderSaga() {
    yield takeLatest(FETCH_ALL_COMPANY_REQUEST, fetchAllCompanies);
    yield takeLatest(FETCH_ACTIVE_CONTRACTS_REQUEST, fetchActiveContracts);
    yield takeLatest(FETCH_COUNTRIES, fetchCountries);
    yield takeLatest(FETCH_COUNTRYUI, fetchCountryUi);
    yield takeLatest(CREATE_WORK_ORDER, createWorkOrder);
}

export default workOrderSaga;
