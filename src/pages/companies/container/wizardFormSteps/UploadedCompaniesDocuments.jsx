import { Button } from 'primereact/button';
import React, { useEffect } from 'react';
import CustomDropdown from '../../../../components/controls/CustomDropdown';
import CustomInputText from '../../../../components/controls/CustomInputText';
import CustomCalender from '../../../../components/controls/CustomCalender';
import { fetchCompaniesDocumentRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { useDispatch } from 'react-redux';

const UploadedCompaniesDocuments = ({
    control,
    errors,
    data,
    handleCancel,
    dataById,
    handleImageChange,
    isDropDownClicked,
    handleDropdownChange,
    dataApi,
    handleAddClick,
}) => {
    let required = true;

    const dispatch = useDispatch();
    console.log(dataApi);
    useEffect(() => {
        // dispatch(fetchContractsAssignDocumentRequest());
        dispatch(fetchCompaniesDocumentRequest());
    }, [dispatch]);

    return (
        <div>
            <div className="col-12 md:col-12">
                <CustomDropdown
                    control={control}
                    errors={errors}
                    name="docType"
                    labelId="docType.label"
                    defaultValue=""
                    options={dataApi?.map((data, index) => ({
                        id: index,
                        label: data.documentName,
                        value: data.documentDefID,
                    }))}
                    required={required}
                    placeholder="Select Document type"
                    requiredMsg="docType.required"
                    onChange={handleDropdownChange}
                />
            </div>
            <div className="md:col-12 m-0">
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="documentName"
                    labelId="documentName"
                    defaultValue=""
                    placeholder="Document Name"
                    className="md:col-12"
                    required={required}
                    requiredMsg="documentName.required"
                />
            </div>

            <div className="md:flex">
                <CustomCalender
                    control={control}
                    errors={errors}
                    name="issueDate"
                    labelId="issueDate.label"
                    requiredMsg="issueDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6"
                    disabled={!isDropDownClicked || !dataById.expiryInd}
                />

                <CustomCalender
                    control={control}
                    errors={errors}
                    name="documentEndDate"
                    labelId="documentEndDate.label"
                    requiredMsg="documentEndDate.required"
                    defaultValue=""
                    showIcon={true}
                    required={required}
                    className="md:col-6"
                    disabled={!isDropDownClicked || !dataById.expiryInd}
                    minDate={data?.issueDate}
                />
            </div>

            <div className="col-12 md:col-12">
                <div className="profilepic-border rounded  mt-1 p-5 d-flex justify-content-center align-items-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={!isDropDownClicked}
                        className={!isDropDownClicked && 'disabled-button'}
                        id="imageInput"
                    />
                </div>
            </div>

            <div className="fixed bottom-0 p-sidebar-header w-75 h-custom-10">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-4">
                    <Button label="Cancel" type="button" severity="secondary" onClick={handleCancel} size="small" />
                    <Button label="Submit" size="small" onClick={() => handleAddClick()} />
                </div>
            </div>
        </div>
    );
};

export default UploadedCompaniesDocuments;