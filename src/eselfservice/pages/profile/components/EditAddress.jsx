import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../../../redux/actions/companiesActions';
import _ from 'lodash';
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


function EditAddress({selectedResource,selectedAddress,onUpdate,handleCancelEdit}) {
const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm();
    const orgAddrescountries = useSelector((state) => state.company.countries);

    const apiRequiest = useRef(false)

    useEffect(() => {
        if(apiRequiest.current)  return
        apiRequiest.current = true
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleCountryChange = (selectedValue) => {
        setValue('countryCode', selectedValue.target.value);
    };



    // const onSubmit = (data) => {
    //     const editPersonAddress = {
    //         ..._.pick(data, [
    //             'addressName',
    //             'address1',
    //             'address2',
    //             'addressType',
    //             'city',
    //             'state',
    //             'postalCode',
    //         ]),
    //         country: {
    //             countryCode: data.countryCode
    //         },

    //     };

    // console.log(editPersonAddress,"123456")
    //     const updatedPersonAddress = selectedResource.personLegal.personAddress.map( personAddress => {
    //             if (personAddress.personAddressID === selectedAddress.personAddressID) {
    //                 // Update the matched account with edited details
    //                 return {
    //                     ...personAddress,
    //                     ...editPersonAddress,
    //                 };
    //             }
    //             // Keep the other accounts unchanged
    //             return personAddress;
    //         }
    //     );

    //     const editedPersonAddress = updatedPersonAddress.find(
    //         address => address.personAddressID === selectedAddress.personAddressID
    //     );
    
    //     const payload = {
    //         workerID: selectedResource.workerID,
    //         personLegal: {
    //             personAddress: [editedPersonAddress],
    //         },
    //     };
    
    //     dispatch(updateResourceRequest(selectedResource.workerID, payload));

    //     onUpdate(updatedPersonAddress); // Pass the updated data to the main component
    //   };


    const onSubmit = (data) => {
        const editPersonAddress = {
            personAddressID: selectedAddress.personAddressID, 
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

        const payload = {
            workerID: selectedResource.workerID,
            personLegal: {
                personAddress: [editPersonAddress], // Wrap the edited address in an array
            },
        };

        // Dispatch the payload to update the backend
        dispatch(updateResourceRequest(selectedResource.workerID, payload));

        // Pass the updated data to the main component if needed
        onUpdate(editPersonAddress); // Pass the updated data to the main component
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formgrid grid p-3 mb-6">
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='addressName'
                                labelId="Label"
                                defaultValue={selectedAddress.addressName}
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
                                defaultValue={selectedAddress.addressType}
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
                                defaultValue={selectedAddress.address1}
                                placeholder="Address line 1"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomInputText
                                control={control}
                                errors={errors}
                                name='address2'
                                labelId="address2"
                                defaultValue={selectedAddress.address2}
                                placeholder="Address line 2"
                            />
                        </div>
                        <div className="col-12 md:col-6">
                            <CustomDropdown
                                control={control}
                                errors={errors}
                                name='countryCode'
                                labelId="countryCode"
                                defaultValue={selectedAddress?.country?.countryCode }
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
                                defaultValue={selectedAddress.state}
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
                                defaultValue={selectedAddress.city}
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
                                defaultValue={selectedAddress.postalCode}
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


        </div>
    )
}

export default EditAddress