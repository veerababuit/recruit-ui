// referenceDataReducer.jsx
import {
    FETCH_ORGANIZATION_DOCUMENT_FAILURE,
    FETCH_ORGANIZATION_DOCUMENT_REQUEST,
    FETCH_ORGANIZATION_DOCUMENT_SUCCESS,
    FETCH_WORKER_ATTRIBUTE_FAILURE,
    FETCH_WORKER_ATTRIBUTE_REQUEST,
    FETCH_WORKER_ATTRIBUTE_SUCCESS,
    FETCH_WORKER_TYPES_FAILURE,
    FETCH_WORKER_TYPES_REQUEST,
    FETCH_WORKER_TYPES_SUCCESS,
} from "../actions/referenceDataActions";

const initialState = {
    workerTypes: [],
    workerAttributes: [],
    organizationDocumentsList: [],
    loading: false,
    error: null,
    success: false,
};

const referenceDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WORKER_TYPES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_TYPES_SUCCESS:
            return { ...state, loading: false, workerTypes: action.payload };
        case FETCH_WORKER_TYPES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case FETCH_WORKER_ATTRIBUTE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_WORKER_ATTRIBUTE_SUCCESS:
            return { ...state, loading: false, workerAttributes: action.payload };
        case FETCH_WORKER_ATTRIBUTE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // org doc list
        case FETCH_ORGANIZATION_DOCUMENT_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ORGANIZATION_DOCUMENT_SUCCESS:
            return { ...state, loading: false, organizationDocumentsList: action.payload.data.content };
        case FETCH_ORGANIZATION_DOCUMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default referenceDataReducer;

