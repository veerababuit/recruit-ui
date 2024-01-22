// companiesActions.jsx
export const CREATE_COMPANY_REQUEST = 'CREATE_COMPANY_REQUEST'
export const CREATE_COMPANY_SUCCESS = 'CREATE_COMPANY_SUCCESS'
export const CREATE_COMPANY_FAILURE = 'CREATE_COMPANY_FAILURE'

export const FETCH_COMPANIES_REQUEST = 'FETCH_COMPANIES_REQUEST';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

export const FETCH_COMPANY_REQUEST = 'FETCH_COMPANY_REQUEST';
export const FETCH_COMPANY_SUCCESS = 'FETCH_COMPANY_SUCCESS';
export const FETCH_COMPANY_FAILURE = 'FETCH_COMPANY_FAILURE';

export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';

export const STORE_DOMAIN_DATA = 'STORE_DOMAIN_DATA';
export const DOMAIN_EMAIL_VALIDATION = 'DOMAIN_EMAIL_VALIDATION';

export const DELETE_DOMAIN = 'DELETE_DOMAIN';

export const PAGINATION_COMPANY_REQUEST = 'PAGINATION_COMPANY_REQUEST';
export const PAGINATION_COMPANY_SUCCESS = 'PAGINATION_COMPANY_SUCCESS';
export const PAGINATION_COMPANY_FAILURE = 'PAGINATION_COMPANY_FAILURE';

export const STORE_DOMAIN = "STORE_DOMAIN"
export const HANDLE_ACTION = "HANDLE_ACTION"

export const FETCH_COUNTRIES_REQUEST = 'FETCH_COUNTRIES_REQUEST';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const FETCH_COUNTRIES_FAILURE = 'FETCH_COUNTRIES_FAILURE';

export const FETCH_TAX_CLASSIFICATIONS_REQUEST = 'FETCH_TAX_CLASSIFICATIONS_REQUEST';
export const FETCH_TAX_CLASSIFICATIONS_SUCCESS = 'FETCH_TAX_CLASSIFICATIONS_SUCCESS';
export const FETCH_TAX_CLASSIFICATIONS_FAILURE = 'FETCH_TAX_CLASSIFICATIONS_FAILURE';

export const CHECK_DOMAIN_REQUEST = 'CHECK_DOMAIN_REQUEST';
export const CHECK_DOMAIN_SUCCESS = 'CHECK_DOMAIN_SUCCESS';
export const CHECK_DOMAIN_FAILURE = 'CHECK_DOMAIN_FAILURE';

export const FETCH_ORGANIZATION_COUNT_REQUEST = 'FETCH_ORGANIZATION_COUNT_REQUEST';
export const FETCH_ORGANIZATION_COUNT_SUCCESS = 'FETCH_ORGANIZATION_COUNT_SUCCESS';
export const FETCH_ORGANIZATION_COUNT_FAILURE = 'FETCH_ORGANIZATION_COUNT_FAILURE';

export const CHANGE_ORGANIZATION_STATUS_REQUEST = 'CHANGE_ORGANIZATION_STATUS_REQUEST';
export const CHANGE_ORGANIZATION_STATUS_SUCCESS = 'CHANGE_ORGANIZATION_STATUS_SUCCESS';
export const CHANGE_ORGANIZATION_STATUS_FAILURE = 'CHANGE_ORGANIZATION_STATUS_FAILURE';

export const FETCH_INACTIVE_STATUS_CODES_REQUEST = 'FETCH_INACTIVE_STATUS_CODES_REQUEST';
export const FETCH_INACTIVE_STATUS_CODES_SUCCESS = 'FETCH_INACTIVE_STATUS_CODES_SUCCESS';
export const FETCH_INACTIVE_STATUS_CODES_FAILURE = 'FETCH_INACTIVE_STATUS_CODES_FAILURE';

export const fetchCompaniesRequest = (payload) => ({
    type: FETCH_COMPANIES_REQUEST,
    payload
});

export const fetchCompaniesSuccess = (companies) => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload: companies,
});

export const fetchCompaniesFailure = (error) => ({
    type: FETCH_COMPANIES_FAILURE,
    payload: error,
});

export const fetchCompanyRequest = (organizationID) => ({
    type: FETCH_COMPANY_REQUEST,
    payload: organizationID,
});

export const fetchCompanySuccess = (company) => ({
    type: FETCH_COMPANY_SUCCESS,
    payload: company,
});

export const fetchCompanyFailure = (error) => ({
    type: FETCH_COMPANY_FAILURE,
    payload: error,
});

export const createCompanyRequest = (data1) => ({
    type: CREATE_COMPANY_REQUEST,
    payload: data1
});

export const createCompanySuccess = (id) => ({
    type: CREATE_COMPANY_SUCCESS,
    payload: id,
})

export const createCompanyFailure = (error) => ({
    type: CREATE_COMPANY_FAILURE,
    payload: error
})

export const updateCompanyRequest = (organizationID, data) => ({
    type: UPDATE_COMPANY_REQUEST,
    payload: { organizationID, data },
});

export const updateCompanySuccess = (company) => ({
    type: UPDATE_COMPANY_SUCCESS,
    payload: company,
});

export const updateCompanyFailure = (error) => ({
    type: UPDATE_COMPANY_FAILURE,
    payload: error,
});

export const storeDomainData = (data) => ({
    type: STORE_DOMAIN_DATA,
    payload: data
});
export const domainEmailValidation = (data) => ({
    type: DOMAIN_EMAIL_VALIDATION,
    payload: data
});

export const deleteDomain = (organizationID, index) => ({
    type: DELETE_DOMAIN,
    payload: { organizationID, index }
})
export const paginationhCompanyRequest = () => ({
    type: PAGINATION_COMPANY_REQUEST,
});

export const paginationCompanySuccess = (allCompanies) => ({
    type: PAGINATION_COMPANY_SUCCESS,
    payload: allCompanies,
});

export const paginationCompanyFailure = (error) => ({
    type: PAGINATION_COMPANY_FAILURE,
    payload: error,
});

export const storeDomain = (index) => ({
    type: STORE_DOMAIN,
    payload: index,
});

export const handleActions = (index) => ({
    type: HANDLE_ACTION,
    payload: index,
});

export const setCountries = (countries) => ({
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries,
});

export const setTaxClassifications = (taxClassifications) => ({
    type: FETCH_TAX_CLASSIFICATIONS_SUCCESS,
    payload: taxClassifications,
});

export const fetchCountries = () => ({
    type: FETCH_COUNTRIES_REQUEST,
});

export const fetchTaxClassifications = (countryCode) => ({
    type: FETCH_TAX_CLASSIFICATIONS_REQUEST,
    payload: countryCode,
});

export const checkDomainRequest = (domain) => ({
    type: CHECK_DOMAIN_REQUEST,
    payload: domain,
});

export const checkDomainSuccess = (data) => ({
    type: CHECK_DOMAIN_SUCCESS,
    payload: data,
});

export const checkDomainFailure = (error) => ({
    type: CHECK_DOMAIN_FAILURE,
    payload: error,
});

export const fetchOrganizationCountRequest = () => ({
    type: FETCH_ORGANIZATION_COUNT_REQUEST,
});

export const fetchOrganizationCountSuccess = (organizationCount) => ({
    type: FETCH_ORGANIZATION_COUNT_SUCCESS,
    payload: organizationCount,
});

export const fetchOrganizationCountFailure = (error) => ({
    type: FETCH_ORGANIZATION_COUNT_FAILURE,
    payload: error,
});

export const changeOrganizationStatusRequest = (payload) => ({
    type: CHANGE_ORGANIZATION_STATUS_REQUEST,
    payload,
});

export const changeOrganizationStatusSuccess = (data) => ({
    type: CHANGE_ORGANIZATION_STATUS_SUCCESS,
    data,
});

export const changeOrganizationStatusFailure = (error) => ({
    type: CHANGE_ORGANIZATION_STATUS_FAILURE,
    error,
});

export const fetchInactiveStatusCodesRequest = () => ({
    type: FETCH_INACTIVE_STATUS_CODES_REQUEST,
});

export const fetchInactiveStatusCodesSuccess = (inactiveStatusCodes) => ({
    type: FETCH_INACTIVE_STATUS_CODES_SUCCESS,
    payload: inactiveStatusCodes,
});

export const fetchInactiveStatusCodesFailure = (error) => ({
    type: FETCH_INACTIVE_STATUS_CODES_FAILURE,
    payload: error,
});

// add doc companies | store documents
export const STORE_DOCUMENTS_DATA = 'STORE_DOCUMENTS_DATA';

export const storeDocumentData = (document) => ({
    type: STORE_DOCUMENTS_DATA,
    payload: document,
});