import React, { useState } from 'react';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomCalander from '../../../../../components/controls/CustomCalender';
// import CustomInputText from '../../../../../components/controls/CustomInputText';
import { useSelector } from 'react-redux';
import CustomMultiSelect from '../../../../../components/controls/CustomMultiSelect';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

const ContractResource = ({ control, errors }) => {
    const required = false;
    const workLocations = useSelector((state) => state.workOrder.workLocations);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleChargeCode, setVisibleChargeCode] = useState(false);

    const workOrderRoleOptions = [
        { value: 'w2', label: 'w2' },
        { value: 'c2c', label: 'c2c' },
        { value: '1099', label: '1099' },
    ];

    const optionsColumn = (rowData) => {
        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <i className="pi pi-pencil font-bold mr-4 cursor-pointer" onClick={() => setVisibleRight(true)} />
                    <i className="pi pi-trash font-bold mr-4 cursor-pointer" />
                </div>
            </div>
        );
    };

    const addChargeCodeColumn = (rowData) => {
        return <Button icon="pi pi-plus" onClick={() => setVisibleChargeCode(true)} size="small" />;
    };

    return (
        <div>
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderResource"
                    labelId="Resource"
                    defaultValue=""
                    // options={workOrderTypeOptions}
                    required={required}
                    requiredMsg="city.required"
                    placeholder="Select Resource"
                    className="md:col-12"
                />
            </div>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderRole"
                    labelId="Role"
                    defaultValue=""
                    options={workOrderRoleOptions}
                    required={required}
                    requiredMsg="city.required"
                    placeholder="Select Role"
                    className="md:col-4"
                />
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="startDate"
                    labelId="startDate.label"
                    requiredMsg="selectedOrganizationStartDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-4  sm:col-12"
                />
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="endDate"
                    labelId="endDate.label"
                    defaultValue=""
                    showIcon={true}
                    dateFormat="yy-mm-dd"
                    className="md:col-4"
                />
            </div>

            <Button label="Asign Work location" className="w-5 mb-3" onClick={() => setVisibleRight(true)} />

            <div>
                <DataTable value={workLocations}>
                    <Column field="workLocationName" header="Work location"></Column>
                    <Column body header="Start Date"></Column>
                    <Column body header="End Date"></Column>
                    <Column body={(rowData) => optionsColumn(rowData)} header="Options"></Column>
                </DataTable>
            </div>

            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="workOrderRole"
                        labelId="Work Locations"
                        defaultValue=""
                        options={workLocations.map((location) => ({
                            value: location.workLocationName,
                            label: location.workLocationName,
                        }))}
                        required={required}
                        requiredMsg="city.required"
                        placeholder="Select Location"
                        className="md:col-4"
                    />

                    <CustomCalander
                        control={control}
                        errors={errors}
                        name="startDate"
                        labelId="startDate.label"
                        requiredMsg="selectedOrganizationStartDate.required"
                        defaultValue=""
                        showIcon={true}
                        required={required}
                        className="md:col-4  sm:col-12"
                    />
                    <CustomCalander
                        control={control}
                        errors={errors}
                        name="endDate"
                        labelId="endDate.label"
                        defaultValue=""
                        showIcon={true}
                        dateFormat="yy-mm-dd"
                        className="md:col-4"
                    />
                </div>
                <Button label='Assign Work Location'/>
                <div>
                    <DataTable value={workLocations}>
                        <Column field="workLocationName" header="Work location"></Column>
                        <Column field="country" header="Start Date"></Column>
                        <Column field="state" header="End Date"></Column>
                        <Column body={(rowData) => addChargeCodeColumn(rowData)} header="Assign Charge Codes"></Column>
                    </DataTable>
                </div>
            </Sidebar>

            <Sidebar visible={visibleChargeCode} position="right" onHide={() => setVisibleChargeCode(false)}>
                <h1>ChargeCode</h1>
                <div className="md:flex">
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="workOrderRole"
                        labelId="Charge Code"
                        defaultValue=""
                        options={workLocations.map((location) => ({
                            value: location.workLocationName,
                            label: location.workLocationName,
                        }))}
                        required={required}
                        requiredMsg="city.required"
                        placeholder="Select Location"
                        className="md:col-4"
                    />

                    <CustomCalander
                        control={control}
                        errors={errors}
                        name="startDate"
                        labelId="startDate.label"
                        requiredMsg="selectedOrganizationStartDate.required"
                        defaultValue=""
                        showIcon={true}
                        required={required}
                        className="md:col-4  sm:col-12"
                    />
                    <CustomCalander
                        control={control}
                        errors={errors}
                        name="endDate"
                        labelId="endDate.label"
                        defaultValue=""
                        showIcon={true}
                        dateFormat="yy-mm-dd"
                        className="md:col-4"
                    />
                </div>
                <CustomMultiSelect
                    control={control}
                    errors={errors}
                    name="workOrderRole"
                    labelId="Task Names"
                    defaultValue=""
                    options={workLocations.map((location) => ({
                        value: location.workLocationName,
                        label: location.workLocationName,
                    }))}
                    required={required}
                    requiredMsg="city.required"
                    placeholder="Select Task names"
                    className="md:col-4"
                />
                <Button label="Add" />
                <DataTable value={workLocations}>
                    <Column field="workLocationName" header="Charge Code"></Column>
                    <Column field="country" header="Start Date"></Column>
                    <Column field="state" header="End Date"></Column>
                </DataTable>
            </Sidebar>
        </div>
    );
};

export default ContractResource;
// <div className="md:flex">
//     <CustomMultiSelect
//         control={control}
//         errors={errors}
//         name="workOrderRole"
//         labelId="Work Locations"
//         defaultValue=""
//         options={workLocations.map((location) => ({
//             value: location.workLocationName,
//             label: location.workLocationName,
//         }))}
//         required={required}
//         requiredMsg="city.required"
//         placeholder="Select Role"
//         className="md:col-4"
//     />
//     <CustomDropdown
//         control={control}
//         errors={errors}
//         name="workOrderRole"
//         labelId="Charge Codes"
//         defaultValue=""
//         options={workLocations.map((location) => ({
//             value: location.workLocationName,
//             label: location.workLocationName,
//         }))}
//         required={required}
//         requiredMsg="city.required"
//         placeholder="Select Role"
//         className="md:col-4"
//     />
//     <CustomDropdown
//         control={control}
//         errors={errors}
//         name="workOrderRole"
//         labelId="Role"
//         defaultValue=""
//         options={workOrderRoleOptions}
//         required={required}
//         requiredMsg="city.required"
//         placeholder="Select Role"
//         className="md:col-4"
//     />
// </div>
