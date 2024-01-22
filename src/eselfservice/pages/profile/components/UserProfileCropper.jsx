import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { setSelectedProfilePicture } from '../../../../redux/actions/headerTitleActions';
import { Button } from 'primereact/button';
import CustomCropper from '../../../../components/imageCropper/CustomCropper';


const UserProfileCropper = ({ setShowUserInfo, selectedImage, setSelectedImage }) => {
    const dispatch = useDispatch();
    const toast = useRef(null);
    const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);
    const [blob, setBlob] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [hide, setHide] = useState(false);


    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Profile picture Updated Successfully',
            life: 3000,
        });
    };

    const getBlob = (blob) => {
        setBlob(blob);
    };



    const handleCrop = async (e) => {
        e.preventDefault();

        if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setCroppedImage(croppedImageUrl);
        }

        setShowCropper(false);
        setHide(true)
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (blob) {
            const croppedImageUrl = URL.createObjectURL(blob);
            setSelectedImage(croppedImageUrl);
            dispatch(setSelectedProfilePicture(croppedImageUrl));
        }

        showSuccess();
        setShowCropper(false);
        setShowUserInfo(true)
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setShowUserInfo(true)
        setSelectedImage(selectedProfilePicture);
    };

    const handleCancel = () => {
        setShowUserInfo(true);
    };


    return (
        <>
            <Toast ref={toast} />
            <div className="grid">
                <div className="col">
                    <div className="">

                        <div>
                            {!hide && (
                                <div className='flex justify-content-center'>
                                    <div className='w-4'>
                                        <div className='fw-bold text-center pb-2'>Update User Profile Picture</div>
                                        <CustomCropper
                                            getBlob={getBlob}
                                            image={selectedImage}
                                            onClickCancel={handleCropCancel}
                                            onClickSave={handleCrop}
                                            buttonLabel="Crop"
                                        />
                                    </div>
                                </div>
                            )}
                            {!showCropper && croppedImage && (
                                <div className="text-center">
                                    <div className="fw-bold">Preview</div>
                                    <img src={croppedImage} alt="Cropped"
                                        style={{
                                            width: '250px',
                                            // height: '200px',
                                            objectFit: 'contain',
                                        }}
                                        className="h-16rem"
                                    />
                                    <div className="flex justify-content-center gap-2 mt-2">
                                        <Button label="Cancel" size="small" severity="secondary" onClick={handleCancel} />
                                        <Button label="Upload" size="small" onClick={handleSave} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileCropper;
