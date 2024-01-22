// referenceDataHelpers.jsx

import { useSelector } from "react-redux";
import { selectOrganizationDocuments, selectWorkerAttributes, selectWorkerTypes } from "./selectors";

export const useWorkerTypes = () => useSelector(selectWorkerTypes);
export const useWorkerAttributes = () => useSelector(selectWorkerAttributes); 
export const useAllOrganizationDocuments = () => useSelector(selectOrganizationDocuments); 
