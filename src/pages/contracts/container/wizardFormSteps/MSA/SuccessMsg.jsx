import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createContractRequest } from '../../../../../redux/actions/contractActions';

function SuccessMsg({ setCurrentStep, currentStep, setFooterHide, handleOnHide, setSkip, formData, reset }) {
    const dispatch = useDispatch();

    useEffect(() => {
        setFooterHide(true);
        setSkip(false);
    }, [setFooterHide, setSkip]);
    const handleNo = () => {
        setCurrentStep(currentStep - 1);
        setFooterHide(false);
    };

    const handleFinish = () => {
        const formattedStartDate = formData.startDate ? moment(formData.startDate).format('YYYY-MM-DD') : null;
        const formattedEndDate = formData.endDate ? moment(formData.endDate).format('YYYY-MM-DD') : null;
        const data1 = {
            contractName: formData.contractName,
            relatedOrg: {
                organizationID: formData.organizationID,
            },
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            contractAccounts: [
                {
                    contractAccountName: formData.contractAccountName,
                    contractBillingDetails: [
                        {
                            billFrequency: formData.billFrequency,
                            paymentDueDays: formData.paymentDueDays,
                            expensesBillBoo: formData.expensesBillBoo,
                        },
                    ],
                },
            ],
            contractDiscounts: 'priceData',
            document: [],
        };

        dispatch(createContractRequest({ data1 }));
    };

    const handleYes = () => {
        setFooterHide(false);
        setCurrentStep(currentStep + 1);
        handleFinish();
    };
    return (
        <div>
            <div className="jumbotron ">
                <div className="col-md-12 text-center ">
                    <div className="pi pi-exclamation-triangle fs-3 p-2"></div>
                    <h4 className="fw-bold text-center p-2"> Are you want Create the Contact ?</h4>

                    <div className=" container d-flex justify-content-center align-items-center">
                        <div className="d-flex col-2 gap-4">
                            <Button
                                type="button"
                                size="small"
                                label="No"
                                severity="secondary"
                                onClick={handleNo}
                            ></Button>
                            <Button label="Yes" size="small" onClick={handleYes}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SuccessMsg;
