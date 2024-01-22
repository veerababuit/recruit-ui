export const WORKER_ATTR_REQUEST = 'WORKER_ATTR_REQUEST';
export const WORKER_ATTR_SUCCESS = 'WORKER_ATTR_SUCCESS';
export const WORKER_ATTR_ERROR = 'WORKER_ATTR_ERROR';
export const Fetch_WORKER_ATTR = 'Fetch_WORKER_ATTR';
export const Fetch_WORKER_ATTR_SUCCESS = 'Fetch_WORKER_ATTR_SUCCESS';
export const Fetch_WORKER_ATTR_ERROR = 'Fetch_WORKER_ATTR_ERROR';
export const STATUS_WORKER_ATTR = 'STATUS_WORKER_ATTR';
export const UPDATE_WORKER_ATTR = 'UPDATE_WORKER_ATTR';
// Contract Monthly Cycle
export const MONTHLY_CYCLE_REQUEST = 'MONTHLY_CYCLE_REQUEST';
export const MONTHLY_CYCLE_SUCCESS = 'MONTHLY_CYCLE_SUCCESS';
export const MONTHLY_CYCLE_ERROR = 'MONTHLY_CYCLE_ERROR';
export const FETCH_MONTHLY_CYCLE = 'FETCH_MONTHLY_CYCLE';

// Contract Weekly Cycle
export const WEEKLY_CYCLE_REQUEST = 'WEEKLY_CYCLE_REQUEST';
export const WEEKLY_CYCLE_SUCCESS = 'WEEKLY_CYCLE_SUCCESS';
export const WEEKLY_CYCLE_ERROR = 'WEEKLY_CYCLE_ERROR';
export const FETCH_WEEKLY_CYCLE = 'FETCH_WEEKLY_CYCLE';

export const workerAttrRequest = (data) => ({
    type: WORKER_ATTR_REQUEST,
    payload: data,
});

export const workerAttrSuccess = () => ({
    type: WORKER_ATTR_SUCCESS,
});

export const workerAttrError = (err) => ({
    type: WORKER_ATTR_ERROR,
    payload: err,
});

export const fetchWorkerAttr = () => ({
    type: Fetch_WORKER_ATTR,
});

export const fetchWorkerAttrDefSuccess = (data) => ({
    type: Fetch_WORKER_ATTR_SUCCESS,
    payload: data,
});

export const fetchWorkerAttrError = (err) => ({
    type: Fetch_WORKER_ATTR_ERROR,
    payload: err,
});

export const statusWorkerAttr = (data1) => ({
    type: STATUS_WORKER_ATTR,
    payload: data1,
});

export const updateWorkerAttr = (data1) => ({
    type: UPDATE_WORKER_ATTR,
    payload: data1,
});

// Contract Monthly Cycle
export const MonthlyCycleRequest = (formData) => ({
    type: MONTHLY_CYCLE_REQUEST,
    payload:formData
  });
  export const MonthlyCycleSuccess = (formData) => ({
    type: MONTHLY_CYCLE_SUCCESS,
    payload:formData
    
  });
  export const MonthlyCycleError = (err) => ({
    type: MONTHLY_CYCLE_ERROR,
    payload:err
  });
  
  export const fetchMonthlyCycle = () => ({
    type: FETCH_MONTHLY_CYCLE,
  });

  // Contract weekly Cycle
export const WeeklyCycleRequest = (formData) => ({
    type: WEEKLY_CYCLE_REQUEST,
    payload:formData
  });
  export const WeeklyCycleSuccess = (formData) => ({
    type: WEEKLY_CYCLE_SUCCESS,
    payload:formData
    
  });
  export const WeeklyCycleError = (err) => ({
    type: WEEKLY_CYCLE_ERROR,
    payload:err
  });
  
  export const fetchWeeklyCycle = () => ({
    type: FETCH_WEEKLY_CYCLE,
  });
