import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import {
    fetchCompaniesActive,
    updateContractRequest,
} from '../../../../../redux/actions/contractActions';
import CustomCalender from '../../../../../components/controls/CustomCalender';
import _ from 'lodash';
import { Toast } from 'primereact/toast';
import moment from 'moment';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';

const ContractProfileTabMode = ({ setActive }) => {
    const { control, 
        setValue, 
        handleSubmit, formState: { errors }, } = useForm();
    const toast = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.contract.contractSummarySelected);
    const companies = useSelector((state) => state.contract.activeCompanies);
    const required = true;
    const AwaitComponentRerender = useRef(false);
    useEffect(() => {
        if(AwaitComponentRerender.current) return;
        AwaitComponentRerender.current = true;
        dispatch(fetchCompaniesActive());
    }, [dispatch]);
    console.log(selectedCompany,"selectedCompany");

    const action = useSelector((state) => state.company.action);

    const createPayload = (updatedCompany) => {
        const formattedStartDate = updatedCompany.startDate ? moment(updatedCompany.startDate).format('YYYY-MM-DD') : null;
        return {
            contractName: updatedCompany.contractName ?? '',
            status:updatedCompany.contractStatus ?? '',
            startDate:formattedStartDate ?? '',
            relatedOrg: {
            organizationID: updatedCompany.name  ?? ''
            },
        };
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    // const DisplayformatDate = (dateString) => {
    //     const date = new Date(dateString);
    //     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    //     const day = date.getDate().toString().padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${month}-${day}-${year}`;
    // };

    const onSubmit = (data) => {
        const updatedCompany = _.merge({}, selectedCompany, data);
        const payload = createPayload(updatedCompany);
        dispatch(updateContractRequest(selectedCompany.contractID, payload));
        setIsEdit(false);
        setActive('all');
    };
    const handleEdit = () => {
        setIsEdit(true);
        setActive('ContractProfileTabMode');
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setActive('all');
    };

    const handleCompanyChange = (selectedValue) => {
        setValue('name', selectedValue.value);
    };
    return (
        <>
            <Toast ref={toast} />
            <div>
                <div className="company-main-text fs-6  p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                    <div className="name-view-heading">Profile</div>
                    {!isEdit && action !== 'view' && (
                        <div className="d-flex justify-content-between align-items-center gap-3">
                            <RiPencilFill
                                onClick={handleEdit}
                                className="cursor-pointer company-primary-text company-main-text fs-4"
                            />
                        </div>
                    )}
                </div>
                {isEdit ? (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="formgrid grid p-3 mb-6">
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="contractName"
                                        labelId="contractName.label"
                                        placeholder="contractName name"
                                        defaultValue={selectedCompany?.contractName}
                                        requiredMsg="contractName.required"
                                        required={required}
                                        autoFocus
                                    />
                                </div> 
                                <div className="col-12 md:col-6">
                                    <CustomDropdown
                                        control={control}
                                        errors={errors}
                                        name="name"
                                        labelId="companyName"
                                        defaultValue={selectedCompany?.relatedOrg?.organizationID || ''}
                                        options={companies.map((company) => ({
                                            value: company.organizationID,
                                            label: company.name,
                                        }))}
                                        onChange={handleCompanyChange}
                                        required={required}
                                        placeholder="Company name"
                                        requiredMsg="companyName.required"
                                    />
                                </div>                                         
                                {/* <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="name"
                                        labelId="companyName"
                                        placeholder="Company name"
                                        defaultValue={selectedCompany?.relatedOrg?.name}
                                        disabled={true}
                                    />
                                </div> */}
                                {/* {effectiveDate ? <small className="text-danger">Active from {effectiveDate}</small> : ''} */}
                                <div className="col-12 md:col-6">
                  <CustomCalender
                    control={control}
                    errors={errors}
                    name="startDate"
                    labelId="selectedOrganizationStartDate.label"
                    defaultValue={selectedCompany?.startDate ? formatDate(selectedCompany?.startDate) : null}
                    placeholder="Start Date"
                    requiredMsg="selectedOrganizationStartDate.required"
                  />
                </div>
                                <div className="col-12 md:col-6">
                                    <CustomInputText
                                        control={control}
                                        errors={errors}
                                        name="status"
                                        labelId="status.label"
                                        placeholder="Status"
                                        defaultValue={selectedCompany?.contractStatus}
                                        requiredMsg="status.required"
                                    />
                                </div>
                            </div>
                            <div className="p-sidebar-header h-custom-10 fixed bottom-0 col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                <Button type="button" severity="secondary" label="Cancel" size="small" className="" onClick={handleCancelEdit} />
                                <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Contract Name</label>
                                <p className="p-text-primary">{selectedCompany?.contractName || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Company Name</label>
                                <p className="p-text-primary">{selectedCompany?.relatedOrg?.name || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Start Date</label>
                                <p className="p-text-primary">{selectedCompany?.startDate || ""}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Status</label>
                                <p className="p-text-primary">{selectedCompany?.contractStatus || ""}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ContractProfileTabMode;