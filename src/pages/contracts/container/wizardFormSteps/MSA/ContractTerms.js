import React, { useState } from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import TitleHeaderOnly from '../../../../../components/header/TitleHeaderOnly';
import CustomCalander from '../../../../../components/controls/CustomCalender';
import CustomCheckbox from '../../../../../components/controls/CustomCheckbox';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ContractTerms = ({ control, errors, data, setValue }) => {
    const required = true;
    const apierr = useSelector((state) => state.contract.error);

    const [priceData, setPriceData] = useState([]);

    const [priceDataEdit, setPriceDataEdit] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    const billpayUnits = [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Weekly', label: 'Weekly' },
        { value: 'Bi_Monthly', label: 'Bi-Monthly' },
        { value: 'Bi_Weekly', label: 'Bi-Weekly' },
        { value: 'SemiMonthly', label: 'Semi-Monthly' },
    ];

    const priceTypeOptions = [
        { value: 'PERCENTAGE', label: 'Percantage' },
        { value: 'MONETARY', label: 'Flat Rate' },
    ];

    const handleAddPriceDetails = () => {
        setVisibleRight(true);
        setValue('priceStartDate', data.startDate);
    };

    const handleSidebarClose = () => {
        setVisibleRight(false);
        setPriceDataEdit(false);
        setValue('discountName', '');
        setValue('priceStartDate', '');
        setValue('priceEndDate', '');
        setValue('netChargeBoo', '');
        setValue('discountType', '');
        setValue('amount', '');
    };

    const handlePriceSubmit = () => {
        const formattedStartDate = data.priceStartDate ? moment(data.priceStartDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = data.priceEndDate ? moment(data.priceEndDate).format('YY-MM-DD') : null;

        const contractDiscounts = {
            discountName: data.discountName,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            netChargeBoo: data.netChargeBoo,
            priority: 1,
            discountStep: [
                {
                    stepThreshold: 0,
                    discountPct: data.discountType === 'PERCENTAGE' ? data.amount : null,
                    discountAmount: data.discountType === 'MONETARY' ? data.amount : null,
                    discountType: data.discountType,
                },
            ],
        };
        setPriceData([...priceData, contractDiscounts]);
    };

    const handlePriceEdit = (index) => {
        const selectedPriceData = priceData[index];

        setValue('discountName', selectedPriceData.discountName);
        setValue('priceStartDate', selectedPriceData.startDate);
        setValue('priceEndDate', selectedPriceData.endDate);
        setValue('netChargeBoo', selectedPriceData.netChargeBoo);
        setValue('discountType', selectedPriceData.discountStep[0].discountType);
        setValue(
            'amount',
            selectedPriceData.discountStep[0].discountPct || selectedPriceData.discountStep[0].discountAmount
        );

        setVisibleRight(true);
        setPriceDataEdit(true);
    };

    // const toastBC = useRef(null);
    // const [visible, setVisible] = useState(false);
    // const clear = () => {
    //     toastBC.current.clear();
    //     setVisible(false);
    // };

    return (
        <div>
            {/* <Toast ref={toastBC} position="top-right" onRemove={clear} /> */}
            <div>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="contractAccountName"
                    required={required}
                    labelId="Contract Term Name"
                    requiredMsg="contractAccountName.required"
                    className="col-12"
                    placeholder="Contract Term Name"
                />
                <div className="border p-2">
                    <div className="fs-6 font-bold">Billing Details</div>

                    <CustomDropdown
                        control={control}
                        errors={errors}
                        name="billFrequency"
                        labelId="Bill Frequency"
                        options={billpayUnits}
                        requiredMsg="billPeriodUnits.required"
                        required={required}
                        placeholder="Select your Bill Period Units"
                        className="md:col-12 col-12"
                        defaultValue="MONTHLY"
                    />

                    <div className="md:flex align-items-end">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="paymentDueDays"
                            required={required}
                            labelId="Payment Due Days"
                            type="number"
                            requiredMsg="paymentDueDays.required"
                            className="md:col-6 col-12"
                            placeholder="Due days"
                        />
                        <CustomCheckbox
                            control={control}
                            errors={errors}
                            required={required}
                            name="expensesBillBoo"
                            requiredMsg="expensesBillBoo.required"
                            className="md:col-6 col-12"
                            labelId="Generate Seperate Bill for Expenses"
                        />
                    </div>
                </div>
            </div>
            <div className="border p-2 mt-3 border-round">
                <div className="flex justify-content-between">
                    <div className="fs-6 font-bold">Price Details</div>
                    <div>
                        <Button icon="pi pi-plus" onClick={handleAddPriceDetails} />
                    </div>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead className="table-light">
                            <th>Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Action</th>
                        </thead>

                        <tbody>
                            {priceData.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.discountName}</td>
                                    <td>{data.discountStep[0].discountType}</td>
                                    <td>{data.discountStep[0].discountPct || data.discountStep[0].discountAmount}</td>
                                    <td>{data.startDate}</td>
                                    <td>{data.endDate}</td>
                                    <td>
                                        <i className="pi pi-pencil cursor-pointer" onClick={handlePriceEdit} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleSidebarClose}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly
                        title={priceDataEdit ? 'Edit Price Details' : 'Add Price Details'}
                        onClick={handleSidebarClose}
                    />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="discountName"
                        required={required}
                        labelId="Name"
                        requiredMsg="email"
                        className="md:col-12 col-12"
                    />
                    <div className="md:flex">
                        <CustomCalander
                            control={control}
                            required={required}
                            showIcon={true}
                            errors={errors}
                            minDate={data.startDate}
                            className="md:col-6 col-12"
                            name="priceStartDate"
                            labelId="startDate.label"
                            requiredMsg="date.required"
                        />
                        <CustomCalander
                            control={control}
                            required={required}
                            showIcon={true}
                            errors={errors}
                            className="md:col-6 col-12"
                            name="priceEndDate"
                            labelId="endTime.label"
                            requiredMsg="date.required"
                        />
                    </div>
                    <div className="md:flex">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="discountType"
                            labelId="Type"
                            options={priceTypeOptions}
                            requiredMsg="email"
                            required={required}
                            placeholder="Select Price Type"
                            className="md:col-6 col-12"
                        />

                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="amount"
                            required={required}
                            labelId="Amount"
                            type="number"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                        />
                    </div>
                    <div>
                        <CustomCheckbox
                            control={control}
                            errors={errors}
                            required={required}
                            name="netChargeBoo"
                            requiredMsg="email"
                            className="md:col-6 col-12"
                            labelId="Net charge"
                        />
                    </div>
                </div>

                <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                    <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                        <Button
                            label="Cancel"
                            type="button"
                            severity="secondary"
                            onClick={handleSidebarClose}
                            size="small"
                        />

                        {priceDataEdit ? (
                            <Button label="Update" size="small" />
                        ) : (
                            <Button label="Add" size="small" onClick={handlePriceSubmit} />
                        )}
                    </div>
                </div>
            </Sidebar>

            <br />
            <span className="text-danger">{apierr}</span>
        </div>
    );
};

export default ContractTerms;
