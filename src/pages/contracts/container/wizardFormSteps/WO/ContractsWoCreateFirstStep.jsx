import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveContracts, fetchAllCompanyRequest } from '../../../../../redux/actions/workOrderActions';
import CustomDropdown from '../../../../../components/controls/CustomDropdown';

const ContractsWoCreateFirstStep = ({ control, errors, setValue, data }) => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.workOrder.allCompanies);
    const contracts = useSelector((state) => state.workOrder.activeContracts);

    const [selectedContract, setSelectedContract] = useState(null);
    const [selectedContractTerms, setSelectedContractTerms] = useState(null);
    const required = false;
    useEffect(() => {
        dispatch(fetchAllCompanyRequest());
        dispatch(fetchActiveContracts());
    }, [dispatch]);

    // console.log(selectedContract.contractAccounts[0].contractAccountName, 'pppp');
    console.log(selectedContractTerms, 'pppp');

    return (
        <div>
            <div className="fs-5 fw-bold col-12">Orginations</div>
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    autoFocus
                    name="selectedComapny"
                    labelId="orginations"
                    options={companies.map((data) => ({
                        value: data.organizationID,
                        label: data.name,
                    }))}
                    onChange={(e) => {
                        setValue('selectedComapny', e.target.value);
                        const id = e.target.value;
                        dispatch(fetchActiveContracts({ id }));
                    }}
                    required={required}
                    requiredMsg="workOrderNameRate.required"
                    placeholder="Select Orginations"
                    className="col-12"
                />
                <div className="col-12 flex">
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                </div>
            </div>

            <div className="fs-5 fw-bold col-12">MSA</div>
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="selectedMsa"
                    disabled={!data.selectedComapny}
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
                <div className="col-12 flex">
                    <div className="col-4">
                        <div className="p-text-secondary">contractStatus</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">startDate</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                </div>
            </div>

            <div className="fs-5 fw-bold col-12">Contract Terms</div>
            <div>
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
                    onChange={(e) => {
                        setValue('selectedContractTerms', e.target.value);
                        const selectedContractTerms = selectedContract.contractAccounts.find(
                            (contract) => contract.contractAccountId === e.target.value
                        );
                        setSelectedContractTerms(selectedContractTerms);
                    }}
                    required={required}
                    requiredMsg="workOrderNameRate.required"
                    placeholder="Select Contract Terms"
                    className="col-12"
                />
                <div className="col-12 flex">
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Label</div>
                        <div className="p-text-primary">Text</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContractsWoCreateFirstStep;
