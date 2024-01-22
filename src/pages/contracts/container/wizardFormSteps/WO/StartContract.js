import React from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomCalander from '../../../../../components/controls/CustomCalender';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import CustomInputPhoneNbr from '../../../../../components/controls/CustomInputPhoneNbr';
// import CustomInputEmail from '../../../../../components/controls/CustomInputEmail';

const StartContract = ({ control, errors ,data}) => {
    const required = false;

    const timesheetOptions = [{ value: 'Validate', label: 'Validate' }];

    const workOrderTypeOptions = [{ value: 'TMIR', label: 'T&M Individual Rate' }];

    const workOrderRoleOptions = [
        { value: 'w2', label: 'w2' },
        { value: 'c2c', label: 'c2c' },
        { value: '1099', label: '1099' },
    ];

    const rateUnitsOptions = [
        { value: 'Hourly', label: 'Hourly' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Monthly', label: 'Monthly' },
    ];

    return (
        <div>
            <div className="fs-5 fw-bold col-12">Work Order</div>

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
            <div className="fs-5 fw-bold col-12">Resource</div>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderResource"
                    labelId="Resource"
                    defaultValue=""
                    required={required}
                    requiredMsg="city.required"
                    placeholder="Select Resource"
                    className="md:col-6 col-12"
                />

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
                    className="md:col-6 col-12"
                />
            </div>
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="workEmail"
                    labelId="Work Email"
                    placeholder='Work Email'
                    defaultValue=""
                    // required={required}
                    requiredMsg="authSignataryEmail.required"
                    className="md:col-6 col-12"
                />
                <CustomInputPhoneNbr
                    control={control}
                    errors={errors}
                    name="workPhone"
                    labelId="Work Phone"
                    maskFormat="(999) 999-9999"
                    defaultValue=""
                    required={required}
                    requiredMsg="authSignataryPhone.required"
                    className="md:col-6 col-12"
                />
            </div>
            <div className="fs-5 fw-bold col-12">Charge Code</div>
            <CustomInputText
                control={control}
                errors={errors}
                name="chargeCodeName"
                labelId="Charge Code Name"
                defaultValue=""
                className="md:col-12"
                required={required}
                requiredMsg="chargeCodeName.required"
                placeholder="Charge Code Name"
            />
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="rates"
                    labelId="rates.label"
                    required={required}
                    requiredMsg="rates.required"
                    defaultValue=""
                    className="md:col-6 sm:col-12"
                    placeholder="Rate"
                />
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="chargeCodeUnits"
                    labelId="chargeCodeUnits.label"
                    defaultValue=""
                    options={rateUnitsOptions}
                    required={required}
                    requiredMsg="chargeCodeUnits.required"
                    placeholder="Select rates"
                    className="md:col-6 sm:col-12"
                />
            </div>
        </div>
    );
};

export default StartContract;
