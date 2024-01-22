import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_MONTHLY_CYCLE,
    FETCH_WEEKLY_CYCLE,
    Fetch_WORKER_ATTR,
    MONTHLY_CYCLE_REQUEST,
    MonthlyCycleError,
    MonthlyCycleSuccess,
    STATUS_WORKER_ATTR,
    UPDATE_WORKER_ATTR,
    WEEKLY_CYCLE_REQUEST,
    WORKER_ATTR_REQUEST,
    WeeklyCycleError,
    WeeklyCycleSuccess,
    fetchWorkerAttrDefSuccess,
    workerAttrError,
    workerAttrSuccess,
} from '../actions/adminSettingsAction';

function* workerAttr(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef',
            data
        );

        if (response.status === 200) {
            yield put(workerAttrSuccess(response.data.value));
        }
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* getWorkerAttr(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef'
        );
        yield put(fetchWorkerAttrDefSuccess(response.data));
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* setStatusWorkerAttr(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef/${data1.attrDefId}/${data1.status}`
        );
        console.log(response)
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

function* updateWorkerAttr(action) {
    try {
        const { data1 } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef/${data1.id}`,
            data1.data
        );
        console.log(response)
        yield call(getWorkerAttr);
    } catch (error) {
        yield put(workerAttrError(error));
    }
}

//contract Monthly Cycle
function* monthlyCycle(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );

        if (response.status === 200) {
            yield put(MonthlyCycleSuccess(response.data.value));
        }
    } catch (error) {
        yield put(MonthlyCycleError(error));
    }
}

function* fetchMonthlyCycle(action) {
    try {
        // const { name } = action.payload;
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/MONTHLYCYCLE'
        );

        if (response.status === 200) {
            yield put(MonthlyCycleSuccess(response.data.value));
        }
    } catch (error) {
        yield put(MonthlyCycleError(error));
    }
}

//contract Weekly Cycle
function* weeklyCycle(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );

        if (response.status === 200) {
            yield put(WeeklyCycleSuccess(response.data.value));
        }
    } catch (error) {
        yield put(WeeklyCycleError(error));
    }
}

function* fetchWeeklyCycle(action) {
    try {
        // const { name } = action.payload;
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/WEEKLYCYCLE'
        );

        if (response.status === 200) {
            yield put(WeeklyCycleSuccess(response.data.value));
        }
    } catch (error) {
        yield put(WeeklyCycleError(error));
    }
}
function* adminSettingsSaga() {
    yield takeLatest(WORKER_ATTR_REQUEST, workerAttr);
    yield takeLatest(Fetch_WORKER_ATTR, getWorkerAttr);
    yield takeLatest(STATUS_WORKER_ATTR, setStatusWorkerAttr);
    yield takeLatest(UPDATE_WORKER_ATTR, updateWorkerAttr);
    yield takeLatest(MONTHLY_CYCLE_REQUEST, monthlyCycle);
    yield takeLatest(FETCH_MONTHLY_CYCLE, fetchMonthlyCycle);
    yield takeLatest(WEEKLY_CYCLE_REQUEST, weeklyCycle);
    yield takeLatest(FETCH_WEEKLY_CYCLE, fetchWeeklyCycle);
}

export default adminSettingsSaga;
