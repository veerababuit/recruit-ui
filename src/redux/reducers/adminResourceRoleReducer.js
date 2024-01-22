import {
    FETCH_ADDRESS_TYPE_REQUEST,
    FETCH_ADDRESS_TYPE_SUCCESS,
    FETCH_ADDRESS_TYPE_FAILURE,
    FETCH_WORKER_TYPES_REQUEST,
    FETCH_WORKER_TYPES_SUCCESS,
    FETCH_WORKER_TYPES_FAILURE,
    FETCH_ADMINROLE_REQUEST,
    FETCH_ADMINROLE_SUCCESS,
    FETCH_ADMINROLE_FAILURE,
    ADD_WORKER_TYPE_SUCCESS,
    ADD_WORKER_TYPE_FAILURE,
    ADD_WORKER_TYPE_REQUEST,
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE,
    FETCH_WORKER_ATTRIBUTE_REQUEST,
    FETCH_WORKER_ATTRIBUTE_SUCCESS,
    FETCH_WORKER_ATTRIBUTE_FAILURE,
    CREATE_LOAD_DOCUMENTS_DATA,
    CREATE_SUCCESS_DOCUMENTS_DATA,
    CREATE_ERROR_DOCUMENTS_DATA,
    FETCH_DOCUMENTS_REQUEST,
    FETCH_DOCUMENTS_SUCCESS,
    FETCH_DOCUMENTS_FAILURE,
    FETCH_DOCUMENT_REQUEST,
    FETCH_DOCUMENT_SUCCESS,
    FETCH_DOCUMENT_FAILURE,
    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_FAILURE,
    PATCH_WORKER_TYPE_REQUEST,
    PATCH_WORKER_TYPE_SUCCESS,
    PATCH_WORKER_TYPE_FAILURE,
    RESOURCE_STATUS_REQUEST,
    RESOURCE_STATUS_SUCCESS,
    RESOURCE_STATUS_FAILURE,
    FETCH_RESOURCE_STATUS,
    RESOURCE_STATUS_REQUEST1,
    RESOURCE_STATUS_SUCCESS1,
    RESOURCE_STATUS_FAILURE1,
    FETCH_RESOURCE_STATUS1,
    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAILURE,
    FETCH_TIMESHEET_DOCUMENT_REQUEST,
    FETCH_TIMESHEET_DOCUMENT_SUCCESS,
    FETCH_TIMESHEET_DOCUMENT_FAILURE,
    CREATE_TIMESHEET_LOAD_DOCUMENTS,
    CREATE_TIMESHEET_SUCCESS_DOCUMENTS,
    CREATE_TIMESHEET_ERROR_DOCUMENTS,
    FETCH_CONTRACT_DOCUMENT_REQUEST,
    FETCH_CONTRACT_DOCUMENT_SUCCESS,
    FETCH_CONTRACT_DOCUMENT_FAILURE,
    CREATE_CONTRACT_LOAD_DOCUMENTS,
    CREATE_CONTRACT_SUCCESS_DOCUMENTS,
    CREATE_CONTRACT_ERROR_DOCUMENTS,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS,
    FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE,
    FETCH_COMPANIES_DOCUMENT_REQUEST,
    FETCH_COMPANIES_DOCUMENT_SUCCESS,
    FETCH_COMPANIES_DOCUMENT_FAILURE,
    CREATE_COMPANIES_LOAD_DOCUMENTS,
    CREATE_COMPANIES_SUCCESS_DOCUMENTS,
    CREATE_COMPANIES_ERROR_DOCUMENTS,
    CREATE_DEPARTMENT_SUCCESS,
    CREATE_DEPARTMENT_REQUEST,
    CREATE_DEPARTMENT_FAILURE,
    FETCH_DEPARTMENTID_REQUEST,
    UPDATE_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENTID_FAILURE,
    UPDATE_DEPARTMENT_FAILURE,
    FETCH_DEPARTMENTID_SUCCESS,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_COMPANY_DOCUMENT_REQUEST,
    UPDATE_COMPANY_DOCUMENT_SUCCESS,
    UPDATE_COMPANY_DOCUMENT_FAILURE,
    UPDATE_CONTRACT_DOCUMENT_REQUEST,
    UPDATE_CONTRACT_DOCUMENT_SUCCESS,
    UPDATE_CONTRACT_DOCUMENT_FAILURE,
    UPDATE_TIMESHEET_DOCUMENT_REQUEST,
    UPDATE_TIMESHEET_DOCUMENT_SUCCESS,
    UPDATE_TIMESHEET_DOCUMENT_FAILURE,
} from '../actions/adminResourceRoleAction';

const initialState = {
    workerAttributes: [],
    department: [],
    role: [],
    workerTypes: [],
    addressType: [],
    roleData: {},
    workerType: {},
    loading: false,
    error: null,
    uploadDocument: {},
    selectedDocumentData: {},
    workerTypePatch: {},
    resourceStatus: null,
    resourceStatus1: null,
    documentList: [],

    contractAssignDocumentsList: [],
    dataPost: {},
    loadingDocumentList: false,
    errorDocumentList: null,
    companiesDocumentsList: [],
    loadingCompaniesDocuments: false,
    errorCompanyDocument: null,
    TimeSheetDocumentsList: [],
    loadingTimeSheetDocuments: false,
    contractsDocumentsList: [],
    loadingContract: false,
};

const adminResourceRoleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMINROLE_REQUEST:
        case ADD_WORKER_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADMINROLE_SUCCESS:
            return { ...state, loading: false, role: action.payload };

        case FETCH_ADMINROLE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ADD_WORKER_TYPE_SUCCESS:
            return { ...state, workerType: action.response, error: null };
        case ADD_WORKER_TYPE_FAILURE:
            return { ...state, workerType: {}, error: action.error };

        case FETCH_WORKER_TYPES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_TYPES_SUCCESS:
            return { ...state, loading: false, workerTypes: action.payload };
        case FETCH_WORKER_TYPES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_ADDRESS_TYPE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ADDRESS_TYPE_SUCCESS:
            return { ...state, loading: false, addressType: action.payload };
        case FETCH_ADDRESS_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, department: action.payload };
        case FETCH_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_WORKER_ATTRIBUTE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_ATTRIBUTE_SUCCESS:
            return { ...state, loading: false, workerAttributes: action.payload };
        case FETCH_WORKER_ATTRIBUTE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case CREATE_LOAD_DOCUMENTS_DATA:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_SUCCESS_DOCUMENTS_DATA:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_ERROR_DOCUMENTS_DATA:
            return { ...state, loading: false, error: action.payload };
        case FETCH_DOCUMENTS_REQUEST:
            return { ...state, loadingDocumentList: true, errorDocumentList: null };
        case FETCH_DOCUMENTS_SUCCESS:
            return { ...state, loadingDocumentList: false, documentList: action.payload.data.content };
        case FETCH_DOCUMENTS_FAILURE:
            return { ...state, loadingDocumentList: false, errorDocumentList: action.payload };
        case FETCH_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DOCUMENT_SUCCESS:
            return { ...state, loading: false, selectedDocumentData: action.payload.data };
        case FETCH_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case PATCH_WORKER_TYPE_REQUEST:
            return { ...state, loading: true, error: null };

        case PATCH_WORKER_TYPE_SUCCESS:
            return { ...state, loading: false, workerTypePatch: action.payload };

        case PATCH_WORKER_TYPE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        //Resource Status
        case RESOURCE_STATUS_REQUEST:
            return { ...state, loading: true, error: null };
        case RESOURCE_STATUS_SUCCESS:
            return { ...state, loading: false, success: true, resourceStatus: action.payload };
        case RESOURCE_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_RESOURCE_STATUS:
            return { ...state, loading: true, error: null };

        //Resource Status1
        case RESOURCE_STATUS_REQUEST1:
            return { ...state, loading: true, error: null };
        case RESOURCE_STATUS_SUCCESS1:
            return { ...state, loading: false, success: true, resourceStatus1: action.payload };
        case RESOURCE_STATUS_FAILURE1:
            return { ...state, loading: false, error: action.payload };
        case FETCH_RESOURCE_STATUS1:
            return { ...state, loading: true, error: null };
        case DELETE_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case DELETE_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case DELETE_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_TIMESHEET_DOCUMENT_REQUEST:
            return { ...state, loadingTimeSheetDocuments: true, error: null };
        case FETCH_TIMESHEET_DOCUMENT_SUCCESS:
            return { ...state, loadingTimeSheetDocuments: false, TimeSheetDocumentsList: action.payload.data.content };
        case FETCH_TIMESHEET_DOCUMENT_FAILURE:
            return { ...state, loadingTimeSheetDocuments: false, error: action.payload };
        case CREATE_TIMESHEET_LOAD_DOCUMENTS:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_TIMESHEET_SUCCESS_DOCUMENTS:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_TIMESHEET_ERROR_DOCUMENTS:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_DOCUMENT_REQUEST:
            return { ...state, loadingContract: true, error: null };
        case FETCH_CONTRACT_DOCUMENT_SUCCESS:
            return { ...state, loadingContract: false, contractsDocumentsList: action.payload.data.content };
        case FETCH_CONTRACT_DOCUMENT_FAILURE:
            return { ...state, loadingContract: false, error: action.payload };
        case CREATE_CONTRACT_LOAD_DOCUMENTS:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_CONTRACT_SUCCESS_DOCUMENTS:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_CONTRACT_ERROR_DOCUMENTS:
            return { ...state, loading: false, error: action.payload };
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_SUCCESS:
            return { ...state, loading: false, contractAssignDocumentsList: action.payload };
        case FETCH_CONTRACT_ASSIGN_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // companies Documents
        case FETCH_COMPANIES_DOCUMENT_REQUEST:
            return { ...state, loadingCompaniesDocuments: true, errorCompanyDocument: null };
        case FETCH_COMPANIES_DOCUMENT_SUCCESS:
            return { ...state, loadingCompaniesDocuments: false, companiesDocumentsList: action.payload.data.content };
        case FETCH_COMPANIES_DOCUMENT_FAILURE:
            return { ...state, loadingCompaniesDocuments: false, errorCompanyDocument: action.payload };
            
        // create companies
        case CREATE_COMPANIES_LOAD_DOCUMENTS:
            return { ...state, loading: true, uploadDocument: action.payload };
        case CREATE_COMPANIES_SUCCESS_DOCUMENTS:
            return { ...state, loading: false, uploadDocument: action.payload };
        case CREATE_COMPANIES_ERROR_DOCUMENTS:
            return { ...state, loading: false, error: action.payload };

        //post
        case CREATE_DEPARTMENT_REQUEST:
            return { ...state, loading: false, dataPost: action.payload.data };
        case CREATE_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, dataPost: action.payload.data };
        case CREATE_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        //patch Department by id get and patch
        case FETCH_DEPARTMENTID_REQUEST:
        case UPDATE_DEPARTMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_DEPARTMENTID_FAILURE:
        case UPDATE_DEPARTMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_DEPARTMENT_SUCCESS:
            return { ...state, loading: false, dataPost: action.payload };
        case FETCH_DEPARTMENTID_SUCCESS:
            return { ...state, loading: false, dataPost: action.payload };
        // update company document
        case UPDATE_COMPANY_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_COMPANY_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_COMPANY_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // update contract document
        case UPDATE_CONTRACT_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_CONTRACT_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_CONTRACT_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // update timeSheet document
        case UPDATE_TIMESHEET_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_TIMESHEET_DOCUMENT_SUCCESS:
            return { ...state, loading: true, error: null, selectedDocumentData: action.payload };
        case UPDATE_TIMESHEET_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default adminResourceRoleReducer;
