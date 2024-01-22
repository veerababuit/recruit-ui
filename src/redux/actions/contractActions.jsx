// contractActions.js
export const FETCH_CONTRACTS_REQUEST = 'FETCH_CONTRACTS_REQUEST';
export const FETCH_CONTRACTS_SUCCESS = 'FETCH_CONTRACTS_SUCCESS';
export const FETCH_CONTRACTS_FAILURE = 'FETCH_CONTRACTS_FAILURE';

export const HANDLE_CONTRACT_ACTION_MENU = 'HANDLE_CONTRACT_ACTION_MENU';
export const FETCH_CONTRACTS_LOAD_REQUEST = 'FETCH_CONTRACTS_LOAD_REQUEST';
export const FETCH_CONTRACTS_LOAD_SUCCESS = 'FETCH_CONTRACTS_LOAD_SUCCESS';
export const FETCH_CONTRACTS_LOAD_FAILURE = 'FETCH_CONTRACTS_LOAD_FAILURE';

// export const HANDLE_CONTRACT_ACTION_MENU='HANDLE_CONTRACT_ACTION_MENU';
//upload MSA
export const STORE_UPLOAD_MSA_DATA = 'STORE_UPLOAD_MSA_DATA';
//contract MSA to WO steps
export const CONTRACTSTEP = 'CONTRACTSTEP';

export const fetchContractsRequest = (currentPage, rows) => ({
    type: FETCH_CONTRACTS_REQUEST,
    payload: { currentPage, rows },
});

export const fetchContractsSuccess = (contracts) => ({
    type: FETCH_CONTRACTS_SUCCESS,
    payload: contracts,
});

export const fetchContractsFailure = (error) => ({
    type: FETCH_CONTRACTS_FAILURE,
    payload: error,
});

export const handlecontractActionMenu = (mode) => ({
    type: HANDLE_CONTRACT_ACTION_MENU,
    payload: mode,
});

//upload MSA
export const storeUploadMsaData = (data) => ({
    type: STORE_UPLOAD_MSA_DATA,
    payload: data,
});
export const constractSteps = (step) => ({
    type: CONTRACTSTEP,
    payload: step,
});

// dynamic field Data
export const ADD_DYNAMIC_DATA = 'ADD_DYNAMIC_DATA';

export const addDynamicData = (data) => ({
    type: ADD_DYNAMIC_DATA,
    payload: data,
});

// create Contract

export const CREATE_CONTRACT_REQUEST = 'CREATE_CONTRACT_REQUEST';
export const CREATE_CONTRACT_SUCCESS = 'CREATE_CONTRACT_SUCCESS';
export const CREATE_CONTRACT_ERROR = 'CREATE_CONTRACT_ERROR';
export const FETCH_COMPANY_ACTIVE_REQUEST = 'FETCH_COMPANY_ACTIVE_REQUEST';
export const FETCH_COMPANY_ACTIVE_SUCCESS = 'FETCH_COMPANY_ACTIVE_SUCCESS';
export const FETCH_COMPANY_ACTIVE_ERROR = 'FETCH_COMPANY_ACTIVE_ERROR';

export const createContractRequest = (data1) => ({
    type: CREATE_CONTRACT_REQUEST,
    payload: data1,
});

export const createContractSuccess = (id) => ({
    type: CREATE_CONTRACT_SUCCESS,
    payload: id,
});

export const createContractError = (err) => ({
    type: CREATE_CONTRACT_ERROR,
    payload: err,
});

export const fetchCompaniesActive = () => ({
    type: FETCH_COMPANY_ACTIVE_REQUEST,
});

export const fetchCompaniesActiveSuccess = (data) => ({
    type: FETCH_COMPANY_ACTIVE_SUCCESS,
    payload: data,
});

export const fetchCompaniesActiveError = (err) => ({
    type: FETCH_COMPANY_ACTIVE_ERROR,
    payload: err,
});
//     payload: data
// });

export const fetchContractsLoadRequest = () => ({
    type: FETCH_CONTRACTS_LOAD_REQUEST,
});

export const fetchContractsLoadSuccess = (contractSummary) => ({
    type: FETCH_CONTRACTS_LOAD_SUCCESS,
    payload: contractSummary,
});

export const fetchContractsLoadFailure = (error) => ({
    type: FETCH_CONTRACTS_LOAD_FAILURE,
    payload: error,
});
//getById
export const FETCH_CONTRACT_REQUEST = 'FETCH_CONTRACT_REQUEST';
export const FETCH_CONTRACT_SUCCESS = 'FETCH_CONTRACT_SUCCESS';
export const FETCH_CONTRACT_FAILURE = 'FETCH_CONTRACT_FAILURE';

export const contractSummaryRequest = (contractSummaryID) => ({
    type: FETCH_CONTRACT_REQUEST,
    payload: contractSummaryID,
});

export const contractSummarySuccess = (contractSummary) => ({
    type: FETCH_CONTRACT_SUCCESS,
    payload: contractSummary,
});

export const contractSummaryFailure = (error) => ({
    type: FETCH_CONTRACT_FAILURE,
    payload: error,
});

// upload Document

export const UPLOAD_DOCUMENT_REQUEST = 'UPLOAD_DOCUMENT_REQUEST';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAILURE = 'UPLOAD_DOCUMENT_FAILURE';

export const uploadDocumentRequest = (blob, dataById) => ({
    type: UPLOAD_DOCUMENT_REQUEST,
    payload: { blob, dataById },
});

export const uploadDocumentSuccess = (data) => ({
    type: UPLOAD_DOCUMENT_SUCCESS,
    payload: data,
});

export const uploadDocumentFailure = (error) => ({
    type: UPLOAD_DOCUMENT_FAILURE,
    payload: error,
});
//

export const UPDATE_CONTRACT_REQUEST = 'UPDATE_CONTRACT_REQUEST';
export const UPDATE_CONTRACT_SUCCESS = 'UPDATE_CONTRACT_SUCCESS';
export const UPDATE_CONTRACT_FAILURE = 'UPDATE_CONTRACT_FAILURE';

export const updateContractRequest = (contractID, data) => ({
    type: UPDATE_CONTRACT_REQUEST,
    payload: { contractID, data },
});

export const updateContractSuccess = (contract) => ({
    type: UPDATE_CONTRACT_SUCCESS,
    payload: contract,
});

export const updateContractFailure = (error) => ({
    type: UPDATE_CONTRACT_FAILURE,
    payload: error,
});
// CONTRACT_WO
export const FETCH_ALL_WORKORDER_REQUEST = 'FETCH_ALL_WORKORDER_REQUEST';
export const FETCH_ALL_WORKORDER_SUCCESS = 'FETCH_ALL_WORKORDER_SUCCESS';
export const FETCH_ALL_WORKORDER_ERROR = 'FETCH_ALL_WORKORDER_ERROR';

export const fetchAllWorkOrderRequest = () => ({
    type: FETCH_ALL_WORKORDER_REQUEST,
});

export const fetchAllWorkOrderSuccess = (workOrderGetAll) => ({
    type: FETCH_ALL_WORKORDER_SUCCESS,
    payload: workOrderGetAll,
});

export const fetchAllWorkOrderError = (error) => ({
    type: FETCH_ALL_WORKORDER_ERROR,
    payload: error,
});
// add doc contact

export const STORE_DOCUMENTS_DATA = 'STORE_DOCUMENTS_DATA';

export const storeDocumentData = (document) => ({
    type: STORE_DOCUMENTS_DATA,
    payload: document,
});
