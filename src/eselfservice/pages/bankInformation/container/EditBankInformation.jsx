import React from 'react'
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputMask from '../../../../components/controls/CustomInputMask';
import { Button } from 'primereact/button';
import { useForm } from 'react-hook-form';
import { updateResourceRequest } from '../../../../redux/actions/resourceActions';
import { useDispatch } from 'react-redux';
import _ from 'lodash';


function EditBankInformation({selectedResource, showSuccess,handleCancel, selectedAccount }) {
    const required = false;
    console.log(selectedAccount, "selectedAccount")
    const options = [
        { value: 'option1', label: 'option1' },
        { value: 'option2', label: 'option2' },
        { value: 'option3', label: 'option3' },
        { value: 'option4', label: 'option4' },
    ];

    const { control, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const editPersonBankDetails = {
            ..._.pick(data, [
                'accountName',
                'accountNumber',
                'bankName',
                'branchName',
                'bankID',
                'routingNumber',
                'accountType'
            ]),
        };

        const updatedPersonBankDetails = selectedResource.personLegal.personBankDetails.map(account => {
            if (account.personBankDetailsID === selectedAccount.personBankDetailsID) {
                // Update the matched account with edited details
                return {
                    ...account,
                    ...editPersonBankDetails,
                };
            }
            // Keep the other accounts unchanged
            return account;
        });

        const editedBankDetail = updatedPersonBankDetails.find(
            account => account.personBankDetailsID === selectedAccount.personBankDetailsID
        );

        const payload = {
            workerID: selectedResource.workerID,
            personLegal: {
                personBankDetails: [editedBankDetail], // Send only the edited bank detail in an array
            },
        };

        dispatch(updateResourceRequest(selectedResource.workerID, payload));
        handleCancel(); 
        showSuccess("Succussfully Updated")
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="formgrid grid mb-6">
                    <div class=" col-12 md:col-12">
                        <CustomDropdown
                            control={control}
                            errors={errors}
                            name="bankName"
                            labelId="bankName.label"
                            defaultValue={selectedAccount.bankName}
                            options={options}
                            required={required}
                            requiredMsg="Bank name is required"
                            placeholder="Select Bank name"
                            autoFocus
                        />
                    </div>
                    <div class=" col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="accountName"
                            labelId="accountName.label"
                            defaultValue={selectedAccount.accountName}
                            required={required}
                            requiredMsg="firstName.required"
                            placeholder="Account Name"

                        />
                    </div>
                    <div class=" col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="accountNumber"
                            labelId="accountNumber.label"
                            defaultValue={selectedAccount.accountNumber}
                            requiredMsg="lastName.required"
                            placeholder="Account Number"
                        />
                    </div>
                    <div class=" col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="accountType"
                            labelId="accountType.label"
                            defaultValue={selectedAccount.accountType}
                            requiredMsg="lastName.required"
                            placeholder="Account Type"
                        />
                    </div>


                    <div class=" col-12 md:col-6">
                        <CustomInputMask
                            control={control}
                            errors={errors}
                            name="routingNumber"
                            labelId="routingNumber.label"
                            defaultValue={selectedAccount.routingNumber}
                            mask="999999999"
                            required={required}
                            requiredMsg="Routing number is required"
                        />
                    </div>

                    <div class=" col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="branchName"
                            labelId="branchName.label"
                            defaultValue={selectedAccount.branchName}
                            requiredMsg="Bank Address is required"
                            placeholder="Bank Address"
                        />
                    </div>
                    <div class=" col-12 md:col-6">
                        <CustomInputText
                            control={control}
                            errors={errors}
                            name="bankID"
                            labelId="bankID.label"
                            defaultValue={selectedAccount.bankID}
                            requiredMsg="bankID.required"
                            placeholder="Bank ID"
                        />
                    </div>
                </div>
                <div className='col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 p-sidebar-header p-3'>
                    <Button type="button" severity='secondary' label='Cancel' size='small' className="company-secondary-btn" onClick={handleCancel} />
                    <Button type="submit" severity='primary' label='Update' size='small' className="ms-2 me-2" />
                </div>
            </form>
        </>
    )
}

export default EditBankInformation