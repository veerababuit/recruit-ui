// resourcesSaga.js
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchResourceFailure,
    fetchResourceSuccess,
    FETCH_RESOURCE_REQUEST,
    CREATE_RESOURCE_REQUEST,
    createResourceSuccess,
    createResourceFailure,
    fetchResourceRequest,
    fetchResourceByIdSuccess,
    fetchResourceByIdFailure,
    updateResourceSuccess,
    updateResourceFailure,
    UPDATE_RESOURCE_REQUEST,
    FETCH_RESOURCE_BY_ID_REQUEST,
    PAGINATION_RESOURCE_REQUEST,
    paginationResourceSuccess,
    paginationResourceFailure,
    paginationhResourceRequest,
    fetchRelationshipSuccess,
    fetchRelationshipFailure,
    FETCH_RELATIONSHIP_REQUEST,
    // fetchResourceByIdRequest,

} from '../actions/resourceActions';
import { getAPIUrl } from '../../utils/config';

function* fetchResources() {
    try {
        // console.log('******* Fetching the data *********');
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/worker?offset=0&limit=100');
        // console.log(response.data.content);
        yield put(fetchResourceSuccess(response.data.content));
    } catch (error) {
        yield put(fetchResourceFailure(error.message));
    }
}
function* paginationResources() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/worker?offset=0&limit=100');
        // console.log("All Resources", response.data);
        yield put(paginationResourceSuccess(response.data));
    } catch (error) {
        yield put(paginationResourceFailure(error.message));
    }
}

function* fetchResourceById(action) {
    try {
        const { payload: workerID } = action;
        const response = yield call(axios.get, getAPIUrl() + `/raves/v1/worker/${workerID}`);
        console.log("FetchResourceById", response.data)
        yield put(fetchResourceByIdSuccess(response.data));
    } catch (error) {
        yield put(fetchResourceByIdFailure(error.message));
    }
}

function* createResource(action) {
    try {
        const { formData } = action.payload;
        const response = yield call(axios.post, getAPIUrl() + '/raves/v1/worker', formData);

        if (response.status === 200) {
            yield put(createResourceSuccess());
            yield put(fetchResourceRequest());
            yield put(paginationhResourceRequest());
        } else {
            yield put(createResourceFailure(response.statusText));
        }
    } catch (error) {
        yield put(createResourceFailure(error.message));
    }
}

function* updateResource(action) {
    try {
        const { workerID, data } = action.payload;
        const response = yield call(axios.patch, getAPIUrl() + `/raves/v1/worker/${workerID}`, data)
        if (response.status === 200) {
            yield put(updateResourceSuccess(response.data));
            // yield put(fetchResourceRequest());
            // yield put(fetchResourceByIdRequest());
        } else {
            const errorMessage = response.data?.lrapierror?.message || 'Failed to update resource';
            yield put(updateResourceFailure(errorMessage));
        }

    } catch (error) {
        const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to update resource';
        yield put(updateResourceFailure(errorMessage));
    }
}




function* fetchRelationships() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/reference/v1/relationships');
        yield put(fetchRelationshipSuccess(response.data));
    } catch (error) {
        yield put(fetchRelationshipFailure(error.message));
    }
}



function* resourcesSaga() {
    yield takeLatest(FETCH_RESOURCE_REQUEST, fetchResources);
    yield takeLatest(CREATE_RESOURCE_REQUEST, createResource);
    yield takeLatest(UPDATE_RESOURCE_REQUEST, updateResource);
    yield takeLatest(FETCH_RESOURCE_BY_ID_REQUEST, fetchResourceById);
    yield takeLatest(PAGINATION_RESOURCE_REQUEST, paginationResources);
    yield takeLatest(FETCH_RELATIONSHIP_REQUEST, fetchRelationships);

}

export default resourcesSaga;
