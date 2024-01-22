import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchContractsAssignDocumentRequest,
    fetchDocumentRequest,
} from '../../../../../redux/actions/adminResourceRoleAction';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'jspdf-autotable';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import UploadedMsaDocument from './UploadedMsaDocument';
import TitleHeaderOnly from '../../../../../components/header/TitleHeaderOnly';
import { Sidebar } from 'primereact/sidebar';
import { storeDocumentData } from '../../../../../redux/actions/contractActions';
function UploadMsaAndDocument({
    control,
    errors,
    validationErrors,
    handleOnHide,
    setValidationErrors,
    setFooterHide,
    setFinish,
    setValue,
    data,
}) {
    const dispatch = useDispatch();
    const toast = useRef(null);
    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail, life: 3000 });
    };
    const dataApi = useSelector((state) => state.adminRole.contractAssignDocumentsList);
    const dataById = useSelector((state) => state.adminRole.selectedDocumentData);
    const currentContractId = useSelector((state) => state.contract.contractId);
    const selectedDocuments = useSelector((state) => state.contract.selectedDocuments);
    console.log(selectedDocuments);

    const [selectedDoc, setSelectedDoc] = useState(selectedDocuments);
    const [blob, setBlob] = useState(null);
    const [tempSelectedImage, setTempSelectedImage] = useState();
    console.log(tempSelectedImage);
    const [isDropDownClicked, setIsDropDownClicked] = useState(false);
    const [isDocumentSelected, setIsDocumentSelected] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    useEffect(() => {
        dispatch(fetchContractsAssignDocumentRequest());
    }, [dispatch]);

    const handleDropdownChange = (event) => {
        event.stopPropagation();
        const selectedDocumentId = event.target.value;
        setValue('docType', event.target.value);

        dispatch(fetchDocumentRequest(selectedDocumentId));
        setIsDropDownClicked(true);
    };

    useEffect(() => {
        setFooterHide(true);
    }, [setFooterHide]);

    function formatToDdMmYyyy(date) {
        const year = date?.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
    const handleImageChange = (event) => {
        setIsDocumentSelected(true);
        const selectedImage = event.target.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataURL = e.target.result;
            setTempSelectedImage(imageDataURL);

            // Convert data URL to Blob
            const blob = dataURLtoBlob(imageDataURL);
            setBlob(blob);
        };

        reader.readAsDataURL(selectedImage);
    };

    const handleUpload = async () => {
        const contractId = currentContractId;
        const apiUrl = `http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/${contractId}/documentfile`;
        const docDefId = dataById?.documentDefID;
        const issueDate = dataById?.expiryInd ? formatToDdMmYyyy(data.issueDate) : null;
        const expiryDate = dataById?.expiryInd ? formatToDdMmYyyy(data.documentEndDate) : null;
        const formData = new FormData();
        formData.append('contractfile', blob);

        const params = {
            docDefId: docDefId,
            issueDate,
            expiryDate,
        };
        // console.log('Contract ID before dispatch:', contractId);
        // dispatch(uploadDocumentRequest(contractId, formData, { params }));
        try {
            const response = await axios.post(apiUrl, formData, { params: params });

            if (response.status === 200) {
                console.log('Document uploaded successfully.');
                setIsDocumentSelected(false);
                setTempSelectedImage(null);
                setBlob(null);
                document.getElementById('imageInput').value = null;
            } else {
                console.error(`Error uploading document. Status code: ${response.status}, Response: ${response.data}`);
            }
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('en-GB', options);
    };

    const handleAddClick = () => {
        const newDocument = {
            ...dataById,
            docType: dataById.documentName,
            issueDate: dataById?.expiryInd ? formatDate(data.issueDate) : null,
            expiryDate: dataById?.expiryInd ? formatDate(data.documentEndDate) : null,
        };
        const uploadedData = [...selectedDoc, newDocument];
        setSelectedDoc(uploadedData);
        const isDuplicate = selectedDoc.some((doc) => doc.documentDefID === dataById.documentDefID);
        if (isDuplicate) {
            console.error('Document with the same ID already exists. Duplicates are not allowed.');
            showToast('error', 'Error', 'Document with the same ID already exists. Duplicates are not allowed.');
        } else if (
            dataById &&
            data.docType &&
            data.documentName &&
            (!dataById.expiryInd || (dataById.expiryInd && data.issueDate && data.documentEndDate)) &&
            isDocumentSelected
        ) {
            dispatch(storeDocumentData(uploadedData));

            handleUpload();
            showToast('success', 'Success', 'Document uploaded successfully.');

            setValue('docType', '');
            setValue('documentName', '');
            setValue('issueDate', '');
            setValue('documentEndDate', '');
            setBlob(null);
            setTempSelectedImage(null);
            setVisibleRight(false);
        } else {
            console.error('Incomplete data. Please fill in all required fields.');

            showToast('error', 'Error', 'Incomplete data. Please fill in all required fields.');
        }
    };

    useEffect(() => {
        showToast('success', 'Success', 'Contract created successfully.');
    }, []);
    const statusBodyTemplate = (rowData) => {
        const handleStatusUpdate = (e) => {
            e.stopPropagation();
        };
        return <InputSwitch checked={rowData?.expiryInd} onChange={handleStatusUpdate} />;
    };
    const renderIssueDate = (rowData) => {
        return rowData.expiryInd ? rowData.issueDate : '----';
    };

    const renderExpiryDate = (rowData) => {
        return rowData.expiryInd ? rowData.expiryDate : '----';
    };
    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    const handleCancel = () => {
        setVisibleRight(false);
    };
    const handleCreateDocument = () => {
        setVisibleRight(true);
    };

    return (
        <>
            <Sidebar
                visible={visibleRight}
                showCloseIcon={false}
                position="right"
                blockScroll={true}
                className="w-75"
                onHide={handleCancel}
            >
                <div className="w-75 fixed overflow-hidden h-custom-10 top-0">
                    <TitleHeaderOnly title="Upload MSA And Supporting Documents" onClick={handleCancel} />
                </div>
                <div className="flex-wrap fixed p-fluid overflow-y-auto w-75 p-3 right-0 event-body">
                    <UploadedMsaDocument
                        handleCancel={handleCancel}
                        dataById={dataById}
                        handleImageChange={handleImageChange}
                        isDropDownClicked={isDropDownClicked}
                        handleDropdownChange={handleDropdownChange}
                        control={control}
                        errors={errors}
                        validationErrors={validationErrors}
                        handleOnHide={handleOnHide}
                        setValidationErrors={setValidationErrors}
                        setFooterHide={setFooterHide}
                        setFinish={setFinish}
                        setValue={setValue}
                        data={data}
                        dataApi={dataApi}
                        handleAddClick={handleAddClick}
                    />
                </div>
            </Sidebar>
            <Toast ref={toast} />
            <div className="p-1 flex justify-content-between align-items-center border-bottom-1">
                <h4 className="fw-bold text-center "> MSA And Supporting Documents</h4>
            </div>

            {selectedDoc?.length ? (
                <div>
                    <DataTable value={selectedDoc} size="small">
                        <Column field="docType" header="Document Type" />
                        <Column field="documentName" header="Document Name" />
                        <Column field=" expiryInd" header="Expiry Ind" body={statusBodyTemplate} />
                        <Column field="issueDate" header="Issue Date" body={renderIssueDate} />
                        <Column field="expiryDate" header="Expiry Date" body={renderExpiryDate} />
                    </DataTable>
                </div>
            ) : (
                <div className="p-2 text-center mt-4">
                    <div className="pi pi-file fs-3 text-gray "></div>
                    <div>No Documents Available</div>
                    <div className="col-3 m-auto">
                        <Button
                            type="button"
                            label="Upload Document"
                            size="small"
                            severity="primary"
                            onClick={handleCreateDocument}
                        />
                    </div>
                </div>
            )}
            <div className="fixed bottom-0 right-0  w-75 h-custom-10  p-sidebar-header">
                <div className="flex justify-content-end px-5 py-2 align-items-center gap-2">
                    <Button type="button" label="Done" size="small" onClick={() => handleOnHide()} />
                </div>
            </div>
        </>
    );
}
export default UploadMsaAndDocument;
