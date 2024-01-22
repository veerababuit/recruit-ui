// referenceDataSaga.jsx
import axios from 'axios';
import { getAPIUrl } from '../../utils/config';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_ORGANIZATION_DOCUMENT_REQUEST,
    FETCH_WORKER_ATTRIBUTE_REQUEST,
    FETCH_WORKER_TYPES_REQUEST,
    fetchOrganizationDocumentFailure,
    fetchOrganizationDocumentSuccess,
    fetchWorkerAttributeFailure,
    fetchWorkerAttributeSuccess,
    fetchWorkerTypesFailure,
    fetchWorkerTypesSuccess,
} from '../actions/referenceDataActions';

// getAPIUrl = http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api

function* fetchWorkerTypes() {
    try {
        const response = yield call(
            axios.get, getAPIUrl() + '/raves/reference/v1/workerType'
        );
        yield put(fetchWorkerTypesSuccess(response.data));
    } catch (error) {
        yield put(fetchWorkerTypesFailure(error.message));
    }
}

function* fetchWorkerAttributes() {
    try {
        const response = yield call(
            axios.get, getAPIUrl() + '/workerattr/v1/workerattrdef?status=ACTIVE'
        );
        yield put(fetchWorkerAttributeSuccess(response.data));
    } catch (error) {
        yield put(fetchWorkerAttributeFailure(error));
    }
}

// get all organization documents 
function* fetchAllOrganizationDocument() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/docdef?relatedEntity=ORGANIZATION');
        yield put(fetchOrganizationDocumentSuccess(response));
    } catch (error) {
        yield put(fetchOrganizationDocumentFailure(error.message));
    }
}

function* referenceDataSaga() {
    yield takeLatest(FETCH_WORKER_TYPES_REQUEST, fetchWorkerTypes);
    yield takeLatest(FETCH_WORKER_ATTRIBUTE_REQUEST, fetchWorkerAttributes);
    yield takeLatest(FETCH_ORGANIZATION_DOCUMENT_REQUEST, fetchAllOrganizationDocument);
}

export default referenceDataSaga;

