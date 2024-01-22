import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import AddContactDetails from './AddContactDetails';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../../redux/actions/resourceActions';
import { workerID } from '../../WorkerId';
import { InputMask } from 'primereact/inputmask';

const ContactDetails = () => {
    const toast = useRef(null)
    const dispatch = useDispatch()
    const { selectedResource, error } = useSelector((state) => state.resource);

    const secondaryContactDetails = selectedResource?.personLegal?.secondaryContactDetails || ""


    const apiRequiest = useRef(false)
    
    useEffect(() => {
        if(apiRequiest.current)  return
        apiRequiest.current = true
        // const workerID = '353ef016-08d2-4889-a0dd-f6d74d38320a';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);


    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [contactDetails, setContactDetails] = useState(secondaryContactDetails || []);
    const [initialContactDetails, setInitialContactDetails] = useState([...contactDetails]);
    const [editingRow, setEditingRow] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (secondaryContactDetails) {
            setContactDetails(secondaryContactDetails);
            setInitialContactDetails([...secondaryContactDetails]);
        }
    }, [secondaryContactDetails]);

    useEffect(() => {

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false },);
        }


    }, [contactDetails, error]); // eslint-disable-line react-hooks/exhaustive-deps

    const showError = (errorMessage) => {
        toast.current.show({
            severity: "error",
            summary: "Error",
            detail: errorMessage,
        })
    }
    const showSuccess = (message) => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: message,
        })
    }

    const editActionErrorMessage = "Complete the current action first!"


    const actionTemplate = (rowData) => {
        if (editingRow === rowData.personLegalContactID) {
            return (
                <div className="d-flex gap-2">
                    <Button type="button"
                        size='small'
                        icon="pi pi-check"
                        onClick={() => handleTick(rowData)}
                        className="" />

                    <Button
                        type="button"
                        size='small'
                        severity="secondary"
                        icon="pi pi-times"
                        onClick={() => handleCancelEdit()}
                        className=""
                    />
                </div>
            );
        } else {
            return (
                <div className='cursor-pointer d-flex align-item-center gap-4'>
                    <FiEdit2 className="m-1" size="1rem" onClick={() => handleEdit(rowData)} />
                    <AiOutlineDelete className="m-1" size="1rem" onClick={() => handleDelete(rowData)} />
                </div>
            );
        }
    };

    const handleEdit = (rowData) => {
        if (editMode) {
            showError('Complete the current action first!');
        } else {
            setEditingRow(rowData.personLegalContactID); // Change 'id' to 'personLegalContactID' to identify rows
            setEditMode(true);
            setInitialContactDetails([...contactDetails]);
        }
    };


    const handleTick = (rowData) => {
        const requiredFields = ['emailId', 'phoneNumber'];
        const emptyFields = requiredFields.filter(field => {
            if (field === 'phoneNumber') {
                return !rowData[field]?.dialNumber;
            }
            return !rowData[field];
        });

        if (emptyFields.length > 0) {
            const emptyFieldNames = emptyFields.join(', ');
            showError(`Fields (${emptyFieldNames}) must be filled.`);
            return;
        }

        const cleanPhoneNumber = rowData.phoneNumber?.dialNumber.replace(/\D/g, '');

        const editedIndex = contactDetails.findIndex((contact) => contact.personLegalContactID === rowData.personLegalContactID);
        if (editedIndex !== -1) {
            const updatedContactDetails = {
                ...contactDetails[editedIndex],
                emailType: 'test',
                emailId: rowData.emailId,
                phoneType: 'LandLine',
                phoneNumber: {
                    dialNumber: cleanPhoneNumber,
                },
            };


            const payload = {
                workerID: selectedResource.workerID,
                personLegal: {
                    secondaryContactDetails:[updatedContactDetails],
                },
            };

            dispatch(updateResourceRequest(selectedResource.workerID, payload));
        }
        showSuccess("Succussfully Updated")
        setEditingRow(null);
        setEditMode(false);
    };



    const handleCancelEdit = () => {
        setContactDetails([...initialContactDetails]); // Restore the initial state when canceling edit
        setEditingRow(null);
        setEditMode(false);
    };

    const handleDelete = async (rowData) => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            try {
                const updatedContactDetails = contactDetails.filter((item) => item.personLegalContactID !== rowData.personLegalContactID);
                const deletedContactDetail = contactDetails.find((item) => item.personLegalContactID === rowData.personLegalContactID);

                console.log(updatedContactDetails, "deletedependents")
                const payload = {
                    workerID: selectedResource.workerID,
                    personLegal: {
                        secondaryContactDetails: [
                            {
                                ...deletedContactDetail,
                                deleted: true,
                            }
                        ],
                    },
                };

                // Dispatch the update request
                await dispatch(updateResourceRequest(selectedResource.workerID, payload));

                // Update the local state with the updated list (excluding the deleted dependent)
                setContactDetails(updatedContactDetails);
                showSuccess("Succussfully deleted")
            } catch (error) {
                showError(`Failed to delete the row. ${error.message}`); // Show error message with more details
                console.error('Delete request failed:', error);
            }
        }
    };

    const handleInputChange = (propertyKey, e, rowData) => {
        const updatedContactDetails = contactDetails.map((item) => {
            if (item.personLegalContactID === rowData.personLegalContactID) {
                if (propertyKey === 'phoneNumber') {
                    return {
                        ...item,
                        phoneNumber: {
                            ...item.phoneNumber,
                            dialNumber: e.target.value, // Update dialNumber with the new value
                        },
                    };
                }
                return { ...item, [propertyKey]: e.target.value }; // Update other properties normally
            }
            return item;
        });

        setContactDetails(updatedContactDetails);
    };


    const generateInputField = (rowData, propertyKey) => {
        return editingRow === rowData.personLegalContactID ? (
            <InputText
                value={rowData[propertyKey]}
                onChange={(e) => handleInputChange(propertyKey, e, rowData)}

            />
        ) : (
            rowData[propertyKey]
        );
    };

    const inputTextEmail = (rowData) => {
        return generateInputField(rowData, 'emailId');
    };

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber || phoneNumber.trim() === '') {
            return '---------'; // Return '---' if phoneNumber is empty or null
        }
    
        const cleanedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters
        const match = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
    
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
    
        return phoneNumber; // Return original number if format doesn't match
    };

    const inputPhoneNumber = (rowData) => {
        // const dialNumber = rowData.phoneNumber?.dialNumber || rowData.dialNumber;
        const formattedPhoneNumber = formatPhoneNumber(rowData.phoneNumber?.dialNumber || rowData.dialNumber);

        return editingRow === rowData.personLegalContactID ? (
            <span className="p-float-label">
                <InputMask
                    mask="(999) 999-9999"
                    value={formattedPhoneNumber}
                    placeholder="(999) 99-9999"
                    onChange={(e) => handleInputChange('phoneNumber', e, rowData)}
                    slotChar=" " // Use space as a placeholder character
                />
            </span>
        ) : (
            formattedPhoneNumber
        );
    };

    const addContactDetails = () => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            setSidebarVisible(true);

        }
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    return (
        <>
            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Add Contact Details"}
                    />
                }
                contentComponent={<AddContactDetails
                    selectedResource={selectedResource}
                    showSuccess={showSuccess}
                    setSidebarVisable={setSidebarVisible} />}
            />



            <Toast ref={toast} />

            <div className="company-main-text fs-6  fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Contact Details</div>
                <div className="d-flex justify-content-between align-items-center gap-3 pb-2">
                    <Button icon='pi  pi-plus fw-normal fs-5'  size='small' severity='primary'
                        onClick={addContactDetails}
                    />
                </div>
            </div>
            {contactDetails && contactDetails.length > 0 ? (
                <div className='mt-3'>
                    <DataTable value={contactDetails} size="small" dataKey="id" className="card">

                        <Column field="phoneNumber" header="Phone Number" body={inputPhoneNumber} />
                        <Column field="emailId" header="Email" body={inputTextEmail} />
                        <Column body={actionTemplate} style={{ textAlign: 'center', width: '6em' }} />
                    </DataTable>
                </div>
            ) : (
                <div className="mt-3 ">
                    <p>Data is not available.</p>
                </div>
            )}

        </>
    );
};

export default ContactDetails;

