import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { createWorkOrder } from '../../../../../../redux/actions/workOrderActions';
import { useDispatch } from 'react-redux';
// import LoginLogo from '../../../../../../assets/images/SuccessIcon.svg';

function SingleResourceWoSuccessMsg({ setCurrentStep, currentStep, setFooterHide, formData, data }) {
    const dispatch = useDispatch();
    useEffect(() => {
        setFooterHide(true);
    }, [setFooterHide]);

    const handleNo = () => {
        setFooterHide(false);
        setCurrentStep(currentStep - 1);
    };

    console.log(data, 'opop');

    const handleAdd = () => {
        const data1 = {
            contractAccount: {
                contractAccountId: data.selectedContractTerms,
            },
            workOrderName: data.workOrderName,
            workOrderDesc: 'TestDescription',
            startDate: data.contractStartDate,
            wbsCode: data.wbsCode,
            workOrderType: data.workOrderType,
            multiResource: false,
            tsApprovalFlow: data.tsApprovalFlow,
            workLocations: [
                {
                    startDate: '2024-01-11',
                    addressName: 'Madhapur',
                    address1: 'AyyappaSocity',
                    address2: null,
                    address3: null,
                    address4: null,
                    address5: null,
                    city: 'Hydrabad',
                    state: 'Telangana',
                    postalCode: '500086',
                    postOfficeBox: 'string',
                    country: {
                        countryCode: 'IN',
                    },
                    geoCode: {
                        name: 'string',
                        latitude: 0,
                        longitude: 0,
                        altitude: 0,
                    },
                    workLocationName: 'Hydrabad',
                },
            ],
            workOrderResources: [
                {
                    worker: {
                        workerID: 'bd585eb4-6caf-475c-a2ee-c74f8370e2fb',
                    },
                    workerTypes: [
                        {
                            workerType: {
                                workerTypeCode: 'WORKER_W2',
                            },
                        },
                    ],
                    remoteWorkLoc: true,
                    workEmail: data.workEmail,
                    workPhone: data.workPhone,
                    startDate: data.contractStartDate,
                    supervisor: [],
                },
            ],
            workOrderChargeCodes: [
                {
                    chargeCodeName: data.chargeCodeName,
                    chargeCodeRates: [
                        {
                            rate: data.rates,
                            rateFrequency: data.chargeCodeUnits,
                            rateDesc: 'TestDesc',
                            startDate: data.contractStartDate,
                        },
                    ],
                },
            ],
        };
        dispatch(createWorkOrder({ data1 }));
        // setCurrentStep(currentStep + 1);
    };

    return (
        <div>
            <div className="jumbotron ">
                <div className="col-md-12 text-center ">
                    <div className="pi pi-exclamation-triangle fs-3 p-2"></div>
                    <h4 className="fw-bold text-center p-2">Do You Want to Create work order</h4>
                    <h5 className="fw-bold text-center p-3">Do you want add additional Info for this Work Order?</h5>
                    <div className=" container d-flex justify-content-center align-items-center">
                        <div className="flex  gap-4">
                            <Button
                                type="button"
                                size="small"
                                label="No"
                                severity="secondary"
                                onClick={handleNo}
                            ></Button>
                            <Button label="Yes" size="small" onClick={handleAdd}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SingleResourceWoSuccessMsg;
