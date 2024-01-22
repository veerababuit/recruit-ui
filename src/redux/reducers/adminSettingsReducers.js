import {
    WORKER_ATTR_REQUEST,
    WORKER_ATTR_SUCCESS,
    WORKER_ATTR_ERROR,
    Fetch_WORKER_ATTR,
    Fetch_WORKER_ATTR_ERROR,
    Fetch_WORKER_ATTR_SUCCESS,
    STATUS_WORKER_ATTR,
    UPDATE_WORKER_ATTR,
    MONTHLY_CYCLE_REQUEST,
    MONTHLY_CYCLE_SUCCESS,
    MONTHLY_CYCLE_ERROR,
    FETCH_MONTHLY_CYCLE,
    WEEKLY_CYCLE_REQUEST,
    WEEKLY_CYCLE_SUCCESS,
    WEEKLY_CYCLE_ERROR,
    FETCH_WEEKLY_CYCLE,
} from '../actions/adminSettingsAction';

const initialState = {
    loading: false,
    error: null,
    success: false,
    workerAttrDef: [],
    selectedMonthlyCycle: null,
    selectedWeeklyCycle: null,
};

const adminSettingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WORKER_ATTR_REQUEST:
        case Fetch_WORKER_ATTR:
        case STATUS_WORKER_ATTR:
        case UPDATE_WORKER_ATTR:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case WORKER_ATTR_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case WORKER_ATTR_ERROR:
        case Fetch_WORKER_ATTR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case Fetch_WORKER_ATTR_SUCCESS:
            return {
                ...state,
                loading: false,
                workerAttrDef: action.payload,
                error: null,
            };
        //Contract Monthly Cycle
        case MONTHLY_CYCLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case MONTHLY_CYCLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                selectedMonthlyCycle: action.payload,
            };
        case MONTHLY_CYCLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_MONTHLY_CYCLE:
            return {
                ...state,
                loading: true,
                error: null,
            };
            //Contract Weekly Cycle
        case WEEKLY_CYCLE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case WEEKLY_CYCLE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                selectedWeeklyCycle: action.payload,
            };
        case WEEKLY_CYCLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_WEEKLY_CYCLE:
            return {
                ...state,
                loading: true,
                error: null,
            };
        default:
            return state;
    }
};

export default adminSettingsReducer;
