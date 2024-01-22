import React, { useEffect } from 'react';
import CustomDropdown from '../../../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../../../components/controls/CustomInputText';
import CustomInputPhoneNbr from '../../../../../../components/controls/CustomInputPhoneNbr';
import { useDispatch, useSelector } from 'react-redux';
import CustomCheckbox from '../../../../../../components/controls/CustomCheckbox';
import { fetchWorkerAttributeRequest } from '../../../../../../redux/actions/adminResourceRoleAction';
import { fetchResourceRequest } from '../../../../../../redux/actions/resourceActions';

const AddResource = ({ control, errors, setValue, data }) => {
    const { resources } = useSelector((state) => state.resource);
    const dispatch = useDispatch();
    const required = false;

    console.log(resources, 'resources');

    useEffect(() => {
        dispatch(fetchWorkerAttributeRequest());
        dispatch(fetchResourceRequest());
    }, [dispatch]);

    const workOrderRoleOptions = [
        { value: 'w2', label: 'w2' },
        { value: 'c2c', label: 'c2c' },
        { value: '1099', label: '1099' },
    ];

    console.log(data.remoteWorkLoc,'remoteWorkLoc')
    return (
        <div>
            <div className="md:flex">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderResource"
                    labelId="resource.label"
                    defaultValue=""
                    options={resources.map((data) => ({
                        value: data.workerID,
                        label: data.personLegal.preferredName,
                    }))}
                    required={required}
                    requiredMsg="resource.required"
                    placeholder="Select Resource"
                    className="md:col-6 col-12"
                />
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="workOrderRole"
                    labelId="userRole.label"
                    defaultValue=""
                    // options={workerTypes.map((workerType) => ({
                    //     value: workerType.workerTypeCode,
                    //     label: workerType.workerTypeName,
                    // }))}
                    options={workOrderRoleOptions}
                    required={required}
                    requiredMsg="role.required"
                    placeholder="Select Role"
                    className="md:col-6 col-12"
                />
            </div>
            <div className="md:flex">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="workEmail"
                    labelId="workEmail.label"
                    requiredMsg="workEmail.required"
                    className="col-12 md:col-6"
                    required={required}
                    placeholder="Work Email"
                />
                <CustomInputPhoneNbr
                    control={control}
                    errors={errors}
                    name="workPhone"
                    labelId="workPhone.label"
                    maskFormat="(999) 999-9999"
                    defaultValue=""
                    required={required}
                    requiredMsg="workPhone.required"
                    className="md:col-6 col-12"
                    placeholder="Work Phone"
                />
            </div>
            <CustomInputText
                control={control}
                errors={errors}
                name="jobTitle"
                labelId="jobTitle.label"
                requiredMsg="jobTitle.required"
                className="col-12 md:col-6"
                required={required}
                placeholder="Job Title"
            />
            <CustomCheckbox
                control={control}
                errors={errors}
                required={required}
                name="remoteWorkLoc"
                requiredMsg="remoteWorkLoc"
                className="md:col-6 col-12"
                labelId="remoteWorkLoc.label"
                defaultValue={false}
            />
        </div>
    );
};

export default AddResource;
