import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FiEdit2 } from 'react-icons/fi';
import PlainLayout from '../../../components/layouts/PlainLayout';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import TitleHeaderOnly from '../../../components/header/TitleHeaderOnly';
import Viewer from '../../../components/viewers/Viewer';
import AddEmergencyContact from './AddEmergencyContact';
import { fetchRelationshipRequest, fetchResourceByIdRequest, updateResourceRequest } from '../../../redux/actions/resourceActions';
import { workerID } from '../WorkerId';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';

const EmployeeEmergencyContact = () => {
    const toast = useRef(null)
    const dispatch = useDispatch()
    const { loading, selectedResource, error, } = useSelector((state) => state.resource);
    const relationships = useSelector((state) => state.resource.relationships);

    const personEmergencyContact = selectedResource?.personLegal?.personEmergencyContact

    const apiRequiest = useRef(false)
    useEffect(() => {
        if(apiRequiest.current)  return
        apiRequiest.current = true
        // const workerID = '826593c7-e272-4554-bebf-e10d16ee7b5a';
        dispatch(fetchResourceByIdRequest(workerID));
        dispatch(fetchRelationshipRequest());
        dispatch(setCurrentPageName('Emergency Contact'));
    }, [dispatch]);

    console.log(personEmergencyContact, "emergencyContact");

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [emergencyContact, setEmergencyContact] = useState(personEmergencyContact || []);
    const [initialEmergencyContact, setInitialEmergencyContact] = useState([...emergencyContact]);
    const [editingRow, setEditingRow] = useState(null);
    const [editMode, setEditMode] = useState(false); // New state variable to track edit mode

    useEffect(() => {
        if (personEmergencyContact) {
            setEmergencyContact(personEmergencyContact);
            setInitialEmergencyContact([...personEmergencyContact]);
        }
    }, [personEmergencyContact]);

    useEffect(() => {
        if (loading) {
            <>
                <h6>Data  loading....</h6>
                {/* <MainTableLoaderSkeleton numRows={emergencyContact.length} /> */}
            </>
        }
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false },);
        }



    }, [emergencyContact, error]); // eslint-disable-line react-hooks/exhaustive-deps


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
        if (editingRow === rowData.personEmergContactId) {
            return (
                <div className="d-flex  ">
                    <div className='me-2'>
                        <Button type="button"
                            icon="pi pi-check"
                            onClick={() => handleTick(rowData)}
                            className="" />
                    </div>
                    <Button
                        type="button"
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
            showError(editActionErrorMessage)
            // alert('Complete the current action first!');
        } else {
            setEditingRow(rowData.personEmergContactId);
            setEditMode(true); // Set edit mode to true
            setInitialEmergencyContact([...emergencyContact]);
        }
    };


    const handleTick = (rowData) => {
        const requiredFields = ['firstName', 'lastName', 'relation', 'emailId', 'phoneNumber'];
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

        const editedIndex = emergencyContact.findIndex((contact) => contact.personEmergContactId === rowData.personEmergContactId);
        if (editedIndex !== -1) {
            // Clean the phone number by removing non-digit characters
            const cleanedPhoneNumber = rowData.phoneNumber?.dialNumber.replace(/\D/g, '') || '';

            const updatedEmergencyContact = {
                ...emergencyContact[editedIndex],
                firstName: rowData.firstName,
                lastName: rowData.lastName,
                relation: rowData.relation,
                emailType: 'test',
                emailId: rowData.emailId,
                phoneType: 'LandLine',
                phoneNumber: {
                    dialNumber: cleanedPhoneNumber,
                },
            };

            const payload = {
                workerID: selectedResource.workerID,
                personLegal: {
                    personEmergencyContact: [updatedEmergencyContact],
                },
            };

            dispatch(updateResourceRequest(selectedResource.workerID, payload));
        }

        setEditingRow(null);
        setEditMode(false);
        showSuccess("Successfully Updated");
    };

    const handleCancelEdit = () => {
        setEmergencyContact([...initialEmergencyContact]); // Restore the initial state when canceling edit
        setEditingRow(null);
        setEditMode(false);
    };


    const handleDelete = async (rowData) => {
        if (editMode) {
            showError(editActionErrorMessage);
        } else {
            try {
                const updatedEmergencyContacts = emergencyContact.filter((item) => item.personEmergContactId !== rowData.personEmergContactId);
                const deletedEmergencyContact = emergencyContact.find((item) => item.personEmergContactId === rowData.personEmergContactId);

                console.log(updatedEmergencyContacts, "deletedependents")

                const payload = {
                    workerID: selectedResource.workerID,
                    personLegal: {
                        personEmergencyContact: [
                            {
                                ...deletedEmergencyContact,
                                deleted: true
                            }
                        ]
                    },
                };

                // Dispatch the update request
                await dispatch(updateResourceRequest(selectedResource.workerID, payload));

                // Update the local state with the updated list (excluding the deleted dependent)
                setEmergencyContact(updatedEmergencyContacts);
                showSuccess("Succussfully Deleted");
            } catch (error) {
                showError(`Failed to delete the row. ${error.message}`); // Show error message with more details
            }
        }
    };

    const handleInputChange = (propertyKey, e, rowData) => {
        const updatedEmergencyContact = emergencyContact.map((item) => {
            if (item.personEmergContactId === rowData.personEmergContactId) {
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

        setEmergencyContact(updatedEmergencyContact);
    };

    const relationshipOptions = relationships.map((relationship, index) => ({
        label: relationship,
        value: index,
    }));

    const handleRelationshipChange = (e, rowData) => {
        const updatedEmergencyContact = emergencyContact.map((item) => {
            if (item.personEmergContactId === rowData.personEmergContactId) {
                return { ...item, relation: e.value };
            }
            return item;
        });

        setEmergencyContact(updatedEmergencyContact);
    };

    const generateInputField = (rowData, propertyKey) => {
        return editingRow === rowData.personEmergContactId ? (
            <InputText
                value={rowData[propertyKey]}
                onChange={(e) => handleInputChange(propertyKey, e, rowData)}

            />
        ) : (
            rowData[propertyKey]
        );
    };

    const inputTextfirstName = (rowData) => {
        return generateInputField(rowData, 'firstName');
    };
    const inputTextlastName = (rowData) => {
        return generateInputField(rowData, 'lastName');
    };

    const renderRelationshipDropdown = (rowData) => {

        return editingRow === rowData.personEmergContactId ? (
            <Dropdown
                value={rowData.relation}
                options={relationshipOptions}
                onChange={(e) => handleRelationshipChange(e, rowData)}
                optionLabel="label"
                placeholder={rowData.relation}
            />
        ) : (
            rowData.relation
        );
    };

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber || phoneNumber.trim() === '') {
            return '(XXX) XXX-XXXX'; // Return '---' if phoneNumber is empty or null
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

        return editingRow === rowData.personEmergContactId ? (
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


    const inputTextEmail = (rowData) => {
        const validateEmail = (email) => {
            // Regular expression for basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const handleInputChangeEmail = (e) => {
            const { value } = e.target;

            if (!validateEmail(value)) {
                showError('Enter a valid email address.');
            } else {
                handleInputChange('emailId', e, rowData);
            }
        };

        return editingRow === rowData.personEmergContactId ? (
            <InputText
                value={rowData.emailId}
                onChange={handleInputChangeEmail}
            />
        ) : (
            rowData.emailId
        );
    };


    const addEmergencyContactActionHandler = () => {
        if (editMode) {
            showError();
        } else {
            setSidebarVisible(true);

        }
    };

    const handleOnHide = () => {
        setSidebarVisible(false);
    };

    return (
        <PlainLayout>
            <Viewer
                visible={sidebarVisible}
                onHide={handleOnHide}
                header={
                    <TitleHeaderOnly
                        onClick={handleOnHide}
                        title={"Add Emergency Contact"}
                    />
                }
                contentComponent={<AddEmergencyContact
                    selectedResource={selectedResource}
                    relationships={relationships}
                    showSuccess={showSuccess}
                    setSidebarVisable={setSidebarVisible}

                />}
            />


            <Toast ref={toast} />
            <div className="company-main-text fs-6 pb-2 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className='name-view-heading'>Emergency Contact</div>
                <div className="d-flex justify-content-between align-items-center gap-3">
                    <Button icon='pi  pi-plus fw-normal fs-5' size='small' severity='primary'
                        onClick={addEmergencyContactActionHandler}
                    />
                </div>
            </div>

            <div className='mt-3'>
                <DataTable value={emergencyContact} size="small" dataKey="id" className="card">
                    <Column field="firstName" header="first Name" body={inputTextfirstName} />
                    <Column field="lastName" header="last Name" body={inputTextlastName} />
                    <Column field="relation" header="Relation" body={renderRelationshipDropdown} />
                    <Column field="phoneNumber" header="Phone Number" body={inputPhoneNumber} />
                    <Column field="emailId" header="Email" body={inputTextEmail} />
                    <Column body={actionTemplate} style={{ textAlign: 'center', width: '6em' }} />
                </DataTable>
            </div>


        </PlainLayout>
    );
};

export default EmployeeEmergencyContact;

