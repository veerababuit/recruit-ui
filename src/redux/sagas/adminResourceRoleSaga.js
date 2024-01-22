// adminResourceRoleSaga.js
import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAdminRoleFailure,
    fetchAdminRoleSuccess,
    FETCH_ADMINROLE_REQUEST,
    fetchAdminRoleRequest,
    ADD_WORKER_TYPE_REQUEST,
    addWorkerTypeSuccess,
    addWorkerTypeFailure,
    fetchWorkerTypesSuccess,
    fetchWorkerTypesFailure,
    FETCH_WORKER_TYPES_REQUEST,
    FETCH_ADDRESS_TYPE_REQUEST,
    fetchAddressTypeSuccess,
    fetchAddressTypeFailure,
    fetchWorkerAttributeSuccess,
    fetchWorkerAttributeFailure,
    FETCH_WORKER_ATTRIBUTE_REQUEST,
    UPDATE_DOCUMENT_REQUEST,
    FETCH_DOCUMENT_REQUEST,
    FETCH_DOCUMENTS_REQUEST,
    CREATE_LOAD_DOCUMENTS_DATA,
    updateDocumentFailure,
    updateDocumentSuccess,
    fetchDocumentFailure,
    fetchDocumentSuccess,
    createErrorDocumentData,
    createSuccessDocumentData,
    fetchDocumentsSuccess,
    fetchDocumentsFailure,
    FETCH_DEPARTMENT_REQUEST,
    fetchDepartmentFailure,
    fetchDepartmentSuccess,
    PATCH_WORKER_TYPE_REQUEST,
    patchWorkerTypeSuccess,
    patchWorkerTypeFailure,
    fetchWorkerTypesRequest,
    ResourceStatusSuccess,
    ResourceStatusError,
    RESOURCE_STATUS_REQUEST,
    FETCH_RESOURCE_STATUS,
    ResourceStatusSuccess1,
    ResourceStatusError1,
    RESOURCE_STATUS_REQUEST1,
    FETCH_RESOURCE_STATUS1,
    createDepartmentSuccess,
    createDepartmentFailure,
    CREATE_DEPARTMENT_REQUEST,
    fetchTimeSheetDocumentSuccess,
    fetchTimeSheetDocumentFailure,
    createSuccessTimeSheetData,
    createErrorTimeSheetData,
    CREATE_TIMESHEET_LOAD_DOCUMENTS,
    FETCH_TIMESHEET_DOCUMENT_REQUEST,
    fetchContractsDocumentSuccess,
    FETCH_CONTRACT_DOCUMENT_REQUEST,
    CREATE_CONTRACT_LOAD_DOCUMENTS,
    createErrorContractsData,
    fetchContractsAssignDocumentFailure,
    fetchContractsAssignDocumentSuccess,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST,
    fetchCompaniesDocumentSuccess,
    fetchCompaniesDocumentFailure,
    createSuccessCompaniesData,
    createErrorCompaniesData,
    FETCH_COMPANIES_DOCUMENT_REQUEST,
    CREATE_COMPANIES_LOAD_DOCUMENTS,
    fetchCompaniesDocumentRequest,
    fetchDepartmentIdSuccess,
    fetchDepartmentIdFailure,
    FETCH_DEPARTMENTID_REQUEST,
    updateDepartmentSuccess,
    fetchDepartmentRequest,
    updateDepartmentFailure,
    UPDATE_DEPARTMENT_REQUEST,
    fetchContractsDocumentFailure,
    UPDATE_COMPANY_DOCUMENT_REQUEST,
    UPDATE_CONTRACT_DOCUMENT_REQUEST,
    UPDATE_TIMESHEET_DOCUMENT_REQUEST,
} from '../actions/adminResourceRoleAction';

function* fetchAdminRole() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType'
        );
        // console.log(response.data);
        yield put(fetchAdminRoleSuccess(response.data));
    } catch (error) {
        yield put(fetchAdminRoleFailure(error.message));
    }
}

function* fetchWorkerTypes() {
    try {
        // const response = yield call(axios.get, 'http://192.168.80.168:8083/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType');
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType'
        );
        // console.log(response.data);
        yield put(fetchWorkerTypesSuccess(response.data));
    } catch (error) {
        yield put(fetchWorkerTypesFailure(error.message));
    }
}

function* fetchAddresstype() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v2/organization/addresstype'
        );
        // console.log(response.data);
        yield put(fetchAddressTypeSuccess(response.data));
    } catch (error) {
        yield put(fetchAddressTypeFailure(error.message));
    }
}

function* addWorkerType(action) {
    try {
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType',
            action.workerType
        );
        if (response.status === 200) {
            yield put(addWorkerTypeSuccess(response));
            yield put(fetchAdminRoleRequest());
        }
    } catch (error) {
        yield put(addWorkerTypeFailure(error));
    }
}

function* fetchDepartment(action) {
    try {
        let url = 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department';

        if (action.payload && action.payload.isBillable !== undefined) {
            url += `?billable=${action.payload.isBillable}`;
        }

        const response = yield call(axios.get, url);
        yield put(fetchDepartmentSuccess(response.data));
    } catch (error) {
        yield put(fetchDepartmentFailure(error));
    }
}

function* fetchWorkerAttributes() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/workerattr/v1/workerattrdef?status=ACTIVE'
        );
        yield put(fetchWorkerAttributeSuccess(response.data));
    } catch (error) {
        yield put(fetchWorkerAttributeFailure(error));
    }
}

function* fetchDocumentTypes() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef?relatedEntity=WORKER'
        );
        yield put(fetchDocumentsSuccess(response));
    } catch (error) {
        yield put(fetchDocumentsFailure(error.message));
    }
}

function* createDocumentAsysnc(action) {
    try {
        const data = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/worker/docdef',
            data
        );
        console.log(response, 'resDocApi');
        yield put(createSuccessDocumentData(response));
        yield call(fetchDocumentTypes);
    } catch (error) {
        yield put(createErrorDocumentData(error.message));
    }
}

function* fetchDocument(action) {
    try {
        const { payload: documentID } = action;

        const response = yield call(
            axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${documentID}`
        );

        yield put(fetchDocumentSuccess(response));
    } catch (error) {
        yield put(fetchDocumentFailure(error.message));
    }
}

function* updateDocument(action) {
    try {
        const { documentID, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${documentID}`,
            data
        );
        console.log(response, 'dataEditId');

        yield put(updateDocumentSuccess(response.data));
        yield call(fetchDocumentTypes);
    } catch (error) {
        yield put(updateDocumentFailure(error));
    }
}

// function* adminResourceRoleSaga() {

function* patchWorkerType(action) {
    try {
        const { workerTypeCode, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType/${workerTypeCode}`,
            data
        );
        yield put(patchWorkerTypeSuccess(response.data));
        yield put(fetchWorkerTypesRequest());
    } catch (error) {
        yield put(patchWorkerTypeFailure(error.message));
    }
}

//Resource Status
function* resourceStatus(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );
        console.log(response.data);
        if (response.status === 200) {
            yield put(ResourceStatusSuccess(response.data));
        }
    } catch (error) {
        yield put(ResourceStatusError(error));
    }
}

function* fetchResourceStatus(action) {
    try {
        // const { status } = action.payload;
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/BILLABLE'
        );
        if (response.status === 200) {
            yield put(ResourceStatusSuccess(response.data));
        }
    } catch (error) {
        yield put(ResourceStatusError(error));
    }
}

//Resource Status 1
function* resourceStatus1(action) {
    try {
        const { data } = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams',
            data
        );
        console.log(response.data);
        if (response.status === 200) {
            yield put(ResourceStatusSuccess1(response.data));
        }
    } catch (error) {
        yield put(ResourceStatusError1(error));
    }
}

function* fetchResourceStatus1(action) {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/tenantparams/NONBILLABLE'
        );
        if (response.status === 200) {
            yield put(ResourceStatusSuccess1(response.data));
        }
    } catch (error) {
        yield put(ResourceStatusError1(error));
    }
}

//Resource Department
// function* fetchDepartment() {
//     try {
//         const response = yield call(
//             axios.get,
//             'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department'
//         );
//         console.log(response, 'checkresponse');
//         yield put(fetchDepartmentSuccess(response.data));
//     } catch (error) {
//         yield put(fetchDepartmentFailure(error.message));
//     }
// }

function* fetchDepartmentById(action) {
    try {
        const { payload: deptID } = action;
        const response = yield call(
            axios.get,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department/${deptID}`
        );
        yield put(fetchDepartmentIdSuccess(response.data));
    } catch (error) {
        yield put(fetchDepartmentIdFailure(error.message));
    }
}
function* createDepartment(action) {
    const data = action.payload;
    try {
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department',
            data
        );
        console.log(response, 'dPost');
        // if (response.status === 200) {
        yield put(createDepartmentSuccess(response));
        yield put(fetchDepartmentSuccess());
        // }
    } catch (error) {
        yield put(createDepartmentFailure(error));
    }
}

function* updateDepartment(action) {
    try {
        const { deptID, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department/${deptID}`,
            data
        );
        console.log(response.data, 'updated response id');
        yield put(updateDepartmentSuccess(response.data));
        yield put(fetchDepartmentRequest());
    } catch (error) {
        yield put(updateDepartmentFailure(error.message));
    }
}

// getTimeSheetDocument
function* fetchAllTimeSheetDocument() {
    try {
        const response = yield call(
            axios.get,
            ' http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef?relatedEntity=TIMESHEET'
        );
        yield put(fetchTimeSheetDocumentSuccess(response));
    } catch (error) {
        yield put(fetchTimeSheetDocumentFailure(error.message));
    }
}

// createTimeSheetDocument
function* createTimeSheetDocument(action) {
    try {
        const data = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/timesheet/docdef',
            data
        );
        console.log(response, 'resDocApi');
        yield put(createSuccessTimeSheetData(response));
        yield call(fetchAllTimeSheetDocument);
    } catch (error) {
        yield put(createErrorTimeSheetData(error.message));
    }
}

// update timesheet
function* updateTimeSheetDocument(action) {
    try {
        const { documentID, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${documentID}`,
            data
        );
        console.log(response, 'dataEditId');

        yield put(updateDocumentSuccess(response.data));
        yield call(fetchAllTimeSheetDocument);
    } catch (error) {
        yield put(updateDocumentFailure(error));
    }
}

// getContractsDocument
function* fetchAllContractsDocument() {
    try {
        const response = yield call(
            axios.get,
            ' http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef?relatedEntity=CONTRACT'
        );
        yield put(fetchContractsDocumentSuccess(response));
    } catch (error) {
        yield put(fetchContractsDocumentFailure(error.message));
    }
}

// createContractsDocument
function* createContractsDocument(action) {
    try {
        const data = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/docdef',
            data
        );
        console.log(response, 'resDocApi');
        yield put(createSuccessTimeSheetData(response));
        yield call(fetchAllContractsDocument);
    } catch (error) {
        yield put(createErrorContractsData(error.message));
    }
}


// update contract
function* updateContractDocument(action) {
    try {
        const { documentID, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${documentID}`,
            data
        );
        console.log(response, 'dataEditId');

        yield put(updateDocumentSuccess(response.data));
        yield call(fetchAllContractsDocument);
    } catch (error) {
        yield put(updateDocumentFailure(error));
    }
}


// getContractsDocument
function* fetchAllContractsAssignDocument() {
    try {
        const response = yield call(
            axios.get,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef?relatedEntity=CONTRACT'
        );
        yield put(fetchContractsAssignDocumentSuccess(response.data.content));
    } catch (error) {
        yield put(fetchContractsAssignDocumentFailure(error.message));
    }
}

// get Companies Document
function* fetchAllCompaniesDocument() {
    try {
        const response = yield call(
            axios.get,
            ' http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef?relatedEntity=ORGANIZATION'
        );
        yield put(fetchCompaniesDocumentSuccess(response));
    } catch (error) {
        yield put(fetchCompaniesDocumentFailure(error.message));
    }
}

// create Companies Document
function* createCompaniesDocument(action) {
    try {
        const data = action.payload;
        const response = yield call(
            axios.post,
            'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/organization/docdef',
            data
        );
        console.log(response, 'resDocApi');
        yield put(createSuccessCompaniesData(response));
        yield call(fetchCompaniesDocumentRequest());
    } catch (error) {
        yield put(createErrorCompaniesData(error.message));
    }
}

// update companies
function* updateCompanyDocument(action) {
    try {
        const { documentID, data } = action.payload;
        const response = yield call(
            axios.patch,
            `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/docdef/${documentID}`,
            data
        );
        console.log(response, 'dataEditId');

        yield put(updateDocumentSuccess(response.data));
        yield call(fetchAllCompaniesDocument);
    } catch (error) {
        yield put(updateDocumentFailure(error));
    }
}

function* adminResourceRoleSaga() {
    yield takeLatest(FETCH_ADMINROLE_REQUEST, fetchAdminRole);
    yield takeLatest(ADD_WORKER_TYPE_REQUEST, addWorkerType);
    yield takeLatest(FETCH_WORKER_TYPES_REQUEST, fetchWorkerTypes);
    yield takeLatest(FETCH_ADDRESS_TYPE_REQUEST, fetchAddresstype);
    yield takeLatest(FETCH_DEPARTMENT_REQUEST, fetchDepartment);
    yield takeLatest(FETCH_WORKER_ATTRIBUTE_REQUEST, fetchWorkerAttributes);

    // yield takeLatest(FETCH_JOB_REQUEST, fetchJobType);
    yield takeLatest(PATCH_WORKER_TYPE_REQUEST, patchWorkerType);
    yield takeLatest(RESOURCE_STATUS_REQUEST, resourceStatus);
    yield takeLatest(FETCH_RESOURCE_STATUS, fetchResourceStatus);
    yield takeLatest(RESOURCE_STATUS_REQUEST1, resourceStatus1);
    yield takeLatest(FETCH_RESOURCE_STATUS1, fetchResourceStatus1);
    yield takeLatest(FETCH_DEPARTMENT_REQUEST, fetchDepartment);
    yield takeLatest(CREATE_DEPARTMENT_REQUEST, createDepartment);
    yield takeLatest(FETCH_DEPARTMENTID_REQUEST, fetchDepartmentById);
    yield takeLatest(UPDATE_DEPARTMENT_REQUEST, updateDepartment);
    yield takeLatest(ADD_WORKER_TYPE_REQUEST, addWorkerType);
    yield takeLatest(FETCH_WORKER_ATTRIBUTE_REQUEST, fetchWorkerAttributes);
    yield takeLatest(CREATE_LOAD_DOCUMENTS_DATA, createDocumentAsysnc);
    yield takeLatest(FETCH_DOCUMENTS_REQUEST, fetchDocumentTypes);
    yield takeLatest(FETCH_DOCUMENT_REQUEST, fetchDocument);
    yield takeLatest(UPDATE_DOCUMENT_REQUEST, updateDocument);
    yield takeLatest(CREATE_TIMESHEET_LOAD_DOCUMENTS, createTimeSheetDocument);
    yield takeLatest(FETCH_TIMESHEET_DOCUMENT_REQUEST, fetchAllTimeSheetDocument);
    yield takeLatest(FETCH_CONTRACT_DOCUMENT_REQUEST, fetchAllContractsDocument);
    yield takeLatest(CREATE_CONTRACT_LOAD_DOCUMENTS, createContractsDocument);
    yield takeLatest(FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST, fetchAllContractsAssignDocument);

    yield takeLatest(FETCH_COMPANIES_DOCUMENT_REQUEST, fetchAllCompaniesDocument);
    yield takeLatest(CREATE_COMPANIES_LOAD_DOCUMENTS, createCompaniesDocument);
    yield takeLatest(UPDATE_COMPANY_DOCUMENT_REQUEST, updateCompanyDocument);
    yield takeLatest(UPDATE_CONTRACT_DOCUMENT_REQUEST, updateContractDocument);
    yield takeLatest(UPDATE_TIMESHEET_DOCUMENT_REQUEST, updateTimeSheetDocument);
}

export default adminResourceRoleSaga;
