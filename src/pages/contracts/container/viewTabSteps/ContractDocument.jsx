import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Skeleton } from 'primereact/skeleton';

function ContractDocuments() {
    const { contractSummarySelected } = useSelector((state) => state.contract);

    const selectedCompanyData = contractSummarySelected;
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayFileDialog, setDisplayFileDialog] = useState(false);
    const [idDoc, setIdDoc] = useState();



    const handleFileView = async (file) => {
        setIdDoc(file);
        console.log(idDoc, "idDoc");
        setSelectedFile(file);
        setDisplayFileDialog(true);
        setLoading(true);
        try {
            await handleRetrieve(file);
        } finally {
            setLoading(false);
        }
    };

    const hideFileDialog = () => {
        setDisplayFileDialog(false);
    };



    const [image, setImage] = useState();

    const handleRetrieve = async (file) => {
        try {
            const response = await axios.get(`http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/document/${file}`, {
                responseType: 'arraybuffer', // Important for handling binary data (like images)
            });
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            {selectedCompanyData?.["contractDocuments"].length === 0 && (<div class="formgrid grid m-2">
                <h6 className='p-3'> No Data Available...</h6>
            </div>)}
            {selectedCompanyData?.["contractDocuments"].length > 0 && (
                <div className="formgrid grid col-12">
                    <table className="table m-2">
                        <thead>
                            <tr>
                                <th className="l-width-70">Document Name</th>
                                <th className="l-width-70">Issue Date</th>
                                <th className="l-width-70">Expiry Date</th>
                                <th className="l-width-30">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCompanyData?.["contractDocuments"]?.map((contractBillingDetails, index) => (
                                <tr key={index}>
                                    <td className="text-start">{contractBillingDetails?.documentDef?.documentName || '---'}</td>
                                    <td>{contractBillingDetails?.issueDate || '---'}</td>
                                    <td>{contractBillingDetails?.expiryDate || '---'}</td>
                                    <td className="text-start">
                                        <span
                                            className="cursorPointer pe-3"
                                            onClick={() => handleFileView(contractBillingDetails?.docID)}
                                        >
                                            <i className="pi pi-eye"></i>
                                        </span>
                                        <span
                                            className="cursorPointer"
                                        // onClick={() => removeFileFromTable(index)}
                                        >
                                            {contractBillingDetails?.documentDef?.downloadable === true && (
                                                <a className="pi pi-download" href={`http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/document/${contractBillingDetails?.docID}`} >{''}</a>
                                            )}
                                            {contractBillingDetails?.documentDef?.downloadable === false && (
                                                <a className="pi pi-download" aria-disabled href={`http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/v1/contract/document/${contractBillingDetails?.docID}`} >{''}</a>

                                            )}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <Dialog
                visible={displayFileDialog}
                onHide={hideFileDialog}
                header='File Viewer'
                maximizable
                style={{ width: "700px", height: "500px" }}
                footer={
                    <div className="p-d-flex p-ai-center p-jc-between">
                        <Button
                            label="Close"
                            icon="pi pi-times"
                            onClick={hideFileDialog}
                            className="p-button-text"
                        />
                    </div>
                }
            >
                <div className="p-fluid">
                    {loading ? (
                        <div>
                            <Skeleton width="600px" height="400px" borderRadius="16px"></Skeleton>

                        </div>
                    ) : (
                        selectedFile && (
                            <>
                                <img src={image} style={{ height: '400px', width: '600px', objectFit: 'contain' }} alt="No Img" />
                            </>
                        )
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default ContractDocuments;



