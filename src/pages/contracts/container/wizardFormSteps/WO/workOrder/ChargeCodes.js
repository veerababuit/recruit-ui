import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { useForm } from 'react-hook-form';
import TitleHeaderOnly from '../../../../../../components/header/TitleHeaderOnly';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import moment from 'moment';
import CustomCheckbox from '../../../../../../components/controls/CustomCheckbox';
import { Checkbox } from 'primereact/checkbox';

const ChargeCodes = ({ prevData }) => {

    const [chargeCodeData, setChargeCodeData] = useState([]);
    const [visibleChargeCodes, setVisibleChargeCodes] = useState(false);
    const required = true;

    const rateUnitsOptions = [
        { value: 'Hourly', label: 'Hourly' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ];
    console.log(chargeCodeData, 'chargeCodeData');
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = (data) => {
        const formattedStartDate = prevData.contractStartDate ? moment(prevData.contractStartDate).format('YYYY-MM-DD') : null;
        const myData = {
            id:'ll',
            chargeCodeName: data.chargeCodeName,
            chargeCodeRates: [
                {
                    rate: data.rates,
                    rateFrequency: data.rateFrequency,
                    rateDesc: data.rateDesc || 'NA',
                    startDate: formattedStartDate,
                },
            ],
            enableTimesheet:data.enableTimesheet
        };
        const updatedChargeCodes = [...chargeCodeData, myData];
        setChargeCodeData(updatedChargeCodes);
        setVisibleChargeCodes(false);
        reset();
    };

    const handleSidebarOpen = () => {
        setVisibleChargeCodes(true);
    };

    const handleSidebarClose = () => {
        reset();
        setVisibleChargeCodes(false);
    };

    const startDateColumn = () => {
        return <div>{prevData.contractStartDate ? moment(prevData.contractStartDate).format('MM/DD/YY') : null}</div>;
    };

    const endDateColumn = () => {
        return <div>{prevData.contractEndDate ? moment(prevData.contractEndDate).format('MM/DD/YY') : 'NA'}</div>;
    };

    const checkboxColumn = (rowData) => {
        return (
            <div>
                <Checkbox checked={rowData.enableTimesheet} />
            </div>
        );
    };
    // <Checkbox checked={demo1}  onClick={()=>setDemo1(!demo1)}/>

    const optionsColumn = (rowData) => {
        const handleChargeCodeDelete = () => {};

        const handleChargeCodeEdit = () => {};

        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <i className="pi pi-pencil font-bold mr-4 cursor-pointer" onClick={handleChargeCodeEdit} />
                    <i className="pi pi-trash font-bold mr-4 cursor-pointer" onClick={() => handleChargeCodeDelete()} />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-content-between align-items-center mb-3">
                <div className="fs-5 mb-2">Work Order - Charge Codes</div>
                <Button icon="pi pi-plus fs-5" size="small" type="button" onClick={handleSidebarOpen} />
            </div>

            <Sidebar
                visible={visibleChargeCodes}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleSidebarClose}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Charge Codes" onClick={handleSidebarClose} />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="chargeCodeName"
                        labelId="Charge Code"
                        placeholder="Charge Code"
                        defaultValue=""
                        required={required}
                        requiredMsg="countryCode.required"
                        className="md:col-12"
                    />
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="rateDesc"
                        labelId="Task Description"
                        placeholder="Task Description"
                        defaultValue=""
                        className="md:col-12"
                    />
                    <div className="md:flex">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="rates"
                            labelId="Rate"
                            placeholder="Rate"
                            defaultValue=""
                            required={required}
                            requiredMsg="countryCode.required"
                            className="md:col-6 col-12"
                        />
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="rateFrequency"
                            labelId="Charge Code Units"
                            defaultValue=""
                            options={rateUnitsOptions}
                            required={required}
                            requiredMsg="countryCode.required"
                            placeholder="Select rates"
                            className="md:col-6 col-12"
                        />
                    </div>
                    <CustomCheckbox
                        control={control}
                        errors={errors}
                        name="enableTimesheet"
                        className="md:col-6 col-12"
                        labelId="Enable in Timesheet"
                        defaultValue={false}
                    />
                </div>
                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button label="Cancel" size="small" severity="secondary" onClick={handleSidebarClose} />
                        <Button label="Add" size="small" onClick={handleSubmit(onSubmit)} />
                    </div>
                </div>
            </Sidebar>
            <DataTable value={chargeCodeData}>
                <Column field="chargeCodeName" header="Charge Code"></Column>
                <Column field="chargeCodeRates.0.rate" header="Rate"></Column>
                <Column field="chargeCodeRates.0.rateFrequency" header="Frequency"></Column>
                <Column body={(rowData) => startDateColumn(rowData)} header="start Date"></Column>
                <Column body={(rowData) => endDateColumn(rowData)} header="end Date"></Column>
                <Column body={(rowData) => checkboxColumn(rowData)} header="Enable in Timesheet"></Column>
                <Column body={(rowData) => optionsColumn(rowData)} header="Options"></Column>
            </DataTable>
        </div>
    );
};

export default ChargeCodes;
