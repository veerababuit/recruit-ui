import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { validateFileSize } from './config/validationFileTypes';

function ReusableFileuploadWithTabel({ files, setFiles, validateFileType, name, fileTypes, maxFileSize, setValidationErrors
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [displayFileDialog, setDisplayFileDialog] = useState(false);
    const [fileValidationError, setFileValidationError] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

    const handleFileView = (file) => {
        setSelectedFile(file);
        setDisplayFileDialog(true);
    };

    const hideFileDialog = () => {
        setDisplayFileDialog(false);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        // Check file type
        if (!validateFileType(file, fileTypes)) {
            setFileValidationError(`File types are allowed: ${fileTypes.join(', ')}`);
            return;
        }

        // Check file size
        if (!validateFileSize(file, maxFileSize)) {
            setFileValidationError(`Maximum file size allowed is ${maxFileSize}MB`);
            return;
        }

        setValidationErrors('')
        setFileValidationError('');
        setSelectedFile(file);
        setFiles([...files, file]);
    };

    // const removeFileFromTable = (index) => {
    //     const updatedFiles = [...files];
    //     updatedFiles.splice(index, 1);
    //     setFiles(updatedFiles);
    // };

    const removeFileFromTable = (index) => {
        if (files.length === 1) {
            setDeleteErrorMessage("At least one file should remain in the table.");
            return;
        }

        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        setDeleteErrorMessage('');
    };

    const renderFileTable = () => {
        return (
            <div>
                <h5>Selected Files:</h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="l-width-70">File Name</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file, index) => (
                            <tr key={index}>
                                <td className="text-start">{file.name}</td>
                                <td className="text-start">
                                    <span
                                        className="cursorPointer pe-3"
                                        onClick={() => handleFileView(file)}
                                    >
                                        <i className="pi pi-eye"></i>
                                    </span>
                                    <span
                                        className="cursorPointer"
                                        onClick={() => removeFileFromTable(index)}
                                    >
                                        <i className="pi pi-trash"></i>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {/* <div class=" col-md-12 profilepic-border rounded rounded p-5 d-flex justify-content-center align-items-center">
                <div className=''>
                    <input
                        type="file"
                        name={name}
                        onChange={handleFileInputChange}
                    />
                    <br/>
                    <span>{`File Types: ${fileTypes.join(', ')}`}</span>
                </div>
            </div>
            {fileValidationError && (
                <div className="text-danger">{fileValidationError}</div>
            )}
            {deleteErrorMessage && (
                <div className="text-danger mt-2">{deleteErrorMessage}</div>
            )} */}
            <div className="flex-auto mb-3 d-flex">
                <div className="col-md-12">
                    <input
                        type="file"
                        name={name}
                        onChange={handleFileInputChange}
                    />
                    <br></br>
                    <span>{`File Types: ${fileTypes.join(', ')}`}</span>
                    {fileValidationError && (
                        <div className="text-danger">{fileValidationError}</div>
                    )}
                    {deleteErrorMessage && (
                        <div className="text-danger mt-2">{deleteErrorMessage}</div>
                    )}
                </div>

            </div>

            <div>{files.length > 0 && renderFileTable()}</div>

            {/* Dialog to view file */}
            <Dialog
                visible={displayFileDialog}
                onHide={hideFileDialog}
                header='File Viewer'
                maximizable
                style={{ width: '50vw' }}
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
                    {selectedFile && (
                        <iframe
                            src={URL.createObjectURL(selectedFile)}
                            style={{ width: '100%', height: '500px' }}
                            title="File Viewer"
                        ></iframe>
                    )}
                </div>
            </Dialog>
        </div>
    );
}

export default ReusableFileuploadWithTabel;
