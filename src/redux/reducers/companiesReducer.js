// companiesReducer.js
import {
  CREATE_COMPANY_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,

  FETCH_COMPANIES_FAILURE,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,

  FETCH_COMPANY_FAILURE,
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,

  UPDATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,

  STORE_DOMAIN_DATA,
  STORE_DOMAIN,
  HANDLE_ACTION,

  PAGINATION_COMPANY_REQUEST,
  PAGINATION_COMPANY_SUCCESS,
  PAGINATION_COMPANY_FAILURE,

  FETCH_COUNTRIES_SUCCESS,
  FETCH_TAX_CLASSIFICATIONS_SUCCESS,
  CHECK_DOMAIN_SUCCESS,
  CHECK_DOMAIN_REQUEST,
  CHECK_DOMAIN_FAILURE,
  FETCH_ORGANIZATION_COUNT_REQUEST,
  FETCH_ORGANIZATION_COUNT_SUCCESS,
  FETCH_ORGANIZATION_COUNT_FAILURE,
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_FAILURE,
  CHANGE_ORGANIZATION_STATUS_FAILURE,
  CHANGE_ORGANIZATION_STATUS_SUCCESS,
  CHANGE_ORGANIZATION_STATUS_REQUEST,
  FETCH_INACTIVE_STATUS_CODES_FAILURE,
  FETCH_INACTIVE_STATUS_CODES_SUCCESS,
  FETCH_INACTIVE_STATUS_CODES_REQUEST,
  STORE_DOCUMENTS_DATA,

} from '../actions/companiesActions';

const initialState = {
  selectedDocuments: [],
  inactiveStatusCodes: [],
  organizationCount: {},
  checkDomainData: [],
  domainAvailable: null,
  countries: [],
  taxClassifications: [],
  companies: [],
  domainData: [],
  allCompanies: [],
  companyPagination: [],
  selectedCompany: {},
  organizationID: '',
  domainIndex: '',
  action: '',
  loading: false,
  loadingAllCompanies: false,
  error: null,
  domainEmailValidation: function () { },

};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_REQUEST:
      return { ...state, loadingAllCompanies: true, error: null };

    case FETCH_COMPANY_REQUEST:
    case UPDATE_COMPANY_REQUEST:
    case CREATE_COMPANY_REQUEST:
    case PAGINATION_COMPANY_REQUEST:
    case FETCH_COUNTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case PAGINATION_COMPANY_SUCCESS:
      return { ...state, loading: false, allCompanies: action.payload };
    case FETCH_COMPANIES_SUCCESS:
      return { ...state, loadingAllCompanies: false, companies: action.payload.data.content, companyPagination: action.payload.data };
    case FETCH_COMPANY_SUCCESS:
      return { ...state, loading: false, selectedCompany: action.payload };
    // case UPDATE_COMPANY_SUCCESS:
    //   return { ...state, loading: false, selectedCompany: action.payload };
    case UPDATE_COMPANY_SUCCESS:
      const updatedCompany = action.payload;
      const updatedCompanies = state.companies.map((company) => {
        return company.organizationID === updatedCompany.organizationID ? updatedCompany : company;
      });
      return { ...state, loading: false, selectedCompany: updatedCompany, companies: updatedCompanies, };

    case CREATE_COMPANY_SUCCESS:
      return { ...state, loading: false, organizationID: action.payload };
    case FETCH_COMPANIES_FAILURE:
      return { ...state, loadingAllCompanies: false, error: action.payload }
    case CREATE_COMPANY_FAILURE:
    case UPDATE_COMPANY_FAILURE:
    case FETCH_COMPANY_FAILURE:
    case PAGINATION_COMPANY_FAILURE:
    case FETCH_COUNTRIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case STORE_DOMAIN_DATA:
      return { ...state, domainData: action.payload };
    case STORE_DOMAIN:
      return { ...state, domainIndex: action.payload };
    case HANDLE_ACTION:
      return { ...state, action: action.payload }

    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload };

    case FETCH_TAX_CLASSIFICATIONS_SUCCESS:
      return { ...state, taxClassifications: action.payload };

    case CHECK_DOMAIN_REQUEST:
      return { ...state, loading: true, error: null, domainAvailable: null };

    case CHECK_DOMAIN_SUCCESS:
      return { ...state, loading: false, domainAvailable: action.payload, };

    case CHECK_DOMAIN_FAILURE:
      return { ...state, loading: false, error: action.payload, domainAvailable: null };

    case FETCH_ORGANIZATION_COUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORGANIZATION_COUNT_SUCCESS:
      return { ...state, loading: false, organizationCount: action.payload };
    case FETCH_ORGANIZATION_COUNT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case CHANGE_ORGANIZATION_STATUS_REQUEST:
      return { ...state, loading: true, error: null };

    case CHANGE_ORGANIZATION_STATUS_SUCCESS:
      return { ...state, loading: false, };

    case CHANGE_ORGANIZATION_STATUS_FAILURE:
      return { ...state, loading: false, error: action.error };

    case FETCH_INACTIVE_STATUS_CODES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_INACTIVE_STATUS_CODES_SUCCESS:
      return { ...state, loading: false, inactiveStatusCodes: action.payload };

    case FETCH_INACTIVE_STATUS_CODES_FAILURE:
      return { ...state, loading: false, error: action.payload, inactiveStatusCodes: [] };

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

export default companiesReducer;