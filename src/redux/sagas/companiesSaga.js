// companiesSaga.jsx
import axios from 'axios';
import { getAPIUrl } from '../../utils/config';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    CREATE_COMPANY_REQUEST,
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    UPDATE_COMPANY_REQUEST,
    createCompanyFailure,
    createCompanySuccess,
    fetchCompaniesFailure,
    fetchCompaniesRequest,
    fetchCompaniesSuccess,
    fetchCompanyFailure,
    fetchCompanySuccess,
    // paginationhCompanyRequest,
    updateCompanyFailure,
    updateCompanySuccess,
    FETCH_COUNTRIES_REQUEST,
    FETCH_TAX_CLASSIFICATIONS_REQUEST,
    setCountries,
    setTaxClassifications,
    CHECK_DOMAIN_REQUEST,
    checkDomainSuccess,
    checkDomainFailure,
    fetchOrganizationCountSuccess,
    fetchOrganizationCountFailure,
    FETCH_ORGANIZATION_COUNT_REQUEST,
    changeOrganizationStatusSuccess,
    changeOrganizationStatusFailure,
    CHANGE_ORGANIZATION_STATUS_REQUEST,
    fetchInactiveStatusCodesSuccess,
    fetchInactiveStatusCodesFailure,
    FETCH_INACTIVE_STATUS_CODES_REQUEST,
} from '../actions/companiesActions';
// getAPIUrl =  'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api'

function* fetchCompanies(action) {
    try {
        const { status, offset, limit } = action.payload || {};
        const apiUrl = getAPIUrl() + `/raves/v1/organization?offset=${offset || 0}&limit=${limit || 100}&status=${status || ''}`;
        const response = yield call(axios.get, apiUrl);
        yield put(fetchCompaniesSuccess(response));
    } catch (error) {
        yield put(fetchCompaniesFailure(error.message));
    }
}

function* fetchCompany(action) {
    try {
        const { payload: organizationID } = action;
        const response = yield call(axios.get, getAPIUrl() + `/raves/v1/organization/${organizationID}`);
        yield put(fetchCompanySuccess(response.data));
    } catch (error) {
        yield put(fetchCompanyFailure(error.message));
    }
}

// function* createCompany(action) {
//     try {
//         const { data } = action.payload;
//         const response = yield call(axios.post, getAPIUrl() + '/raves/v1/organization', data);
//         if (response.status === 200) {
//             yield put(createCompanySuccess());
//             yield put(fetchCompaniesRequest());
//             // yield put(paginationhCompanyRequest());
//         } else {
//             // yield put(createCompanyFailure(response.statusText));
//             const errorMessage = response.data?.lrapierror?.message || 'Failed to create company';
//             yield put(createCompanyFailure(errorMessage));

//         }
//     } catch (error) {
//         // yield put(createCompanyFailure(error.message));
//         const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to create company';
//         yield put(createCompanyFailure(errorMessage));
//     }
// }

function* createCompany(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(axios.post, getAPIUrl() + '/raves/v1/organization', data1);
        yield put(createCompanySuccess(response.data.organizationID));
        yield put(fetchCompaniesRequest());
    } catch (error) {
        yield put(createCompanyFailure(error.response.data.lrapierror.message));
    }
}

function* updateCompany(action) {
    try {
        const { organizationID, data } = action.payload;
        const response = yield call(axios.patch, getAPIUrl() + `/raves/v1/organization/${organizationID}`, data);
        if (response.status === 200) {
            yield put(updateCompanySuccess(response.data));
            // yield put(fetchCompaniesRequest());
        } else {
            const errorMessage = response.data?.lrapierror?.message || 'Failed to update company';
            yield put(updateCompanyFailure(errorMessage));
        }

    } catch (error) {
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to update company';
        yield put(updateCompanyFailure(errorMessage));
    }
} 

function* fetchCountries() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/reference/v1/country');
        yield put(setCountries(response.data));
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

function* fetchTaxClassifications(action) {
    const { payload: countryCode } = action;
    try {
        const response = yield call(axios.get, getAPIUrl() + `/raves/reference/v1/taxclassification?countryCode=${countryCode}`);
        yield put(setTaxClassifications(response.data));
    } catch (error) {
        console.error('Error fetching tax classification data:', error);
    }
}

function* checkDomain(action) {
    try {
        const { payload: domain } = action;
        const response = yield call(axios.get,
            getAPIUrl() + `/raves/reference/v1/organization/domainmapped?domain=${domain}`
        );
        yield put(checkDomainSuccess(response.data));
    } catch (error) {
        yield put(checkDomainFailure(error.message));
    }
}

function* fetchOrganizationCount() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/organization/count');
        yield put(fetchOrganizationCountSuccess(response.data));
    } catch (error) {
        yield put(fetchOrganizationCountFailure(error.message));
    }
}


function* changeOrganizationStatus(action) {
    try {
        const { organizationID, statusCode, inactiveStatusCode } = action.payload;
        const apiUrl = getAPIUrl() + `/raves/v1/organization/status/${organizationID}`;
        let requestBody;

        // Check if inactiveStatusCode is an array
        if (Array.isArray(inactiveStatusCode)) {
            requestBody = {
                statusCode,
                inactiveStatusCode,
            };
        } else {
            // If not an array, set it as an empty array
            requestBody = {
                statusCode,
                // inactiveStatusCode: [],
            };
        }

        const response = yield call(axios.post, apiUrl, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
            yield put(changeOrganizationStatusSuccess(response.data));
            // Optionally dispatch additional actions or update the store state as needed
        } else {
            const errorMessage = response.data?.lrapierror?.message || 'Failed to change organization status';
            yield put(changeOrganizationStatusFailure(errorMessage));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to change organization status';
        yield put(changeOrganizationStatusFailure(errorMessage));
    }
}


function* fetchInactiveStatusCodesSaga() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/reference/v1/organization/inactivestatuscodes');
        yield put(fetchInactiveStatusCodesSuccess(response.data));
    } catch (error) {
        yield put(fetchInactiveStatusCodesFailure(error));
    }
}

function* companiesSaga() {
    yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompanies);
    yield takeLatest(CREATE_COMPANY_REQUEST, createCompany);
    yield takeLatest(UPDATE_COMPANY_REQUEST, updateCompany);
    yield takeLatest(FETCH_COMPANY_REQUEST, fetchCompany);
    // yield takeLatest(PAGINATION_COMPANY_REQUEST, paginationCompanies);
    yield takeLatest(FETCH_COUNTRIES_REQUEST, fetchCountries);
    yield takeLatest(FETCH_TAX_CLASSIFICATIONS_REQUEST, fetchTaxClassifications);
    yield takeLatest(CHECK_DOMAIN_REQUEST, checkDomain);
    yield takeLatest(FETCH_ORGANIZATION_COUNT_REQUEST, fetchOrganizationCount);

    yield takeLatest(CHANGE_ORGANIZATION_STATUS_REQUEST, changeOrganizationStatus);
    yield takeLatest(FETCH_INACTIVE_STATUS_CODES_REQUEST, fetchInactiveStatusCodesSaga)
}

export default companiesSaga;
