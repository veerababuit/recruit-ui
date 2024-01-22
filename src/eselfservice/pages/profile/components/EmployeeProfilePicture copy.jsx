import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import companyIcon from '../../../../assets/images/google-icon.png';
import { Toast } from 'primereact/toast';
import { setSelectedProfilePicture } from '../../../../redux/actions/headerTitleActions';
import { Button } from 'primereact/button';
import addImage from "../../../../assets/images/addImage.svg"
import CustomCropper from '../../../../components/imageCropper/CustomCropper';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';

const EmployeeProfilePicture = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);
  const [blob, setBlob] = useState(null);
  const [tempSelectedImage, setTempSelectedImage] = useState(selectedProfilePicture);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile picture Updated Successfully',
      life: 3000,
    });
  };
  const [dialogVisible, setDialogVisible] = useState(false);

  const getBlob = (blob) => {
    setBlob(blob);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setTempSelectedImage(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
      setShowCropper(true);
    }
    setShowCropper(true);
    setDialogVisible(true);
  };

  const handleCrop = async (e) => {
    e.preventDefault();

    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setCroppedImage(croppedImageUrl);
      // dispatch(setSelectedProfilePicture(croppedImageUrl)); // Set the cropped image in Redux
    }

    // showSuccess();
    setShowCropper(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setTempSelectedImage(croppedImageUrl);
      dispatch(setSelectedProfilePicture(croppedImageUrl)); // Set the cropped image in Redux
    }

    showSuccess();
    setShowCropper(false);
    setDialogVisible(false)
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempSelectedImage(selectedProfilePicture || companyIcon);
  };

  const handleCancel = () => {
    setDialogVisible(false)
  };
  
  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col">
          <div className="">
            <Dialog header="Change Profile Picture" visible={dialogVisible} onHide={() => setDialogVisible(false)}
              pt={{
                root: { className: 'w-8 sm:w-6 md:w-4' }
              }}
            >
              <div>
                {showCropper && (
                  <CustomCropper
                    getBlob={getBlob}
                    image={tempSelectedImage}
                    onClickCancel={handleCropCancel}
                    onClickSave={handleCrop}
                    buttonLabel="Crop"
                  />
                )}
                {croppedImage && (
                  <div className='text-center'>
                    <div className="fw-bold">Preview</div>
                    <img
                      src={croppedImage}
                      alt="Cropped"
                      className='w-auto h-auto'
                    />
                    <div className="flex justify-content-center gap-2 mt-2">
                      <Button size="small" onClick={handleCancel}>Cancel</Button>
                      <Button size="small" onClick={handleSave}>Upload</Button>
                    </div>
                  </div>
                )}
              </div>
            </Dialog>

          
              <div>
                <div className="">
                  {tempSelectedImage && (
                    <div className="">
                      {/* <img
                        src={tempSelectedImage}
                        alt="Selected"
                        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                      /> */}
                         <Avatar image={tempSelectedImage}
                          onClick={() => document.getElementById('imageInput').click()}
                          alt="Selected"  size="xlarge" shape="circle" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id='imageInput'
                    onChange={handleImageChange}
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
                        bottom: '7px',
                        right: '0px',
                        cursor: 'pointer',
                    }}
                    />
                  </div>
                </div>
              </div>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfilePicture;
