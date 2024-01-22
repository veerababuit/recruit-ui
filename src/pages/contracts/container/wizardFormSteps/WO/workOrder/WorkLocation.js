import React, { useEffect, useState } from 'react';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCountries,
    fetchCountryUi,
    resetCountryUi,
    storeWorkLocation,
} from '../../../../../../redux/actions/workOrderActions';
import { useForm } from 'react-hook-form';
import moment from 'moment';

const WorkLocations = ({ data }) => {
    // const filteredAddressData = addressData.map(({ id, ...rest }) => rest);
    const dispatch = useDispatch();
    const workLocations = useSelector((state) => state.workOrder.workLocations);
    const countries = useSelector((state) => state.workOrder.countries);
    const countryUi = useSelector((state) => state.workOrder.countryUi);

    const [addressData, setAddressData] = useState(workLocations);
    const [addressError, setAddressError] = useState('');
    const [addressEdit, setAddressEdit] = useState(false);
    const [addressId, setAddressId] = useState(null);

    const required = false;

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm();

    const data1 = watch();

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleCountryChange = (e) => {
        setValue('countryCode', e.target.value);
        const code = e.target.value;
        dispatch(fetchCountryUi({ code }));
    };

    const handleAddressReset = () => {
        setValue('workLocationName', '');
        setValue('addressName', '');
        setValue('countryCode', '');
        dispatch(resetCountryUi([]));
        reset();
    };

    const handleAddressAdd = () => {
        const isDuplicate = addressData.some((item) => item.workLocationName === data1.workLocationName);
        // const formattedStartDate = data1.startDate ? moment(data1.startDate).format('YYYY-MM-DD') : null;
        // const formattedEndDate = data1.endDate ? moment(data1.endDate).format('YY-MM-DD') : null;

        if (!isDuplicate) {
            const myData = {
                id: Math.random(),
                workLocationName: data1.workLocationName,
                startDate: data1.startDate,
                endDate: data1.endDate,
                addressName: data1?.addressName,
                address1: data1?.address1 || null,
                address2: data1?.address2 || null,
                address3: data1?.address3 || null,
                address4: data1?.address4 || null,
                address5: data1?.address5 || null,
                city: data1?.city,
                state: data1?.state,
                postalCode: data1?.postalCode,
                postOfficeBox: data1?.postOfficeBox,
                country: {
                    countryCode: data1.countryCode,
                },
            };
            const updatedAddressData = [...addressData, myData];
            setAddressData(updatedAddressData);
            dispatch(storeWorkLocation(updatedAddressData));
            handleAddressReset();
            setAddressError('');
        } else {
            setAddressError('Duplicate Work Location is not allowed');
        }
    };

    const handleAddressUpdate = () => {
        const isDuplicate = addressData.some(
            (item) => item.workLocationName === data1.workLocationName && item.id !== addressId
        );

        if (!isDuplicate) {
            const updatedAddressData = addressData.map((item) => {
                if (item.id === addressId) {
                    return {
                        ...item,
                        workLocationName: data1.workLocationName,
                        addressName: data1.addressName,
                        startDate: data1.startDate,
                        endDate: data1.endDate,
                        address1: data1.address1,
                        address2: data1.address2,
                        address3: data1.address3,
                        address4: data1.address4,
                        address5: data1.address5,
                        city: data1.city,
                        state: data1.state,
                        postalCode: data1.postalCode,
                        postOfficeBox: data1.postOfficeBox,
                        country: {
                            countryCode: data1.countryCode,
                        },
                    };
                }
                return item;
            });

            setAddressData(updatedAddressData);
            dispatch(storeWorkLocation(updatedAddressData));
            handleAddressReset();
            setAddressEdit(false);
            setAddressId(null);
            setAddressError('');
        } else {
            setAddressError('Duplicate Work Location is not allowed');
        }
    };
    
    const startDateColumn = () => {
        return <div>{data.contractStartDate ? moment(data.contractStartDate).format('MM/DD/YY') : null}</div>;
    };

    const endDateColumn = () => {
        return <div>{data.contractEndDate ? moment(data.contractEndDate).format('MM/DD/YY') : 'NA'}</div>;
    };

    const optionsColumn = (rowData) => {
        const handleAddressDelete = () => {
            const updatedAddressData = addressData.filter((item) => item.id !== rowData.id);
            setAddressData(updatedAddressData);
            dispatch(storeWorkLocation(updatedAddressData));
            setAddressError('');
        };

        const handleAddressEdit = () => {
            console.log(rowData, 'ppt');
            const code = rowData.country.countryCode;
            dispatch(fetchCountryUi({ code }));
            setAddressEdit(true);
            setAddressId(rowData.id);
            setValue('workLocationName', rowData.workLocationName);
            setValue('addressName', rowData.addressName);
            setValue('startDate', rowData.startDate);
            setValue('endDate', rowData.endDate);
            setValue('countryCode', code);
            setValue('address1', rowData.address1);
            setValue('address2', rowData.address2);
            setValue('address3', rowData.address3);
            setValue('address4', rowData.address4);
            setValue('address5', rowData.address5);
            setValue('city', rowData.city);
            setValue('state', rowData.state);
            setValue('postalCode', rowData.postalCode);
            setValue('postOfficeBox', rowData.postOfficeBox);
            setAddressError('');
        };

        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <i
                        className={
                            addressEdit
                                ? 'disabled-button pi pi-pencil font-bold mr-4'
                                : 'pi pi-pencil font-bold mr-4 cursor-pointer'
                        }
                        onClick={handleAddressEdit}
                    />
                    <i
                        className={
                            addressEdit
                                ? 'disabled-button pi pi-trash font-bold mr-4'
                                : 'pi pi-trash font-bold mr-4 cursor-pointer'
                        }
                        onClick={() => handleAddressDelete()}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div>
                <div className="fw-bold fs-3 mb-2">Work Locations</div>
                <div>
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="workLocationName"
                        labelId="workLocationName.label"
                        required={required}
                        requiredMsg="workLocationName.required"
                        className="col-12"
                        defaultValue=""
                        placeholder="Work Location"
                    />
                </div>

                <CustomInputText
                    control={control}
                    errors={errors}
                    name="addressName"
                    required={required}
                    labelId="addressName.label"
                    requiredMsg="addressNameWO.required"
                    className="col-12"
                    defaultValue=""
                    placeholder="Address Name"
                />

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
                    className="col-12"
                    onChange={handleCountryChange}
                    disabled={addressEdit}
                />
                <div className="grid mx-1">
                    {countryUi?.addressLines?.map((ui, i) => {
                        return (
                            <div className="col-6">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name={ui.addressLine}
                                    labelId={ui.displayLabel}
                                    defaultValue=""
                                    placeholder={ui.displayLabel}
                                    required={ui.mandatory}
                                    requiredMsg="address1.required"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="text-danger">{addressError}</div>
                {addressEdit ? (
                    <div className="flex justify-content-end gap-4 mb-3">
                        <Button
                            label="cancel"
                            severity="secondary"
                            className="w-2"
                            size="small"
                            onClick={() => {
                                handleAddressReset();
                                setAddressEdit(false);
                                setAddressId(null);
                            }}
                        />
                        <Button label="Update" className="w-2" size="small" onClick={handleAddressUpdate} />
                    </div>
                ) : (
                    <div className="flex justify-content-end mb-3">
                        <Button label="Add" className="w-2" size="small" onClick={handleSubmit(handleAddressAdd)} />
                    </div>
                )}
                <div>
                    <DataTable value={addressData}>
                        <Column field="workLocationName" header="Work location"></Column>
                        <Column field="country.countryCode" header="Country"></Column>
                        <Column field="addressName" header="Address Name"></Column>
                        <Column body={(rowData) => startDateColumn(rowData)} header="start Date"></Column>
                        <Column body={(rowData) => endDateColumn(rowData)} header="end Date"></Column>
                        <Column body={(rowData) => optionsColumn(rowData)} header="Options"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default WorkLocations;
