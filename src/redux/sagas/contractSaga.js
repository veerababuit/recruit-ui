import { call, put, takeLatest } from 'redux-saga/effects';
    import {
        CREATE_CONTRACT_REQUEST,
        FETCH_ALL_WORKORDER_REQUEST,
        FETCH_COMPANY_ACTIVE_REQUEST,
        // FETCH_USER_REQUEST,
        UPDATE_CONTRACT_REQUEST,
        // FETCH_CONTRACTS_REQUEST,
        createContractError,
        createContractSuccess,
        fetchAllWorkOrderError,
        fetchAllWorkOrderSuccess,
        fetchCompaniesActiveError,
        fetchCompaniesActiveSuccess,
        fetchContractsLoadRequest,
        // fetchUserFailure,
        // fetchUserSuccess,
        // updateContractFailure,
        updateContractSuccess,
        // fetchContractsFailure,
        // fetchContractsSuccess,
    } from '../actions/contractActions';
    // import { contractsApi } from '../../services/contractService';
    // import axios from 'axios';
    
    // import { cal put,  takeLatest } from 'redux-saga/effects';
    import {
        FETCH_CONTRACTS_LOAD_REQUEST,
        contractSummaryFailure,
        FETCH_CONTRACT_REQUEST,
        contractSummarySuccess,
        fetchContractsLoadFailure,
        fetchContractsLoadSuccess,
    } from '../actions/contractActions';
    // import { contractsApi } from '../../services/contractService';
    import axios from 'axios';
    import { getAPIUrl } from '../../utils/config';
    // function* fetchContracts(action) {
    //     try {
    //         const { currentPage, rows } = action.payload;
    //         const response = yield call(contractsApi, currentPage, rows);
    //         yield put(fetchContractsSuccess(response.data));
    //     } catch (error) {
    //         yield put(fetchContractsFailure(error.message));
    //     }
    // }
    function* fetchContractsLoadAsync() {
        try {
            const response = yield call(axios.get, getAPIUrl() + '/raves/v1/contract/summary');
            yield put(fetchContractsLoadSuccess(response));
        } catch (error) {
            yield put(fetchContractsLoadFailure(error.message));
        }
    }
    function* fetchContractSummary(action) {
        try {
            const { payload: contractID } = action;
    
            const response = yield call(
                axios.get,
                `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractID}`
            );
            yield put(contractSummarySuccess(response));
        } catch (error) {
            yield put(contractSummaryFailure(error.message));
        }
    }
    
    function* fetchCompanyActive(action) {
        try {
            const response = yield call(
                axios.get,
                'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=0&limit=10&status=ACTIVE'
            );
            yield put(fetchCompaniesActiveSuccess(response.data.content));
        } catch (error) {
            yield put(fetchCompaniesActiveError(error.message));
        }
    }
    
    function* createContracts(action) {
        try {
            const { data1 } = action.payload;
            const response = yield call(
                axios.post,
                'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract',
                data1
            );
            yield put(createContractSuccess(response.data.contractID));
            console.log(response.data.contractID, 'contractID-saga');
        } catch (error) {
            yield put(createContractError(error.response.data.lrapierror.message));
        }
    }
    
    function* updateCompany(action) {
        try {
            const { contractID, data } = action.payload;
            const response = yield call(axios.patch, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractID}`, data);
            if (response.status === 200) {
                yield put(updateContractSuccess(response.data));
                yield put(fetchContractsLoadRequest());
            } else {
                // const errorMessage = response.data?.lrapierror?.message || 'Failed to update company';
                // yield put(updateContractFailure(errorMessage));
            }
    
        } catch (error) {
            // const errorMessage = error.response?.data?.lrapierror?.message || 'Failed to update company';
            // yield put(updateContractFailure(errorMessage));
        }
    }

//Fetch Request
// function* fetchUserRequest(action) {
//     try {
//         const { page, pageSize } = action.payload;
//          const response = yield call(axios.get, `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization?offset=${page}&limit=${pageSize}`);
//         // const response = yield call(axios.get,getAPIUrl()+`/raves/v1/organization?offset=${page}&limit=${pageSize}`);
//         console.log(response,"GetApi");
//         //const data = processResponseData(response);
//         // yield put(fetchUserSuccess(response));
//     } catch (error) {
//         // yield put(fetchUserFailure(error.message));
//     }
// }
//WorkOrder
function* fetchContractsWoAsync() {
    try {
        const response = yield call(axios.get, getAPIUrl() + '/raves/v1/contract/workorder/summary');
        console.log(response,"response");
        yield put(fetchAllWorkOrderSuccess(response));
    } catch (error) {
        yield put(fetchAllWorkOrderError(error.message));
    }
}

    function* contractSaga() {
        // yield takeLatest(FETCH_USER_REQUEST, fetchUserRequest);
        yield takeLatest(FETCH_COMPANY_ACTIVE_REQUEST, fetchCompanyActive);
        yield takeLatest(CREATE_CONTRACT_REQUEST, createContracts);
        yield takeLatest(FETCH_CONTRACTS_LOAD_REQUEST, fetchContractsLoadAsync);
        yield takeLatest(FETCH_CONTRACT_REQUEST, fetchContractSummary);
        yield takeLatest(UPDATE_CONTRACT_REQUEST, updateCompany);
        yield takeLatest(FETCH_ALL_WORKORDER_REQUEST,fetchContractsWoAsync)
    
    }
    
    export default contractSaga;