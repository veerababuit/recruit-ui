// // import {
// //     ADD_DYNAMIC_DATA,
// //     CONTRACTSTEP,
// //     // FETCH_CONTRACTS_FAILURE,
// //     // FETCH_CONTRACTS_REQUEST,
// //     // FETCH_CONTRACTS_SUCCESS,
// //     HANDLE_CONTRACT_ACTION_MENU,
// //     STORE_UPLOAD_MSA_DATA,
// //     CREATE_CONTRACT_ERROR,
// //     CREATE_CONTRACT_REQUEST,
// //     CREATE_CONTRACT_SUCCESS,
// //     FETCH_COMPANY_ACTIVE_REQUEST,
// //     FETCH_COMPANY_ACTIVE_ERROR,
// //     FETCH_COMPANY_ACTIVE_SUCCESS,

// //     // FETCH_DOCUMENT_REQUEST,
// //     // FETCH_DOCUMENT_SUCCESS,
// //     // FETCH_DOCUMENT_FAILURE,
// //     ADD_SELECTED_DOCUMENT,
// //     UPLOAD_DOCUMENT_REQUEST,
// //     UPLOAD_DOCUMENT_SUCCESS,
// //     UPLOAD_DOCUMENT_FAILURE,
// //     // STORE_CREATED_CONTRACT_ID,

// //     UPDATE_CONTRACT_REQUEST,
// //     UPDATE_CONTRACT_FAILURE,
// //     UPDATE_CONTRACT_SUCCESS,

// // } from '../actions/contractActions';
// // import {
// //     FETCH_CONTRACTS_LOAD_FAILURE,
// //     FETCH_CONTRACTS_LOAD_REQUEST,
// //     FETCH_CONTRACTS_LOAD_SUCCESS,
// //     FETCH_CONTRACT_FAILURE,
// //     FETCH_CONTRACT_REQUEST,
// //     FETCH_CONTRACT_SUCCESS,
// // } from '../actions/contractActions';

// // const initialState = {
// //     contracts: [],
// //     activeCompanies: [],
// //     loading: false,
// //     contractId: '',
// //     error: null,
// //     contractActionMenu: '',
// //     uploadMsaData: [], // upload MSA
// //     contractSteps: '',
// //     contractSummary: [],
// //     contractSummaryWithNavigation: [],

// //     selectedDocuments: [],
// //     // upload doc
// //     uploading: false,
// //     uploadedDocument: null,
// //     uploadError: null,

// //     contractSummarySelected: {},

// // };

// // const contractReducer = (state = initialState, action) => {
// //     switch (action.type) {
// //         // case FETCH_CONTRACTS_REQUEST:
// //         case CREATE_CONTRACT_REQUEST:
// //         case FETCH_COMPANY_ACTIVE_REQUEST:
// //         case UPDATE_CONTRACT_REQUEST:
// //             return { ...state, loading: true, error: null };
// //         // case FETCH_CONTRACTS_SUCCESS:
// //         //     return { ...state, loading: false, contracts: action.payload };
// //         // case FETCH_CONTRACTS_FAILURE:
// //         case CREATE_CONTRACT_ERROR:
// //         case FETCH_COMPANY_ACTIVE_ERROR:
// //         case UPDATE_CONTRACT_FAILURE:
// //             return { ...state, loading: false, error: action.payload };
// //         case HANDLE_CONTRACT_ACTION_MENU:
// //             return { ...state, contractAction: action.payload };
// //         case STORE_UPLOAD_MSA_DATA: //upload MSA
// //             return { ...state, uploadMsaData: action.payload };
// //         case CONTRACTSTEP:
// //             return { ...state, contractSteps: action.payload };
// //         case ADD_DYNAMIC_DATA:
// //             return { ...state, dynamicSampleData: action.payload };
// //         case CREATE_CONTRACT_SUCCESS:
// //             return { ...state, loading: false, contractId: action.payload };
// //         case FETCH_COMPANY_ACTIVE_SUCCESS:
// //             return { ...state, loading: false, activeCompanies: action.payload };
// //         case FETCH_CONTRACTS_LOAD_REQUEST:
// //             return { ...state, loading: true, error: null };
// //         case FETCH_CONTRACTS_LOAD_SUCCESS:
// //             return {
// //                 ...state,
// //                 loading: false,
// //                 contractSummary: action.payload.data.content,
// //                 contractSummaryWithNavigation: action.payload.data,
// //             };
// //         case FETCH_CONTRACTS_LOAD_FAILURE:
// //             return { ...state, loading: false, error: action.payload };
// //         case FETCH_CONTRACT_REQUEST:
// //             return { ...state, loading: true, error: null };
// //         case FETCH_CONTRACT_SUCCESS:
// //             return { ...state, loading: false, contractSummarySelected: action.payload.data };
// //         case FETCH_CONTRACT_FAILURE:
// //             return { ...state, loading: false, error: action.payload };

// //         // add doc to array
// //         case ADD_SELECTED_DOCUMENT:
// //             return {
// //                 ...state,
// //                 selectedDocuments: [...state.selectedDocuments, action.payload],
// //             };
// //         // upload doc
// //         case UPLOAD_DOCUMENT_REQUEST:
// //             return {
// //                 ...state,
// //                 uploading: true,
// //                 uploadedDocument: null,
// //                 uploadError: null,
// //             };
// //         case UPLOAD_DOCUMENT_SUCCESS:
// //             return {
// //                 ...state,
// //                 uploading: false,
// //                 uploadedDocument: action.payload,
// //                 uploadError: null,
// //             };
// //         case UPLOAD_DOCUMENT_FAILURE:
// //             return {
// //                 ...state,
// //                 uploading: false,
// //                 uploadedDocument: null,
// //                 uploadError: action.payload,
// //             };

// //         case UPDATE_CONTRACT_SUCCESS:
// //                 return { ...state, loading: false, contractSummarySelected: action.payload };

// //         default:
// //             return state;
// //     }
// // };

// // export default contractReducer;
// import {
//     ADD_DYNAMIC_DATA,
//     CONTRACTSTEP,
//     // FETCH_CONTRACTS_FAILURE,
//     // FETCH_CONTRACTS_REQUEST,
//     // FETCH_CONTRACTS_SUCCESS,
//     HANDLE_CONTRACT_ACTION_MENU,
//     STORE_UPLOAD_MSA_DATA,
//     CREATE_CONTRACT_ERROR,
//     CREATE_CONTRACT_REQUEST,
//     CREATE_CONTRACT_SUCCESS,
//     FETCH_COMPANY_ACTIVE_REQUEST,
//     FETCH_COMPANY_ACTIVE_ERROR,
//     FETCH_COMPANY_ACTIVE_SUCCESS,

//     // FETCH_DOCUMENT_REQUEST,
//     // FETCH_DOCUMENT_SUCCESS,
//     // FETCH_DOCUMENT_FAILURE,
//     ADD_SELECTED_DOCUMENT,
//     UPLOAD_DOCUMENT_REQUEST,
//     UPLOAD_DOCUMENT_SUCCESS,
//     UPLOAD_DOCUMENT_FAILURE,
//     // STORE_CREATED_CONTRACT_ID,

//     UPDATE_CONTRACT_REQUEST,
//     UPDATE_CONTRACT_FAILURE,
//     UPDATE_CONTRACT_SUCCESS,

// } from '../actions/contractActions';
// import {
//     FETCH_CONTRACTS_LOAD_FAILURE,
//     FETCH_CONTRACTS_LOAD_REQUEST,
//     FETCH_CONTRACTS_LOAD_SUCCESS,
//     FETCH_CONTRACT_FAILURE,
//     FETCH_CONTRACT_REQUEST,
//     FETCH_CONTRACT_SUCCESS,
// } from '../actions/contractActions';

// const initialState = {
//     contracts: [],
//     activeCompanies: [],
//     loading: false,
//     contractId: '',
//     error: null,
//     contractActionMenu: '',
//     uploadMsaData: [], // upload MSA
//     contractSteps: '',
//     contractSummary: [],
//     contractSummaryWithNavigation: [],

//     selectedDocuments: [],
//     // upload doc
//     uploading: false,
//     uploadedDocument: null,
//     uploadError: null,

//     contractSummarySelected: {},

// };

// const contractReducer = (state = initialState, action) => {
//     switch (action.type) {
//         // case FETCH_CONTRACTS_REQUEST:
//         case CREATE_CONTRACT_REQUEST:
//         case FETCH_COMPANY_ACTIVE_REQUEST:
//         case UPDATE_CONTRACT_REQUEST:
//             return { ...state, loading: true, error: null };
//         // case FETCH_CONTRACTS_SUCCESS:
//         //     return { ...state, loading: false, contracts: action.payload };
//         // case FETCH_CONTRACTS_FAILURE:
//         case CREATE_CONTRACT_ERROR:
//         case FETCH_COMPANY_ACTIVE_ERROR:
//         case UPDATE_CONTRACT_FAILURE:
//             return { ...state, loading: false, error: action.payload };
//         case HANDLE_CONTRACT_ACTION_MENU:
//             return { ...state, contractAction: action.payload };
//         case STORE_UPLOAD_MSA_DATA: //upload MSA
//             return { ...state, uploadMsaData: action.payload };
//         case CONTRACTSTEP:
//             return { ...state, contractSteps: action.payload };
//         case ADD_DYNAMIC_DATA:
//             return { ...state, dynamicSampleData: action.payload };
//         case CREATE_CONTRACT_SUCCESS:
//             return { ...state, loading: false, contractId: action.payload };
//         case FETCH_COMPANY_ACTIVE_SUCCESS:
//             return { ...state, loading: false, activeCompanies: action.payload };
//         case FETCH_CONTRACTS_LOAD_REQUEST:
//             return { ...state, loading: true, error: null };
//         case FETCH_CONTRACTS_LOAD_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 contractSummary: action.payload.data.content,
//                 contractSummaryWithNavigation: action.payload.data,
//             };
//         case FETCH_CONTRACTS_LOAD_FAILURE:
//             return { ...state, loading: false, error: action.payload };
//         case FETCH_CONTRACT_REQUEST:
//             return { ...state, loading: true, error: null };
//         case FETCH_CONTRACT_SUCCESS:
//             return { ...state, loading: false, contractSummarySelected: action.payload.data };
//         case FETCH_CONTRACT_FAILURE:
//             return { ...state, loading: false, error: action.payload };

//         // add doc to array
//         case ADD_SELECTED_DOCUMENT:
//             return {
//                 ...state,
//                 selectedDocuments: [...state.selectedDocuments, action.payload],
//             };
//         // upload doc
//         case UPLOAD_DOCUMENT_REQUEST:
//             return {
//                 ...state,
//                 uploading: true,
//                 uploadedDocument: null,
//                 uploadError: null,
//             };
//         case UPLOAD_DOCUMENT_SUCCESS:
//             return {
//                 ...state,
//                 uploading: false,
//                 uploadedDocument: action.payload,
//                 uploadError: null,
//             };
//         case UPLOAD_DOCUMENT_FAILURE:
//             return {
//                 ...state,
//                 uploading: false,
//                 uploadedDocument: null,
//                 uploadError: action.payload,
//             };

//         case UPDATE_CONTRACT_SUCCESS:
//                 return { ...state, loading: false, contractSummarySelected: action.payload };

//         default:
//             return state;
//     }
// };

// export default contractReducer;

import {
    ADD_DYNAMIC_DATA,
    CONTRACTSTEP,
    // FETCH_CONTRACTS_FAILURE,
    // FETCH_CONTRACTS_REQUEST,
    // FETCH_CONTRACTS_SUCCESS,
    HANDLE_CONTRACT_ACTION_MENU,
    STORE_UPLOAD_MSA_DATA,
    CREATE_CONTRACT_ERROR,
    CREATE_CONTRACT_REQUEST,
    CREATE_CONTRACT_SUCCESS,
    FETCH_COMPANY_ACTIVE_REQUEST,
    FETCH_COMPANY_ACTIVE_ERROR,
    FETCH_COMPANY_ACTIVE_SUCCESS,

    // FETCH_DOCUMENT_REQUEST,
    // FETCH_DOCUMENT_SUCCESS,
    // FETCH_DOCUMENT_FAILURE,
    UPLOAD_DOCUMENT_REQUEST,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAILURE,
    // STORE_CREATED_CONTRACT_ID,
    UPDATE_CONTRACT_REQUEST,
    UPDATE_CONTRACT_FAILURE,
    UPDATE_CONTRACT_SUCCESS,
    FETCH_ALL_WORKORDER_REQUEST,
    FETCH_ALL_WORKORDER_SUCCESS,
    FETCH_ALL_WORKORDER_ERROR,
    STORE_DOCUMENTS_DATA,
} from '../actions/contractActions';
import {
    FETCH_CONTRACTS_LOAD_FAILURE,
    FETCH_CONTRACTS_LOAD_REQUEST,
    FETCH_CONTRACTS_LOAD_SUCCESS,
    FETCH_CONTRACT_FAILURE,
    FETCH_CONTRACT_REQUEST,
    FETCH_CONTRACT_SUCCESS,
} from '../actions/contractActions';

const initialState = {
    contracts: [],
    activeCompanies: [],
    loading: false,
    contractId: '',
    error: null,
    contractActionMenu: '',
    uploadMsaData: [], // upload MSA
    contractSteps: '',
    contractSummary: [],
    contractSummaryWithNavigation: [],

    selectedDocuments: [],
    // upload doc
    uploading: false,
    uploadedDocument: null,
    uploadError: null,

    contractSummarySelected: {},
    workOrderGetAll: [],
    workOrderSummaryWithNavigation: [],
};

const contractReducer = (state = initialState, action) => {
    switch (action.type) {
        // case FETCH_CONTRACTS_REQUEST:
        case CREATE_CONTRACT_REQUEST:
        case FETCH_COMPANY_ACTIVE_REQUEST:
        case UPDATE_CONTRACT_REQUEST:
            return { ...state, loading: true, error: null };
        // case FETCH_CONTRACTS_SUCCESS:
        //     return { ...state, loading: false, contracts: action.payload };
        // case FETCH_CONTRACTS_FAILURE:
        case CREATE_CONTRACT_ERROR:
        case FETCH_COMPANY_ACTIVE_ERROR:
        case UPDATE_CONTRACT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case HANDLE_CONTRACT_ACTION_MENU:
            return { ...state, contractAction: action.payload };
        case STORE_UPLOAD_MSA_DATA: //upload MSA
            return { ...state, uploadMsaData: action.payload };
        case CONTRACTSTEP:
            return { ...state, contractSteps: action.payload };
        case ADD_DYNAMIC_DATA:
            return { ...state, dynamicSampleData: action.payload };
        case CREATE_CONTRACT_SUCCESS:
            return { ...state, loading: false, contractId: action.payload };
        case FETCH_COMPANY_ACTIVE_SUCCESS:
            return { ...state, loading: false, activeCompanies: action.payload };
        case FETCH_CONTRACTS_LOAD_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACTS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                contractSummary: action.payload.data.content,
                contractSummaryWithNavigation: action.payload.data,
            };
        case FETCH_CONTRACTS_LOAD_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACT_SUCCESS:
            return { ...state, loading: false, contractSummarySelected: action.payload.data };
        case FETCH_CONTRACT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // upload doc
        case UPLOAD_DOCUMENT_REQUEST:
            return {
                ...state,
                uploading: true,
                uploadedDocument: null,
                uploadError: null,
            };
        case UPLOAD_DOCUMENT_SUCCESS:
            return {
                ...state,
                uploading: false,
                uploadedDocument: action.payload,
                uploadError: null,
            };
        case UPLOAD_DOCUMENT_FAILURE:
            return {
                ...state,
                uploading: false,
                uploadedDocument: null,
                uploadError: action.payload,
            };

        case UPDATE_CONTRACT_SUCCESS:
            return { ...state, loading: false, contractSummarySelected: action.payload };
        //WORK_ORDER
        case FETCH_ALL_WORKORDER_REQUEST:
            return { ...state, loading: false, error: null };
        case FETCH_ALL_WORKORDER_SUCCESS:
            return {
                ...state,
                loading: true,
                workOrderGetAll: action.payload.data.content,
                workOrderSummaryWithNavigation: action.payload.data,
            };
        case FETCH_ALL_WORKORDER_ERROR:
            return { ...state, loading: true, error: action.payload };
        // store documents
        case STORE_DOCUMENTS_DATA:
            return {
                ...state,
                loading: false,
                selectedDocuments: action.payload,
            };

        default:
            return state;
    }
};

export default contractReducer;
