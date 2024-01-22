import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Toast } from 'primereact/toast';
import _ from 'lodash';
import { fetchAddressTypeRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { fetchCountries } from '../../../../redux/actions/companiesActions';
import { updateResourceRequest } from '../../../../redux/actions/resourceActions';

const options = [
    { value: 'option1', label: 'option1' },
    { value: 'option2', label: 'option2' },
    { value: 'option3', label: 'option3' },
    { value: 'option4', label: 'option4' },
];
const addressTypeOptions = [
    { value: 'Personal', label: 'Personal' },
    { value: 'Business', label: 'Business' },
];

const AddAddress = ({selectedResource, setAddSidebarVisible }) => {
    const toast = useRef(null);

    const orgAddrescountries = useSelector((state) => state.company.countries);

    const { control, setValue, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const apiRequiest = useRef(false)
    
    useEffect(() => {
        if(apiRequiest.current)  return
        apiRequiest.current = true
        dispatch(fetchCountries());
    }, [dispatch]);


    const handleCountryChange = (selectedValue) => {
        setValue('countryCode', selectedValue.target.value);
    };

    useEffect(() => {
        dispatch(fetchAddressTypeRequest());
    }, [dispatch]);

const createPayload = (resource, addPersonAddress) => {
    return {
        workerID: resource.workerID,
        personLegal: {
            personAddress: [addPersonAddress] 
        }
    };
};

const onSubmit = (data) => {
    const addPersonAddress = {
        ..._.pick(data, [
            'addressName',
            'address1',
            'address2',
            'addressType',
            'city',
            'state',
            'postalCode',
        ]),
        country: {
            countryCode: data.countryCode
        },

    };

    const payload = createPayload(selectedResource, addPersonAddress);
    dispatch(updateResourceRequest(selectedResource.workerID, payload));
    setAddSidebarVisible(false);
    
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
                    <div className="col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name='addressName'
                            labelId="addressName"
                            defaultValue=''
                            placeholder="Ex: office, home etc.."
                            autoFocus
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name='addressType'
                            labelId="addressType"
                            defaultValue=''
                            options={addressTypeOptions}
                            required={false}
                            placeholder="Select address type"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name='address1'
                            labelId="address1"
                            defaultValue=''
                            placeholder="Address line 1"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name='address2'
                            labelId="address2"
                            defaultValue=''
                            placeholder="Address line 2"
                        />
                    </div>
                    <div className="col-12 md:col-6">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name='countryCode'
                            labelId="countryCode"
                            defaultValue=''
                            options={orgAddrescountries?.map((country) => ({
                                value: country.countryCode,
                                label: country.countryName
                            }))}
                            required={false}
                            placeholder="Select country"
                            onChange={handleCountryChange}
                        />
                    </div>
                    <div className='col-12 md:col-6'>
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name='state'
                            labelId="state"
                            defaultValue=''
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
                            name='city'
                            labelId="city"
                            defaultValue=''
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
                            name='postalCode'
                            labelId="postalCode"
                            defaultValue=''
                            placeholder="Zip"
                            required={false}
                            requiredMsg="postalCode.required"
                        />
                    </div>

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

export default AddAddress;
