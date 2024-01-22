import React, { useState } from 'react';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import CustomCalander from '../../../../../../components/controls/CustomCalender';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomCheckbox from '../../../../../../components/controls/CustomCheckbox';
import { useSelector } from 'react-redux';

const SelectWorkOrder = ({ control, errors, data, setValue }) => {
    const contracts = useSelector((state) => state.workOrder.activeContracts);
    const [selectedContract, setSelectedContract] = useState(null);

    const required = false;

    const timesheetOptions = [{ value: 'Validate', label: 'Validate' }];

    const workOrderTypeOptions = [{ value: 'TMIR', label: 'T&M Individual Rate' }];

    console.log(contracts,'selectedMsa')

    console.log(selectedContract,'selectedContract')

    return (
        <div>
            <CustomDropdown
                control={control}
                errors={errors}
                name="selectedMsa"
                labelId="MSA"
                options={contracts.map((data) => ({
                    value: data.contractID,
                    label: data.contractName,
                }))}
                onChange={(e) => {
                    setValue('selectedMsa', e.target.value);
                    const selectedContract = contracts.find((contract) => contract.contractID === e.target.value);
                    setSelectedContract(selectedContract);
                }}
                required={required}
                requiredMsg="workOrderNameRate.required"
                placeholder="Select MSA"
                className="col-12"
            />
            <CustomDropdown
                control={control}
                errors={errors}
                name="selectedContractTerms"
                disabled={!data.selectedMsa}
                labelId="Contract Terms"
                options={
                    selectedContract &&
                    selectedContract.contractAccounts.map((data) => ({
                        value: data.contractAccountId,
                        label: data.contractAccountName,
                    }))
                }
                required={required}
                requiredMsg="workOrderNameRate.required"
                placeholder="Select Contract Terms"
                className="col-12"
            />
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="workOrderName"
                    labelId="workOrderName.label"
                    requiredMsg="workOrderName.required"
                    className="col-12 md:col-6"
                    required={required}
                    placeholder="Work Order Name"
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="wbsCode"
                    labelId="wbsCode.label"
                    requiredMsg="wbsCode.required"
                    className="col-12 md:col-6"
                    required={required}
                    placeholder="WBS Code"
                />
            </div>
            <div className="md:flex">
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="contractStartDate"
                    labelId="startDate.label"
                    requiredMsg="startDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6  sm:col-12"
                    placeholder="MM/DD/YYYY"
                />
                <CustomCalander
                    control={control}
                    errors={errors}
                    name="contractEndDate"
                    labelId="endDate.label"
                    defaultValue=""
                    showIcon={true}
                    minDate={data.contractStartDate}
                    className="md:col-6 col-12"
                    placeholder="MM/DD/YYYY"
                />
            </div>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="tsApprovalFlow"
                    labelId="tsApprovalFlow.label"
                    defaultValue=""
                    options={timesheetOptions}
                    required={required}
                    requiredMsg="tsApprovalFlow.required"
                    placeholder="Select Timesheet Approval"
                    className="md:col-6"
                />
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderType"
                    labelId="workOrderType.label"
                    defaultValue=""
                    options={workOrderTypeOptions}
                    required={required}
                    requiredMsg="workOrderType.required"
                    placeholder="Select Work Order Type"
                    className="md:col-6"
                />
            </div>
            <CustomCheckbox
                control={control}
                errors={errors}
                required={required}
                name="netChargeBoo"
                requiredMsg="email"
                className="md:col-6 col-12"
                labelId="Send Invoice to this Work order"
                defaultValue={false}
            />
        </div>
    );
};

export default SelectWorkOrder;
