import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import _ from 'lodash';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';
import { fetchCountryUi } from '../../../../redux/actions/workOrderActions';

const EditAddressDetails = ({ selectedRowData, setViewSidebarVisible }) => {
    const required = false;


    const toast = useRef(null);
    const addressType = useSelector((state) => state.adminRole.addressType);

    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);
    const action = useSelector((state) => state.company.action);

    const [viewAddress, setViewAddress] = useState(selectedRowData);

    const countries = useSelector((state) => state.workOrder.countries);
    const countryUi = useSelector((state) => state.workOrder.countryUi);

    const { watch, control, setValue, handleSubmit, formState: { errors } } = useForm({
        defaultValues: selectedRowData,
    });

    useEffect(() => {
        if (isEdit && selectedRowData) {
            Object.keys(selectedRowData).forEach((key) => {
                setValue(key, selectedRowData[key]);
            });
        }
    }, [isEdit, selectedRowData, setValue]);

    // const handleCountryChange = (e) => {
    //     // setValue('countryCode', e.target.value);
    //     const code = e.target.value;
    //     dispatch(fetchCountryUi({ code }));
    // };

    // const handleAddressType = (e) => {
    //     setValue('addressType', e.target.value);
    // };

    const createPayload = (company, updatedAddressIndex, data) => {
        const updatedAddress = company.orgAddresses[updatedAddressIndex];
    
        return {
            organizationID: company.organizationID,
            orgAddresses: [
                {
                    ..._.pick(data, [ 
                        'addressName',
                        'address1',
                        'address2',
                        'address3',
                        'address4',
                        'address5',
                        'city',
                        'state',
                        'postalCode',
                        'postOfficeBox',
                        'geoCode',
                        'orgAddressID',
                        'startDate',
                        'endDate'
                    ]),
                    country: {
                        countryCode: data.country?.countryCode  
                    },
                    orgAddressType: {
                        addressType: data.orgAddressType?.addressType  
                    }
                }
            ]
        };
    };
    

    const onSubmit = (data) => {
        const updatedCompany = { ...selectedCompany };
        const updatedAddressIndex = selectedCompany.orgAddresses.findIndex(
            (address) => address.orgAddressID === selectedRowData.orgAddressID
        );
    
        if (updatedAddressIndex !== -1) {
            updatedCompany.orgAddresses[updatedAddressIndex] = {
                ...updatedCompany.orgAddresses[updatedAddressIndex],
                ...data
            };
    
            const payload = createPayload(updatedCompany, updatedAddressIndex, data);
    
            // Update the view state with the new values
            setViewAddress(updatedCompany.orgAddresses[updatedAddressIndex]);
    
            dispatch(updateCompanyRequest(updatedCompany.organizationID, payload));
            setIsEdit(false);
        }
    };
    

    const handleEdit = () => {
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="company-main-text fs-6 p-3 fw-bold border-bottom d-flex justify-content-between align-items-center">
                <div className="name-view-heading">Address</div>
                {(!isEdit && action !== 'view' && selectedCompany?.orgAddresses?.length > 0) && (
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <RiPencilFill onClick={handleEdit} className="cursor-pointer company-primary-text company-main-text fs-4" />
                    </div>
                )}
            </div>

            {isEdit ? (
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formgrid grid p-3 mb-6">
                            <div className='col-12 md:col-6'>
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="addressName"
                                    required={required}
                                    labelId="addressName.label"
                                    requiredMsg="addressName.required"
                                    defaultValue=""
                                    placeholder="Ex: office, home etc.."
                                />
                            </div>
                            <div className='col-12 md:col-6'>
                                <CustomDropdown
                                    control={control}
                                    errors={errors}
                                    name="orgAddressType.addressType"
                                    labelId="addressType"
                                    defaultValue={selectedRowData.orgAddressType?.addressType}
                                    options={addressType?.map(type => ({
                                        value: type.addressType,
                                        label: type.displayName
                                    }))}
                                    // onChange={handleAddressType}
                                    required={required}
                                    requiredMsg="addressType.required"
                                    placeholder="Select address type"
                                />
                            </div>
                            <div className='col-12 md:col-6'>
                                <CustomDropdown
                                    control={control}
                                    errors={errors}
                                    name="country.countryCode"
                                    labelId="countryCode"
                                    defaultValue={selectedRowData.country?.countryCode}
                                    options={countries.map((country) => ({
                                        value: country.countryCode,
                                        label: country.countryName,
                                    }))}
                                    required={required}
                                    requiredMsg="countryCode.required"
                                    placeholder="Select country"
                                    // onChange={handleCountryChange}
                                />
                            </div>

                            {countryUi?.addressLines?.map((ui) => {
                                return (
                                    <div className='col-12 md:col-6' key={ui.addressLine}>
                                        <CustomInputText
                                            control={control}
                                            errors={errors}
                                            name={ui.addressLine}
                                            labelId={ui.displayLabel}
                                            defaultValue=""
                                            placeholder={ui.displayLabel}
                                            required={ui.mandatory}
                                            requiredMsg="address1.required"
                                            className="col-12"
                                        />
                                    </div>
                                );
                            })}

                            <div className="col-12 md:col-6">
                                <div className="p-sidebar-header d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3">
                                    <Button type="button" severity="secondary" label="Cancel" size="small" onClick={handleCancelEdit} />
                                    <Button type="submit" severity="primary" label="Update" size="small" className="ms-2 me-2" />
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    {selectedCompany?.orgAddresses && selectedCompany?.orgAddresses?.length > 0 ? (
                        <div className="formgrid grid m-2">
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Ex: office, home etc..</label>
                                <p className="p-text-primary">{viewAddress?.addressName}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Address Type</label>
                                <p className="p-text-primary">{viewAddress?.orgAddressType?.addressType}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Address Line 1</label>
                                <p className='p-text-primary'>{viewAddress?.address1}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Address Line 2</label>
                                <p className='p-text-primary'>{viewAddress?.address2}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="p-text-secondary">Country</label>
                                <p className="p-text-primary">{viewAddress?.country?.countryName}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>State</label>
                                <p className='p-text-primary'>{viewAddress?.state}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>City</label>
                                <p className='p-text-primary'>{viewAddress?.city}</p>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className='p-text-secondary'>Postal Code</label>
                                <p className='p-text-primary'>{viewAddress?.postalCode}</p>
                            </div>
                        </div>
                    ) : (
                        <h6 className='p-3'>No Data Available</h6>
                    )}
                </>
            )}
        </>
    );
};

export default EditAddressDetails;
