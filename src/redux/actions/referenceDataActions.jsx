// referenceDataActions.jsx
export const FETCH_WORKER_TYPES_REQUEST = 'FETCH_WORKER_TYPES_REQUEST';
export const FETCH_WORKER_TYPES_SUCCESS = 'FETCH_WORKER_TYPES_SUCCESS';
export const FETCH_WORKER_TYPES_FAILURE = 'FETCH_WORKER_TYPES_FAILURE';

export const FETCH_WORKER_ATTRIBUTE_REQUEST = 'FETCH_WORKER_ATTRIBUTE_REQUEST';
export const FETCH_WORKER_ATTRIBUTE_SUCCESS = 'FETCH_WORKER_ATTRIBUTE_SUCCESS';
export const FETCH_WORKER_ATTRIBUTE_FAILURE = 'FETCH_WORKER_ATTRIBUTE_FAILURE';

export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';

// org get all doc
export const FETCH_ORGANIZATION_DOCUMENT_REQUEST = 'FETCH_CONTRACT_DOCUMENT_REQUEST';
export const FETCH_ORGANIZATION_DOCUMENT_SUCCESS = 'FETCH_ORGANIZATION_DOCUMENT_SUCCESS';
export const FETCH_ORGANIZATION_DOCUMENT_FAILURE = 'FETCH_ORGANIZATION_DOCUMENT_FAILURE';


export const fetchWorkerTypesRequest = () => ({
    type: FETCH_WORKER_TYPES_REQUEST,
});

export const fetchWorkerTypesSuccess = (workerTypes) => ({
    type: FETCH_WORKER_TYPES_SUCCESS,
    payload: workerTypes,
});

export const fetchWorkerTypesFailure = (error) => ({
    type: FETCH_WORKER_TYPES_FAILURE,
    payload: error,
});

export const fetchWorkerAttributeRequest = () => ({
    type: FETCH_WORKER_ATTRIBUTE_REQUEST,
});

export const fetchWorkerAttributeSuccess = (data) => ({
    type: FETCH_WORKER_ATTRIBUTE_SUCCESS,
    payload: data,
});

export const fetchWorkerAttributeFailure = (error) => ({
    type: FETCH_WORKER_ATTRIBUTE_FAILURE,
    payload: error,
});

// org get all docs
export const fetchOrganizationDocumentRequest = () => ({
    type: FETCH_ORGANIZATION_DOCUMENT_REQUEST,
});

export const fetchOrganizationDocumentSuccess = (organizationDocumentsList) => ({
    type: FETCH_ORGANIZATION_DOCUMENT_SUCCESS,
    payload: organizationDocumentsList,
});

export const fetchOrganizationDocumentFailure = (error) => ({
    type: FETCH_ORGANIZATION_DOCUMENT_FAILURE,
    payload: error,
});
