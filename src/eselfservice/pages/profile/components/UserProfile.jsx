import React, { useEffect, useRef, useState } from 'react'
import { RiPencilFill } from 'react-icons/ri'
import { useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import CustomInputText from "../../../../components/controls/CustomInputText"
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceByIdRequest, updateResourceRequest } from '../../../../redux/actions/resourceActions';
import { workerID } from '../../WorkerId';
import CustomInputPhoneNbr from '../../../../components/controls/CustomInputPhoneNbr';

function UserProfile() {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { selectedResource } = useSelector((state) => state.resource);

    useEffect(() => {
        // const workerID = '9b343e7f-e145-4b0b-b6c7-7afca7a78c87';
        dispatch(fetchResourceByIdRequest(workerID));
    }, [dispatch]);

    console.log(selectedResource)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const onSubmit = (data) => {
        const { joiningDate, personLegal, workerStatus, employmentType } = data;
        // const workerID = '9b343e7f-e145-4b0b-b6c7-7afca7a78c87';
        const filteredData = {

            joiningDate: formatDate(joiningDate),
            personLegal: {
                givenName: personLegal.givenName,
                familyName: personLegal.familyName,
                preferredName: personLegal.preferredName,
                birthDate: formatDate(personLegal.birthDate),
                gender: personLegal.gender,
                maritalStatus: personLegal.maritalStatus,
            },
            // workerType: {
            //     workerTypeCode: workerType.workerTypeCode,
            //     name: workerType.name,
            // },
            workerStatus,
            employmentType,
        };

        dispatch(updateResourceRequest(workerID, filteredData));

        // const updatedResource = { ...selectedResource, ...updatedData };
        // dispatch(updateResourceRequest(selectedResource.workerID, updatedResource));
        setIsEdit(false);
        // setActive("all");
    };

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false); 
    };

    return (
        <>
            <div className=''>
           
                <div className="company-main-text fs-6 pb-2  fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className='name-view-heading'>User Profile</div>
                    {!isEdit && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                        </div>
                    )}

                </div>
                <Toast ref={toast} />

                {isEdit && (
                    <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                        <div className="formgrid grid p-3">
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="personLegal.givenName"
                                    labelId="firstName.label"
                                    placeholder="first name"
                                    defaultValue={selectedResource?.personLegal?.givenName || ""}
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="personLegal.middleName"
                                    labelId="middleName.label"
                                    placeholder="middle name"
                                    defaultValue={selectedResource?.personLegal?.middleName || ""}

                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="personLegal.familyName"
                                    labelId="lastName.label"
                                    placeholder="last name"
                                    defaultValue={selectedResource?.personLegal?.familyName || ""}
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="personLegal.preferredName"
                                    labelId="displayName.label"
                                    placeholder="Display name"
                                    defaultValue={selectedResource?.personLegal?.preferredName || ""}
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name=""
                                    labelId="primaryEmailId.label"
                                    placeholder="admin@example.com"
                                    // defaultValue={selectedResource?.personLegal?.primaryContactDetails[0]?.emailId}
                                    defaultValue={selectedResource?.personLegal?.primaryContactDetails?.map((item) => item.emailId) || ""}
                                    disabled
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputPhoneNbr
                                    control={control}
                                    errors={errors}
                                    name=""
                                    labelId="primaryPhnNum.label"
                                    placeholder="(999) 999-9999"
                                    // defaultValue={selectedResource?.personLegal?.primaryContactDetails[0]?.emailId}
                                    defaultValue={selectedResource?.personLegal?.primaryContactDetails[0]?.phoneNumber?.dialNumber || ''}
                                    disabled

                                />
                            </div>





                            <div className="p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                                <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                            </div>
                        </div>
                    </form>

                )}

                {!isEdit && (
                    <>
                        <div className="formgrid grid mt-2">
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>First Name</label>
                                <p className="p-text-primary">{selectedResource?.personLegal?.givenName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Middle Name</label>
                                <p className="p-text-p-text-primary">{selectedResource?.personLegal?.middleName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Last Name</label>
                                <p className="p-text-primary">{selectedResource?.personLegal?.familyName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Display Name</label>
                                <p className="p-text-primary">{selectedResource?.personLegal?.preferredName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Primary Email ID</label>
                                <p className="p-text-primary">{selectedResource?.personLegal?.primaryContactDetails.map((item) => item.emailId) || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Primary Phone NO</label>
                                <p className="p-text-primary">
                                    {selectedResource?.personLegal?.primaryContactDetails[0]?.phoneNumber?.dialNumber || ''}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default UserProfile