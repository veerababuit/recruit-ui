import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import { createWorkOrder } from '../../../../../../redux/actions/workOrderActions';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const WorkOrderConfirmation = ({ setCurrentStep, currentStep, setFooterHide, formData, data }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        setFooterHide(true);
    }, [setFooterHide]);

    const handleNo = () => {
        setFooterHide(false);
        setCurrentStep(currentStep - 1);
    };

    const handleAdd = () => {
        const formattedStartDate = data.contractStartDate ? moment(data.contractStartDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = data.contractEndDate ? moment(data.contractEndDate).format('YYYY-MM-DD') : null;
        const data1 = {
            contractAccount: {
                contractAccountId:data.selectedContractTerms,
            },
            workOrderName: data.workOrderName,
            workOrderDesc: 'TestDescription',
            startDate: formattedStartDate,
            endDate:formattedEndDate,
            wbsCode: data.wbsCode,
            workOrderType: data.workOrderType,
            multiResource: false,
            tsApprovalFlow: data.tsApprovalFlow,
            workLocations: [
                {
                    startDate: formattedStartDate,
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
                        workerID: data.workOrderResource,
                    },
                    workerTypes: [
                        {
                            workerType: {
                                workerTypeCode: 'WORKER_1099',
                            },
                            supplier: {
                                organizationID: 'bee77b21-de10-4c8d-950a-e806f7549a7f',
                            },
                        },
                    ],
                    remoteWorkLoc: true,
                    workEmail: 'test@gmail.com',
                    workPhone: '9999999999',
                    startDate: '2024-02-01',
                    supervisors: [
                        {
                            role: 'Test',
                            startDate: formattedStartDate,
                            firstName: 'firstName',
                            lastName: 'LastName',
                            email: 'test@gmail.com',
                            phone: '1234567890',
                        },
                    ],
                },
            ],
            workOrderChargeCodes: [
                {
                    chargeCodeName: 'ProjectName',
                    chargeCodeRates: [
                        {
                            rate: '20',
                            rateFrequency: 'Hourly',
                            rateDesc: 'TestDesc',
                            startDate:formattedStartDate,
                        },
                    ],
                },
            ]
        };
        dispatch(createWorkOrder({ data1 }));
    };
    return (
        <div>
            <div>
                <div className="">
                    <div className="flex flex-column align-items-center justify-content-center">
                        <div className="pi pi-exclamation-triangle fs-3 p-2"></div>
                        <h4 className="fw-bold text-center p-2">Do You Want to Create work order</h4>
                        <h5 className="fw-bold text-center p-3">
                            Do you want add additional Info for this Work Order?
                        </h5>
                        <div className="flex justify-content-center align-items-center">
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
        </div>
    );
};

export default WorkOrderConfirmation;
// const data1 = {
//     contractAccount: {
//         contractAccountId: data.selectedContractTerms,
//     },
//     workOrderName: data.workOrderName,
//     workOrderDesc: 'TestDescription',
//     startDate: data.contractStartDate,
//     wbsCode: data.wbsCode,
//     workOrderType: data.workOrderType,
//     multiResource: false,
//     tsApprovalFlow: data.tsApprovalFlow,
//     workLocations: [
//         {
//             startDate: '2024-01-11',
//             addressName: 'Madhapur',
//             address1: 'AyyappaSocity',
//             address2: null,
//             address3: null,
//             address4: null,
//             address5: null,
//             city: 'Hydrabad',
//             state: 'Telangana',
//             postalCode: '500086',
//             postOfficeBox: 'string',
//             country: {
//                 countryCode: 'IN',
//             },
//             geoCode: {
//                 name: 'string',
//                 latitude: 0,
//                 longitude: 0,
//                 altitude: 0,
//             },
//             workLocationName: 'Hydrabad',
//         },
//     ],
//     workOrderResources: [
//         {
//             worker: {
//                 workerID: 'bd585eb4-6caf-475c-a2ee-c74f8370e2fb',
//             },
//             workerTypes: [
//                 {
//                     workerType: {
//                         workerTypeCode: 'WORKER_W2',
//                     },
//                 },
//             ],
//             remoteWorkLoc: true,
//             workEmail: data.workEmail,
//             workPhone: data.workPhone,
//             startDate: data.contractStartDate,
//             supervisor: [],
//         },
//     ],
//     workOrderChargeCodes: [
//         {
//             chargeCodeName: data.chargeCodeName,
//             chargeCodeRates: [
//                 {
//                     rate: data.rates,
//                     rateFrequency: data.chargeCodeUnits,
//                     rateDesc: 'TestDesc',
//                     startDate: data.contractStartDate,
//                 },
//             ],
//         },
//     ],
// };
