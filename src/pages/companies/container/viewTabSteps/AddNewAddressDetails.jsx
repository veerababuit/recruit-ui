import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';
import _ from 'lodash';
// import { fetchAddressTypeRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { fetchCountryUi, } from '../../../../redux/actions/workOrderActions';

const AddNewAddressDetails = ({ setAddSidebarVisible }) => {
    const required = true;

    const toast = useRef(null);
    // const orgAddrescountries = useSelector((state) => state.company.countries);
    const addressType = useSelector((state) => state.adminRole.addressType);
    // console.log(orgAddrescountries, "Countries")
    const { control, setValue, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const selectedCompany = useSelector((state) => state.company.selectedCompany);

    const countries = useSelector((state) => state.workOrder.countries);
    const countryUi = useSelector((state) => state.workOrder.countryUi);

    const handleCountryChange = (e) => {
        setValue('countryCode', e.target.value);
        const code = e.target.value;
        dispatch(fetchCountryUi({ code }));
    };

    const handleAddressType = (selectedValue) => {
        setValue('addressType', selectedValue.target.value);
    };

    const createPayload = (company, newAddress) => {
        return {
            organizationID: company.organizationID,
            orgAddresses: [newAddress],
        };
    };

    // const onSubmit = async (data) => {
    //     const newAddress = {
    //         ..._.pick(data, [
    //             'addressName',
    //             'address1',
    //             'address2',
    //             'address3',
    //             'address4',
    //             'address5',
    //             'city',
    //             'state',
    //             'postalCode',
    //             'postOfficeBox',
    //             'geoCode',
    //             'orgAddressID',
    //             'startDate',
    //             'endDate'
    //         ]),
    //         country: {
    //             countryCode: data.countryCode
    //         },
    //         orgAddressType: {
    //             addressType: data.addressType
    //         }
    //     };

    //     const payload = createPayload(selectedCompany, newAddress);

    //     try {
    //         // Dispatch the updateCompanyRequest action and wait for it to complete
    //         await dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));

    //         // Show success toast
    //         toast.current.show({ severity: 'success', summary: 'Success', detail: 'Address added successfully' });

    //         // Close the sidebar
    //         setAddSidebarVisible(false);
    //     } catch (error) {
    //         // Handle any error, and show an error toast if necessary
    //         toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add address' });
    //     }

    //     // dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
    //     // setAddSidebarVisible(false);
    // };

    const onSubmit = async (data) => {
        const newAddress = {
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
                countryCode: data.countryCode
            },
            orgAddressType: {
                addressType: data.addressType
            }
        };
    
        const payload = createPayload(selectedCompany, newAddress);
    
        try {
            await dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Address added successfully' });
            setAddSidebarVisible(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to add address' });
        }
    };
    

    const handleCancelEdit = () => {
        setAddSidebarVisible(false);
    };

    return (
        <>
            <Toast ref={toast} />
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
                                // className="col-12"
                                defaultValue=""
                                placeholder="Ex: office, home etc.."
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="addressType"
                                labelId="addressType"
                                defaultValue=""
                                options={addressType?.map(type => ({
                                    value: type.addressType,
                                    label: type.displayName
                                }))}
                                onChange={handleAddressType}
                                required={required}
                                requiredMsg="addressType.required"
                                placeholder="Select address type"
                            // className="col-12"
                            />
                        </div>
                        <div className='col-12 md:col-6'>
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name="countryCode"
                                labelId="countryCode"
                                defaultValue=""
                                options={countries.map((country) => ({
                                    value: country.countryCode,
                                    label: country.countryName,
                                }))}
                                required={required}
                                requiredMsg="countryCode.required"
                                placeholder="Select country"
                                // className="col-12"
                                onChange={handleCountryChange}
                            />
                        </div>

                        {countryUi?.addressLines?.map((ui) => {
                            return (
                                <div className='col-12 md:col-6'>
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
                                <Button type="submit" severity="primary" label="Add" size="small" className="ms-2 me-2" />
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </>
    );
};

export default AddNewAddressDetails;
