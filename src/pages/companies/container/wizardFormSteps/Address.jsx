import React, { useEffect } from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';

import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryUi, } from '../../../../redux/actions/workOrderActions';
// import { useForm } from 'react-hook-form';

const Address = ({ setSkip, control, errors, setValue, formData, data }) => {
    const required = true;

    const dispatch = useDispatch();
    const countries = useSelector((state) => state.workOrder.countries);
    const countryUi = useSelector((state) => state.workOrder.countryUi);

    const addressType = useSelector((state) => state.adminRole.addressType);

    const handleAddressType = (selectedValue) => {
        setValue('addressType', selectedValue.target.value);
    };

    useEffect(() => {
        setSkip(true)
    })

    // useEffect(() => {
    //     dispatch(fetchCountries());
    // }, [dispatch]);

    const handleCountryChange = (e) => {
        setValue('orgAddrescountry', e.target.value);
        const code = e.target.value;
        dispatch(fetchCountryUi({ code }));
    };

    // console.log("orgAddrescountry", formData.countryCode);
    // console.log("orgAddrescountry data", data.countryCode);

    return (
        <>
            <div className='formgrid grid mb-6'>
                <div className='col-12 text-center'>
                    <h3>Address</h3>
                </div>
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
                        name="orgAddrescountry"
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
                            // className="md:col-12"
                            />
                        </div>
                    );
                })}

            </div>
        </>
    );
};

export default Address;
