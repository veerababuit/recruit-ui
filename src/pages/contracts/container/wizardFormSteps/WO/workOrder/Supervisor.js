import React, { useEffect } from 'react';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../../../../components/controls/CustomInputPhoneNbr';

const Supervisor = ({ control, errors, setSkip }) => {
    const required = true;
    useEffect(() => {
        setSkip(true);
    }, [setSkip]);
    return (
        <div>
            <div className="fs-4 mb-2">Supervisor Info (Client)</div>
            <div>
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisor"
                        labelId="supervisor.label"
                        requiredMsg="supervisor.required"
                        className="col-12 md:col-6"
                        required={required}
                        placeholder="Supervisor Name"
                    />
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisorTitle"
                        labelId="supervisorTitle.label"
                        requiredMsg="supervisorTitle.required"
                        className="col-12 md:col-6"
                        required={required}
                        placeholder="Supervisor Title"
                    />
                </div>
                <div className="md:flex">
                    <CustomInputText
                        control={control}
                        errors={errors}
                        name="supervisorEmail"
                        labelId="supervisorEmail.label"
                        requiredMsg="supervisorEmail.required"
                        className="col-12 md:col-6"
                        required={required}
                        placeholder="Work Order Name"
                    />
                    <CustomInputPhoneNbr
                        control={control}
                        errors={errors}
                        name="supervisorPhone"
                        labelId="supervisorPhone.label"
                        maskFormat="(999) 999-9999"
                        defaultValue=""
                        required={required}
                        requiredMsg="supervisorPhone.required"
                        className="md:col-6 col-12"
                    />
                </div>
            </div>
        </div>
    );
};

export default Supervisor;
