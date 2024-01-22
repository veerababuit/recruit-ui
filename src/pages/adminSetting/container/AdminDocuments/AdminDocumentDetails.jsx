import React from 'react';
import CustomInputText from '../../../../components/controls/CustomInputText';
import { Checkbox } from 'primereact/checkbox';
import CustomCheckboxDoument from '../../../../components/common/CustomCheckboxDoument';

const AdminContractsDetails = ({
    isEditClick,
    dataById,
    showEditForm,
    setShowEditForm,
    control,
    errors,
    setValue,
    data,
}) => {
    const { downloadable, expiryInd, monitorable, secure } = dataById;

    const onEditButtonClick = () => {
        setShowEditForm(true);
        if (dataById) {
            setValue('documentName', dataById.documentName);
            setValue('docDisplayName', dataById.docDisplayName);
            setValue('checkbox1', downloadable);
            setValue('checkbox2', secure);
            setValue('checkbox3', expiryInd);
            setValue('checkbox4', monitorable);
        }
    };
    const renderInfoSection = (title, content) => (
        <div className="col-sm-12 col-md-4">
            <div className="p-text-secondary">{title}</div>
            <div className="p-text-primary">{content}</div>
        </div>
    );

    const required = true;

    return (
        <>
            {showEditForm ? (
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <form>
                        <div className="formgrid grid p-2 ">
                            <div className="col-12 md:col-6 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="documentName"
                                    labelId="documentNamelabel.label"
                                    required={required}
                                    requiredMsg="documentNamelabel"
                                    placeholder="Document Name"
                                    autoFocus
                                    defaultValue={dataById.documentName}
                                />
                            </div>
                            <div className="col-12 md:col-6 mt-2">
                                <CustomInputText
                                    control={control}
                                    errors={errors}
                                    name="docDisplayName"
                                    labelId="documentDisplayName.label"
                                    required={required}
                                    requiredMsg="documentDisplayName"
                                    placeholder="Document Display Name"
                                />
                            </div>
                            {/* checkbox */}
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox1"
                                labelId="Download"
                                className="col-12 md:col-3"
                            />
                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox2"
                                labelId="Secure"
                                className="col-12 md:col-3"
                            />

                            <CustomCheckboxDoument
                                control={control}
                                name="checkbox3"
                                labelId="Expiry ind"
                                disabled
                                className="col-12 md:col-3"
                                dependentField={{ value: data.checkbox3 }}
                                
                            />
                            {data.checkbox3 && (
                                <CustomCheckboxDoument
                                    control={control}
                                    name="checkbox4"
                                    labelId="Monitorable"
                                    className="col-12 md:col-3"
                                />
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="">
                    <div className="fs-5 fw-bold border-bottom flex align-items-center justify-content-between">
                        <div>Document Details</div>
                        <div>
                            {isEditClick && <i className="pi pi-pencil p-text-primary cursor-pointer" onClick={onEditButtonClick}></i>}
                        </div>
                    </div>

                    <div className="row gutter-1 mt-3 px-2">
                        {renderInfoSection('Document Name', dataById.documentName)}
                        {renderInfoSection('Document Display Name', dataById.docDisplayName)}
                        {renderInfoSection('status', dataById.status)}
                    </div>

                    {/* checkbox */}
                    <div className="flex flex-wrap justify-content-between gap-3 mt-4">
                        <div className="flex align-items-center">
                            <Checkbox checked={downloadable} disabled />
                            <label htmlFor="downloadable" className="ml-2">
                                Downloadable
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={secure} disabled />
                            <label htmlFor="secure" className="ml-2">
                                Secured
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={expiryInd} disabled />
                            <label htmlFor="Expiry Ind" className="ml-2">
                                Expiry Ind
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox checked={monitorable} disabled />
                            <label htmlFor="monitorable" className="ml-2">
                                Monitorable
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminContractsDetails;
