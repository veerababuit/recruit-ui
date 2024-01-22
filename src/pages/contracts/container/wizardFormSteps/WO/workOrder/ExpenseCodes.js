import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Sidebar } from 'primereact/sidebar';
import { useForm } from 'react-hook-form';
import TitleHeaderOnly from '../../../../../../components/header/TitleHeaderOnly';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import moment from 'moment';
import CustomCheckbox from '../../../../../../components/controls/CustomCheckbox';

const ExpenseCodes = ({prevData}) => {
    const demo = [{ chargeCode: 'klk' }];
    const [visibleExpenseCodes, setVisibleExpenseCodes] = useState(false);
    const required = true;

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const onSubmit = (data) => {
        console.log(data);
    };

    const handleSidebarOpen = () => {
        setVisibleExpenseCodes(true);
    };

    const handleSidebarClose = () => {
        reset();
        setVisibleExpenseCodes(false);
    };

    const startDateColumn = () => {
        return <div>{prevData.contractStartDate ? moment(prevData.contractStartDate).format('MM/DD/YY') : null}</div>;
    };

    const endDateColumn = () => {
        return <div>{prevData.contractEndDate ? moment(prevData.contractEndDate).format('MM/DD/YY') : 'NA'}</div>;
    };

    const optionsColumn = (rowData) => {
        const handleExpenseCodeDelete = () => {};

        const handleExpenseCodeEdit = () => {};

        return (
            <div className="flex justify-content-between align-items-center">
                <div className="flex align-items-center">
                    <i className="pi pi-pencil font-bold mr-4 cursor-pointer" onClick={handleExpenseCodeEdit} />
                    <i
                        className="pi pi-trash font-bold mr-4 cursor-pointer"
                        onClick={() => handleExpenseCodeDelete()}
                    />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex justify-content-between align-items-center mb-3">
                <div className="fs-5 mb-2">Work Order - Expence Codes</div>
                <Button icon="pi pi-plus fs-5" size="small" type="button" onClick={handleSidebarOpen} />
            </div>
            
            <Sidebar
                visible={visibleExpenseCodes}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleSidebarClose}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Add Expense Codes" onClick={handleSidebarClose} />
                </div>

                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <CustomInputText
                    control={control}
                    errors={errors}
                    name="expenseName"
                    labelId="Expense Name"
                    placeholder="Expense Name"
                    defaultValue=""
                    required={required}
                    requiredMsg="countryCode.required"
                    className="md:col-12"
                    />
                    <CustomCheckbox
                    control={control}
                        errors={errors}
                        required={required}
                        name="billable"
                        requiredMsg="remoteWorkLoc"
                        className="md:col-6 col-12"
                        labelId="Billable"
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
            <DataTable value={demo}>
                <Column field="chargeCode" header="Expense Name"></Column>
                <Column body={(rowData) => startDateColumn(rowData)} header="start Date"></Column>
                <Column body={(rowData) => endDateColumn(rowData)} header="end Date"></Column>
                <Column body={(rowData) => endDateColumn(rowData)} header="Billable"></Column>
                <Column body={(rowData) => optionsColumn(rowData)} header="Options"></Column>
            </DataTable>
        </div>
    );
};

export default ExpenseCodes;
