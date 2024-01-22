import React, { useState } from 'react';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomCalander from '../../../../../components/controls/CustomCalender';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

const ChargeCode = ({ control, errors, data, setValue }) => {
    const [tasks, setTasks] = useState([]);
    const [taskEdit, setTaskEdit] = useState(false);
    // const [taskDelete, setTaskDelete] = useState();
    const [taskId, setTaskId] = useState();
    const [chargeCodeData, setChargeCodeData] = useState([]);
    const required = false;
    const workLocations = useSelector((state) => state.workOrder.workLocations);

    const rateUnitsOptions = [
        { value: 'Hourly', label: 'Hourly' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ]
   

    const handleTaskEdit = () => {
        const updatedTaskName = [data.taskName];
        if (taskEdit && taskId !== null && tasks[taskId]) {
            const updatedTasks = [...tasks];
            updatedTasks[taskId] = updatedTaskName;
            setTasks(updatedTasks);
            setTaskEdit(false);
            setTaskId(null);
            setValue('taskName', '');
        } else {
            console.error('Invalid edit state or index');
        }
    };

    const handleTaskDelete = (index) => {
        if (index !== null && tasks[index]) {
            if (taskEdit) {
                setTaskEdit(false);
                setTaskId(null);
                setValue('taskName', '');
            }
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
        } else {
            console.error('Invalid delete index');
        }
    };

    const handleChargeCodeAdd = () => {
        const newData = {};
        const updateChargeCodeData = [...chargeCodeData, newData];
        setChargeCodeData(updateChargeCodeData);
    };

    return (
        <div>
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="chargeCodeWorkLocation"
                    labelId="Work Locations"
                    defaultValue=""
                    required={required}
                    requiredMsg="countryCode.required"
                    placeholder="Select Work Locations"
                    className="md:col-12"
                    options={workLocations.map((location) => ({
                        value: location.workLocationName,
                        label: location.workLocationName,
                    }))}
                />
            </div>
            <CustomInputText
                control={control}
                errors={errors}
                name="chargeCodeName"
                labelId="Charge Code Name"
                defaultValue=""
                className="md:col-12"
            />
            <div>
                <div className="fs-6 fw-bold">Rates</div>
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="rates"
                        labelId="Rate"
                        defaultValue=""
                        className="md:col-6 col-12"
                    />
                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="chargeCodeUnits"
                        labelId="Charge Code Units"
                        defaultValue=""
                        options={rateUnitsOptions}
                        required={required}
                        requiredMsg="countryCode.required"
                        placeholder="Select rates"
                        className="md:col-6"
                    />
                </div>
            </div>
            <div className="md:flex">
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="ratesStartDate"
                    labelId="startDate.label"
                    requiredMsg="selectedOrganizationStartDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6  sm:col-12"
                />
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="ratesEndDate"
                    labelId="endDate.label"
                    defaultValue=""
                    showIcon={true}
                    dateFormat="yy-mm-dd"
                    className="md:col-6 col-12"
                />
            </div>
            <div className="border p-2 border-round mb-3">
                <div className="flex align-items-center gap-5">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="taskName"
                        labelId="Task Name"
                        defaultValue=""
                        className="col-11"
                    />
                    {taskEdit ? (
                        <Button type="button" icon="pi pi-check" onClick={handleTaskEdit} />
                    ) : (
                        <Button
                            type="button"
                            icon="pi pi-plus"
                            onClick={() => {
                                setTasks([...tasks, data.taskName]);
                                setValue('taskName', '');
                            }}
                        />
                    )}
                </div>
                <div>
                    <div className="flex align-items-center justify-content-between">
                        <th>Tasks</th>
                        <th>Actions</th>
                    </div>

                    <div>
                        {tasks.map((task, index) => (
                            <div
                                key={index}
                                className="flex align-items-center justify-content-between px-3 py-2 surface-300 border-bottom-1"
                            >
                                <div>{task}</div>
                                <div>
                                    <i
                                        className="pi pi-pencil cursor-pointer mr-3"
                                        onClick={() => {
                                            setTaskEdit(true);
                                            setValue('taskName', task);
                                            setTaskId(index);
                                        }}
                                    />
                                    <i className="pi pi-trash cursor-pointer" onClick={() => handleTaskDelete(index)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end">
                <Button label="Add" className="w-2 mb-4" size="small" type="button" onClick={handleChargeCodeAdd}/>
            </div>
        </div>
    );
};

export default ChargeCode;

// <div>
//     <DataTable value={chargeCodeData}>
//         <Column field="country" header="Charge Code"></Column>
//         <Column field="workLocationName" header="Work location"></Column>
//         <Column field="state" header="Rate"></Column>
//         <Column field="city" header="Start Date"></Column>
//         <Column field="zip" header="End Data"></Column>
//         <Column header="Options"></Column>
//     </DataTable>
// </div>
