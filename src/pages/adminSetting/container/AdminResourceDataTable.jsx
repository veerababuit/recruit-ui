import React, { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { Toast } from 'primereact/toast';
import InlineEditDataTable from '../components/InlineEditDataTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    ResourceStatusRequest,
    ResourceStatusRequest1,
    // fetchDepartmentIdRequest,
    fetchDepartmentRequest,
    fetchResourceStatus,
    fetchResourceStatus1,
    fetchWorkerTypesRequest,
    patchWorkerTypeRequest,
    // updateDepartmentRequest,
} from '../../../redux/actions/adminResourceRoleAction';
import axios from 'axios';
import AdminCreateDept from './AdminCreateDept';

const AdminResourceDataTable = ({ editMode, setEditMode }) => {
    const workerTypes = useSelector((state) => state.adminRole.workerTypes);
    const resourceStatus = useSelector((state) => state.adminRole.resourceStatus);
    // console.log(resourceStatus, 'resourceStatus');
    const resourceStatus1 = useSelector((state) => state.adminRole.resourceStatus1);
    // console.log(resourceStatus1, 'resourceStatus1');
    const department = useSelector((state) => state.adminRole.department);
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [editingRow, setEditingRow] = useState(null);
    const [editedLabel, setEditedLabel] = useState(''); //  state for edited label
    const [editingResStatusRow, setEditingResStatusRow] = useState(null);
    const [editingResStatusRow1, setEditingResStatusRow1] = useState(null);
    const [editedResStatus, setEditedResStatus] = useState('');
    const [editedResStatus1, setEditedResStatus1] = useState('');
    const [editingRowDept,setEditinRowgDept] = useState(null)
    const [editDept,setEditDept] = useState('')
    const [pendingAction, setPendingAction] = useState(null);
    const [showDept, setShowDept] = useState(false); 
    const [addDept,setAddDept] = useState([])
    const inputRef = useRef(null);


    const dataToDisplay = Array.isArray(resourceStatus) ? resourceStatus : [resourceStatus];
    const dataToDisplay1 = Array.isArray(resourceStatus1) ? resourceStatus1 : [resourceStatus1];
    
        useEffect(()=> {
        setAddDept(department)
    },[department])

    const apiRequest = useRef(false)
    useEffect(()=>{
        if(apiRequest.current) return
        apiRequest.current = true
        dispatch(fetchResourceStatus());
        dispatch(fetchResourceStatus1());
        dispatch(fetchWorkerTypesRequest());
        dispatch(fetchDepartmentRequest());
    },[dispatch])
 

    const showError = (inputId) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Complete the current action first!',
        });
    };
    const showErrorDuplicate = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Duplicate value. Please choose a different value.',
        });
    };
    const clearPendingAction = () => {
        setPendingAction(null);
    };

    const actionTemplate = (rowData) => {
        if (editingRow === rowData.workerTypeCode) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTick(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelEdit()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleEdit(rowData)} />
                </div>
            );
        }
    };

    const actionTemplateResourceStatus = (rowData) => {
        if (rowData && editingResStatusRow === rowData.value) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTickResStatus(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelResStatusEdit()}
                        className=""
                    />
                </div>
            );
        } else if (rowData) {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit(rowData)} />
                </div>
            );
        } else {
            return null; // or handle the case when rowData is null
        }
    };
    
    const actionTemplateResourceStatus1 = (rowData) => {
        if (rowData && editingResStatusRow1 === rowData.value) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleTickResStatus1(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelResStatusEdit1()}
                        className=""
                    />
                </div>
            );
        } else if (rowData) {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleResStatusEdit1(rowData)} />
                </div>
            );
        } else {
            return null; // or handle the case when rowData is null
        }
    };

    const actionTemplateDepartment = (rowData) => {
        // console.log(rowData.deptID,'rowDataDeptId')
        if (editingRowDept === rowData.deptID) {
            return (
                <div className="d-flex gap-2">
                    <Button
                        type="button"
                        size="small"
                        icon="pi pi-check fs-6"
                        onClick={() => handleDepartment(rowData)}
                        className=""
                    />
                    <Button
                        type="button"
                        size="small"
                        severity="secondary"
                        icon="pi pi-times fs-6"
                        onClick={() => handleCancelDepartment()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className="cursor-pointer">
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleEditDepartment(rowData)} />
                </div>
            );
        }
    };

        const departmentAPI = (deptID) => {
        return `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/department/${deptID}`;
    };

    const handleDepartment = async (rowData) => {
        const payload = {
            deptName: editDept,
        };
    
        try {
            const response = await axios.patch(
                departmentAPI(rowData.deptID),
                payload
            );
    
            console.log('PATCH Response:', response.data);
    
            if (response.status === 200) {
                // Successful PATCH, now fetch the updated data
                const updatedResponse = await axios.get(
                    departmentAPI(rowData.deptID)
                );
    
                if (updatedResponse.status === 200) {
                    // Handle the updated data as needed
                    console.log('Updated Department Data:', updatedResponse.data);
                    const updatedDepartment = updatedResponse.data;
                    setAddDept((prevDept) =>
                    prevDept.map((dept) =>
                        dept.deptID === updatedDepartment.deptID ? updatedDepartment : dept
                    )
                );
                    setEditinRowgDept(null);
                    setEditMode(false);
                    // dispatch(fetchDepartmentRequest());
                    clearPendingAction();
                    showSuccess();
                } else {
                    console.error('Unexpected status code:', updatedResponse.status);
                }
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Axios PATCH error:', error);
        }
    };
    
    // const handleDepartment = async (rowData) => {
    //     console.log(rowData.deptID,'checkaa')
    //     const payload = {
    //         deptID:rowData.deptID,
    //         deptName: editDept
    //     };
    //     dispatch(updateDepartmentRequest(rowData.deptID,payload))
    //     // dispatch(fetchDepartmentIdRequest(rowData.deptID))
    //     setEditinRowgDept(null);
    //    setEditMode(false);
    //    showSuccess();
    // };
    
    const handleCancelDepartment = () => {
        setEditinRowgDept(null);
        setEditMode(false);
    };
    
    const handleEditDepartment = (rowData) => {
        console.log(rowData, 'rowData');
        if (editMode) {
            showError(`inputLabel_${rowData.deptName}`);
        } else {
            setEditinRowgDept(rowData.deptID);
            setEditDept(rowData.deptName);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleEdit = (rowData) => {
        // console.log(rowData, 'rowData');
        if (editMode) {
            showError(`inputLabel_${rowData.workerTypeName}`);
        } else {
            setEditingRow(rowData.workerTypeCode);
            setEditedLabel(rowData.workerTypeName);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

   

    const handleResStatusEdit = (rowData) => {
        if (editMode) {
            showError(`inputResStatus_${rowData.value}`);
        } else {
            setEditingResStatusRow(rowData.value);
            setEditedResStatus(rowData.value);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    const handleResStatusEdit1 = (rowData) => {
        if (editMode) {
            showError(`inputResStatus_${rowData.value}`);
        } else {
            setEditingResStatusRow1(rowData.value);
            setEditedResStatus1(rowData.value);
            setEditMode(true); // Set edit mode to true
            clearPendingAction();
        }
    };

    // const handleTick = async (rowData) => {
    //     const trimmedEditedLabel = editedLabel.trim();
    //     if (!trimmedEditedLabel) {
    //         showErrorBlankValue();
    //         return;
    //     }
    //     const payload = {
    //         workerTypeCode: rowData.workerTypeCode,
    //         workerTypeName: trimmedEditedLabel,
    //     };
    //     try {
    //         const response = await axios.patch(
    //             `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/workerType/${rowData.workerTypeCode}`,
    //             payload
    //         );
    //         if (response.status === 200) {
    //             setEditingRow(null);
    //             setEditMode(false);
    //             dispatch(fetchWorkerTypesRequest());
    //             clearPendingAction();
    //             showSuccess();
    //         } else {
    //             console.error('Unexpected status code:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Axios PATCH error:', error);
    //     }
    // };

    // const handleTick = async (rowData) => {
    //     const trimmedEditedLabel = editedLabel.trim().toLowerCase().replace(/\s+/g, '');
    //     if (!trimmedEditedLabel) {
    //         showErrorBlankValue();
    //     } else {
    //         const isDuplicate = workerTypes.some(
    //             (r) => r.workerTypeCode !== rowData.workerTypeCode && r.workerTypeName.trim().toLowerCase().replace(/\s+/g, '') === trimmedEditedLabel
    //         );
        
    //         if (isDuplicate){
    //             showErrorDuplicate();
    //         } else {
    //             const payload = {
    //                 workerTypeCode: rowData.workerTypeCode,
    //                 workerTypeName: trimmedEditedLabel
    //             };
    //             // dispatch(patchWorkerTypeRequest(rowData.workerTypeCode,payload))
    //             console.log(payload,'payload')
    //             setEditingRow(null);
    //             setEditMode(false);
    //             showSuccess();   
    //         }
    //     }
        
    // };
    const handleTick = async (rowData) => {
        const trimmedEditedLabel = editedLabel.trim();
        if (!trimmedEditedLabel) {
          showErrorBlankValue();
        } else {
          const isDuplicate = workerTypes.some(
            (r) => r.workerTypeCode !== rowData.workerTypeCode && r.workerTypeName.toLowerCase() === trimmedEditedLabel.toLowerCase()
          );
      
          if (isDuplicate) {
            showErrorDuplicate();
          } else {
            const payload = {
              workerTypeCode: rowData.workerTypeCode,
              workerTypeName: editedLabel 
            };
            dispatch(patchWorkerTypeRequest(rowData.workerTypeCode, payload))
            console.log(payload, 'payload');
            setEditingRow(null);
            setEditMode(false);
            showSuccess();
          }
        }
      };
      

    const handleTickResStatus = async (rowData) => {
        const data = {
            name: rowData.name,
            value: editedResStatus,
            type: 'STRING',
        };
        
        try {
           
            await dispatch(ResourceStatusRequest({data}));
            setEditingResStatusRow(null);
            setEditMode(false); 
            showSuccess();
        } catch (error) {
            console.error('Error dispatching ResourceStatusRequest:', error);
        }
    };

    const handleTickResStatus1 = async (rowData) => {
        const data = {
            name: rowData.name,
            value: editedResStatus1,
            type: 'STRING',
        };
        
        try { 
            await dispatch(ResourceStatusRequest1({data}));
            setEditingResStatusRow(null);
            setEditMode(false); 
            showSuccess();
        } catch (error) {
            console.error('Error dispatching ResourceStatusRequest:', error);  
        }
    };
    

    const showErrorBlankValue = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Please Enter Your Input',
        });
    };

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Value updated Succesfully.',
        });
    };

    const handleCancelEdit = () => {
        setEditingRow(null);
        setEditMode(false);
    };

    const handleCancelResStatusEdit = () => {
        setEditingResStatusRow(null);
        setEditMode(false); // Reset edit mode
    };

    const handleCancelResStatusEdit1 = () => {
        setEditingResStatusRow1(null);
        setEditMode(false); // Reset edit mode
    };

    const inputTextTemplate = (rowData) => {
        return editingRow === rowData.workerTypeCode ? (
            <InputText
                id={`inputLabel_${rowData.workerTypeName}`}
                value={editedLabel}
                onChange={(e) => handleInputChange(e, rowData)}
                autoFocus={pendingAction === `inputLabel_${rowData.workerTypeName}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData.workerTypeName
        );
    };
    const columns = [
        { field: 'workerTypeCode', header: 'Resource Type', body: null, width: '60%' },
        { field: 'workerTypeName', header: '', body: inputTextTemplate, width: '40%' },
    ];

    const inputTextResStatus = (rowData) => {
        return editingResStatusRow === rowData?.value ? (
            <InputText
                id={`inputResStatus_${rowData?.value}`}
                value={editedResStatus}
                onChange={(e) => handleResStatusInputChange(e)}
                autoFocus={pendingAction === `inputResStatus_${rowData?.value}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData?.value
        );
    };

    const inputTextResStatus1 = (rowData) => {
        return editingResStatusRow1 === rowData?.value ? (
            <InputText
                id={`inputResStatus_${rowData?.value}`}
                value={editedResStatus1}
                onChange={(e) => handleResStatusInputChange1(e)}
                autoFocus={pendingAction === `inputResStatus_${rowData?.value}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData?.value
        );
    };

    const resourceStatusColumn = [
        { field: 'name', header: 'Resource Status', body: null, width: '60%' },
        { field: 'value', header: '',
         body: inputTextResStatus, 
         width: '40%' },
    ];
    const resourceStatusColumn1 = [
        { field: 'name', body: null, width: '60%' },
        { field: 'value', header: '',
         body: inputTextResStatus1, 
         width: '40%' },
    ];

    const inputTextDepartment = (rowData) => {
        return editingRowDept === rowData.deptID  ? (
            <InputText
                id={`inputLabel_${rowData.deptID}`}
                value={editDept}
                onChange={(e) => handleInputChangeDepartment(e,rowData)}
                autoFocus={pendingAction === `inputLabel_${rowData.deptName}`}
                ref={inputRef}
                className="form-control"
            />
        ) : (
            rowData.deptName
        );
    };

    const departmentColumn = [
        { field: 'deptName', header: 'Resource Department', body:inputTextDepartment},
    ]

    const handleInputChange = (e) => {
        setEditedLabel(e.target.value);
    };
    const handleResStatusInputChange = (e) => {
        setEditedResStatus(e.target.value);
    };
    const handleResStatusInputChange1 = (e) => {
        setEditedResStatus1(e.target.value);
    };

    const handleInputChangeDepartment = (e) => {
        setEditDept(e.target.value);
    };
    const handleDept = () => {
            setShowDept(true);
    };

    const handleAddDept = (newDept) => {
        const updatedDept = [...addDept,newDept]
        setAddDept(updatedDept)
    }

    
    return (
        <div>
            <div className="row">
                <h4 className="p-text-primary">Resource Settings</h4>
                <h6 className="p-text-primary">Mandatory Onboarding options for resources</h6>
                {/* Resource Type */}
                <div>
                    <Toast ref={toast} />
                </div>
                <div>
                    <InlineEditDataTable data={workerTypes} columns={columns} actionTemplate={actionTemplate} />
                </div>
                <div>
                    <InlineEditDataTable
                        data={dataToDisplay}
                        // data={resStatus}
                        columns={resourceStatusColumn}
                        actionTemplate={actionTemplateResourceStatus}
                    />
                </div>
                <div>
                    <InlineEditDataTable
                        data={dataToDisplay1}
                        // data={resStatus}
                        columns={resourceStatusColumn1}
                        actionTemplate={actionTemplateResourceStatus1}
                    />
                </div>
                {/* addnewButton for Department */}
                <div className="text-end mt-3">
                    {!showDept && (
                        <Button
                            icon="pi pi-plus fw-bold"
                            size="small"
                            type="button"
                            onClick={handleDept}
                            autoFocus={pendingAction === 'inputAddNew'}
                            ref={inputRef}
                        ></Button>
                    )}
                </div>
                <div className="mb-2">
                    {showDept && (
                        <AdminCreateDept
                            // pendingAction={pendingAction}
                            // inputRef={inputRef}
                            showDept={showDept}
                            setShowDept={setShowDept}
                            setAddDept={setAddDept}
                            handleAddDept={handleAddDept}
                            // showSuccess={showSuccess}
                        />
                    )}
                </div>
                <div>
                    <InlineEditDataTable
                        data={addDept}
                        columns={departmentColumn}
                        actionTemplate={actionTemplateDepartment}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminResourceDataTable;


