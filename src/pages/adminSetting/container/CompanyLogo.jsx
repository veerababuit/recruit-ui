import React, { useState, useRef     } from 'react';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogoName } from '../../../redux/actions/headerTitleActions';
import { TenantNameRequest } from '../../../redux/actions/headerTitleActions';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import CustomCropper from '../../../components/imageCropper/CustomCropper';
import addImage from '../../../assets/images/addImage.svg';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
const CompanyLogo = () => {
    const dispatch = useDispatch();
    const toast = useRef(null);
    const selectedImage = useSelector((state) => state.headerTitle.selectedImage);
    const selectedTenantName = useSelector((state) => state.headerTitle.selectedTenantName);
    const [blob, setBlob] = useState(null);
    const [tempSelectedImage, setTempSelectedImage] = useState(selectedImage);
    const [showCropper, setShowCropper] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(selectedTenantName);
    const [croppedImage, setCroppedImage] = useState(null);

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Company Logo Updated Successfully',
            life: 3000,
        });
    };
    const showSuccessName = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Company Name Updated Successfully',
            life: 3000,
        });
    };

    const getBlob = (blob) => {
        setBlob(blob);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                setTempSelectedImage(reader.result);
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
            setTempSelectedImage(URL.createObjectURL(file));
            setShowCropper(true);
        }
    };

    const handleCrop = async (e) => {
        e.preventDefault();

        if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
        }
        setShowCropper(false);
    };

    const handleCancel = () => {
        setShowCropper(false);
        setTempSelectedImage(selectedImage);
    };

    const handleCancelCrop = () => {
        setCroppedImage(null);
        setTempSelectedImage(selectedImage);
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        const data = {
            name: 'COMPANYNAME',
            value: editedValue,
            type: 'STRING',
        };
        dispatch(TenantNameRequest({ data }));
        setEditing(false);
        showSuccessName();
    };

    const handleCancelClick = () => {
        setEditing(false);
        setEditedValue('');
    };

    const handleDeleteIcon = ()=> {
      setTempSelectedImage(null)  
    }

    const apiUrl = 'http://20.42.92.222/recruit-0.0.1-SNAPSHOT/api/raves/reference/v1/tenant/logo';
    const handleUpload = async () => {
        if (!blob) {
            console.error('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('tenantLogo', blob, 'tenantLogo.jpg');

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('API call successful:', response);
            const croppedImageUrl = URL.createObjectURL(blob);
            setTempSelectedImage(croppedImageUrl);
            setCroppedImage(null);
            setShowCropper(false);
            dispatch(fetchLogoName())
            showSuccess();
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <div class="grid">
                <div class="col-12 md:col-3 lg:col-6">
                    <div className="fw-bold">Company logo</div>
                    <div class="card text-center p-3 border-round-sm mt-2 ">
                    <span className='text-end'>
                    <AiOutlineDelete className="cursor-pointer" size="1.2rem" onClick={handleDeleteIcon}  />
                    </span>
                        {croppedImage && (
                            <div className="text-center">
                                <div className="fw-bold">Preview</div>
                                <img
                                    src={croppedImage}
                                    alt="Cropped"
                                    // className="w-auto h-auto"
                                    style={{
                                        width: '130px',
                                        height: '130px',
                                        objectFit: 'contain',
                                        border: '2px solid #CCC',
                                    }}
                                />
                                <div className="flex justify-content-center gap-2 mt-2">
                                    <Button size="small" severity="secondary" onClick={handleCancelCrop}>
                                        Cancel
                                    </Button>
                                    <Button size="small" onClick={handleUpload}>
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        )}
                        {!showCropper && !croppedImage && (
                            <div>
                                <div className="image-uploader-container">
                                    {tempSelectedImage && (
                                        <div className="">
                                            <img
                                                src={tempSelectedImage}
                                                alt="Selected"
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'contain',
                                                    border: '2px solid #CCC',
                                                }}
                                            />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="imageInput"
                                        className="image-input"
                                    />

                                    <div className="">
                                        <img
                                            src={addImage}
                                            alt="addImage"
                                            className=""
                                            onClick={() => document.getElementById('imageInput').click()}
                                            style={{
                                                position: 'absolute',
                                                bottom: '-10px',
                                                right: '-10px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {showCropper && (
                            <div className="">
                                <div>
                                    <CustomCropper
                                        getBlob={getBlob}
                                        image={tempSelectedImage}
                                        onClickCancel={handleCancel}
                                        onClickSave={handleCrop}
                                        buttonLabel="Crop"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div class="col-12 md:col-3 lg:col-6">
                    <div className="fw-bold">Company Name</div>
                    <div className="card mt-2">
                        {!isEditing && (
                            <div className="flex justify-content-between p-6">
                                <div className="text-truncate">{editedValue}</div>
                                <div>
                                    <Button
                                        size="small"
                                        severity="secondary"
                                        icon="pi pi-pencil"
                                        onClick={handleEditClick}
                                    />
                                </div>
                            </div>
                        )}
                        {isEditing && (
                            <div className="p-4">
                                <div>
                                    <InputText
                                        value={editedValue}
                                        onChange={(e) => setEditedValue(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div>
                                    <div className="d-flex gap-2 justify-content-end mt-2">
                                        <Button size="small" icon="pi pi-check" onClick={handleSaveClick} />
                                        <Button
                                            size="small"
                                            severity="secondary"
                                            icon="pi pi-times"
                                            onClick={handleCancelClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompanyLogo;
