import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveContracts, fetchAllCompanyRequest } from '../../../../../../redux/actions/workOrderActions';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';

const SelectClient = ({ control, errors, setValue, data }) => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.workOrder.allCompanies);
    const [selectedClient, setSelectedClient] = useState(null);
    const required = false;
    useEffect(() => {
        dispatch(fetchAllCompanyRequest());
    }, [dispatch]);

    console.log(selectedClient, '456');
    return (
        <div>
            <div>
                <CustomDropdown
                    control={control}
                    errors={errors}
                    autoFocus
                    name="selectedClient"
                    labelId="Client"
                    options={companies.map((data) => ({
                        value: data.organizationID,
                        label: data.name,
                    }))}
                    onChange={(e) => {
                        setValue('selectedClient', e.target.value);
                        const id = e.target.value;
                        dispatch(fetchActiveContracts({ id }));
                        const selected = companies.find((companies) => companies.organizationID === e.target.value);
                        setSelectedClient(selected);
                    }}
                    required={required}
                    requiredMsg="workOrderNameRate.required"
                    placeholder="Select Client"
                    className="col-12"
                />
                <div className="grid col-12">
                    <div className="col-4">
                        <div className="p-text-secondary">Client Name</div>
                        <div className="p-text-primary">{selectedClient?.name ? selectedClient.name : '---'}</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">EIN</div>
                        <div className="p-text-primary">{selectedClient?.taxId ? selectedClient.taxId : '---'}</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Web Address</div>
                        <div className="p-text-primary">
                            {selectedClient?.orgDomains ? selectedClient.orgDomains[0].domain : '---'}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Email ID</div>
                        <div className="p-text-primary">
                            {selectedClient?.orgCommunications
                                ? selectedClient.orgCommunications[0].authSignataryEmail
                                : '---'}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Phone</div>
                        <div className="p-text-primary">
                            {selectedClient?.phoneNumber ? selectedClient.phoneNumber : '---'}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Fax</div>
                        <div className="p-text-primary">{selectedClient?.fax ? selectedClient.fax : '---'}</div>
                    </div>
                    <div className="col-4">
                        <div className="p-text-secondary">Address</div>
                        <div className="p-text-primary">
                            {selectedClient?.orgAddresses ? selectedClient.orgAddresses[0]?.addressName : '---'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectClient;
