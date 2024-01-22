import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import _ from 'lodash';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];

const EditAddressDetails = ({ selectedRowData, setViewSidebarVisible }) => {
    const toast = useRef(null);
    const orgAddrescountries = useSelector((state) => state.company.countries);
    const addressType = useSelector((state) => state.adminRole.addressType);

    const { watch, control, setValue, handleSubmit, formState: { errors }, } = useForm();

    // console.log("watch", watch());

    // useEffect(() => {
    // }, [watch('addressType')]);
    
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);
    const action = useSelector((state) => state.company.action);

    const [viewAddress, setViewAddress] = useState(selectedRowData);

    const handleCountryChange = (selectedValue) => {
        setValue('countryCode', selectedValue.target.value);
    };

    const handleAddressType = (selectedValue) => {
        setValue('addressType', selectedValue.target.value);
    };

    const createPayload = (company, updatedAddressIndex) => {
        const updatedAddress = company.orgAddresses[updatedAddressIndex];

        return {
            organizationID: company.organizationID,
            orgAddresses: [
                {
                    ..._.pick(updatedAddress, [
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
                        countryCode: updatedAddress.country?.countryCode
                    },
                    orgAddressType: {
                        addressType: updatedAddress.orgAddressType?.addressType
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

            const payload = createPayload(updatedCompany, updatedAddressIndex);

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
                        <div className="formgrid grid p-3 mb-6" >
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name={`addressName`}
                                    labelId="addressName"
                                    defaultValue={selectedRowData.addressName}
                                    placeholder="Ex: office, home etc.."
                                    autoFocus
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomDropdown
                                    value={watch('addressType')}  
                                    control={control}
                                    errors={errors}
                                    name={`addressType`}
                                    labelId="addressType"
                                    defaultValue={selectedRowData.orgAddressType?.addressType}
                                    options={addressType?.map(type => ({
                                        value: type.addressType,
                                        label: type.displayName
                                    }))}
                                    required={false}
                                    placeholder="Select address type"
                                    // onChange={(selectedValue) => handleAddressType(selectedValue)}
                                    onChange={handleAddressType}
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name={`address1`}
                                    labelId="address1"
                                    defaultValue={selectedRowData.address1}
                                    placeholder="Address line 1"
                                />
                            </div>
                            <div className="col-12 md:col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name={`address2`}
                                    labelId="address2"
                                    defaultValue={selectedRowData.address2}
                                    placeholder="Address line 2"
                                />
                            </div>

                            <div className="col-12 md:col-6">
                                <CustomDropdown
                                    control={control}
                                    errors={errors}
                                    name={`countryCode`}
                                    labelId="countryCode"
                                    defaultValue={selectedRowData.country?.countryCode}

                                    options={orgAddrescountries?.map((country) => ({
                                        value: country.countryCode,
                                        label: country.countryName
                                    }))}
                                    required={false}
                                    placeholder="Select country"
                                    // onChange={(selectedValue) => handleCountryChange(selectedValue)}
                                    onChange={handleCountryChange}
                                />
                            </div>
                            <div className='col-12 md:col-6'>
                                <CustomDropdown
                                    control={control}
                                    errors={errors}
                                    name={`state`}
                                    labelId="state"
                                    defaultValue={selectedRowData.state}
                                    options={options}
                                    required={false}
                                    requiredMsg="state.required"
                                    placeholder="Select state"
                                />
                            </div>
                            <div className='col-12 md:col-6'>
                                <CustomDropdown
                                    control={control}
                                    errors={errors}
                                    name={`city`}
                                    labelId="city"
                                    defaultValue={selectedRowData.city}
                                    options={options}
                                    required={false}
                                    requiredMsg="city.required"
                                    placeholder="Select city"
                                />
                            </div>
                            <div className='col-12 md:col-6'>
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name={`postalCode`}
                                    labelId="postalCode"
                                    defaultValue={selectedRowData.postalCode}
                                    placeholder="Zip"
                                    required={false}
                                    requiredMsg="postalCode.required"
                                />
                            </div>

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
