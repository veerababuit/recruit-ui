import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { setSelectedProfilePicture } from '../../../../redux/actions/headerTitleActions';
import { Button } from 'primereact/button';
import addImage from '../../../../assets/images/addImage.svg';
import userIcon from '../../../../assets/images/user_icon.svg';
import CustomCropper from '../../../../components/imageCropper/CustomCropper';
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';

const EmployeeProfilePicture = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture) ;
  const [blob, setBlob] = useState(null);
  const [tempSelectedImage, setTempSelectedImage] = useState(selectedProfilePicture || userIcon);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);


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

  useEffect(() => {
    // Update tempSelectedImage when selectedProfilePicture changes
    setTempSelectedImage(selectedProfilePicture || userIcon);
  }, [selectedProfilePicture]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', () => {
  //     setTempSelectedImage(reader.result);
  //   });

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     setShowCropper(true);
  //     setDialogVisible(true);
  //   }
  // };

  const handleImageChange = (e) => {
    const fileInput = document.getElementById('imageInput');
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setTempSelectedImage(reader.result);
    });

    if (file) {
      reader.readAsDataURL(file);
      setShowCropper(true);
      setDialogVisible(true);

      // Reset file input value to allow selecting the same image again
      fileInput.value = '';
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

  const handleSave = async (e) => {
    e.preventDefault();

    if (blob) {
      const croppedImageUrl = URL.createObjectURL(blob);
      setTempSelectedImage(croppedImageUrl);
      dispatch(setSelectedProfilePicture(croppedImageUrl));
    }

    showSuccess();
    setShowCropper(false);
    setDialogVisible(false);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempSelectedImage(selectedProfilePicture);
    setDialogVisible(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleAvatarClick = () => {
    // Trigger file input when Avatar is clicked
    document.getElementById('imageInput').click();
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid">
        <div className="col">
          <div className="">
            <Dialog
              header="Change Profile Picture"
              visible={dialogVisible}
              onHide={() => setDialogVisible(false)}
              pt={{
                root: { className: 'w-8 sm:w-6 md:w-4' },
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
            </Dialog>

            <div>
              <div className="">
                <Avatar
                  image={selectedProfilePicture}
                  onClick={handleAvatarClick}
                  alt="Selected"
                  size="xlarge"
                  shape="circle"
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="">
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
                  onChange={handleImageChange}
                  className="image-input"
                  style={{ display: 'none' }}
                />
                <div className="">
                  <img
                    src={addImage}
                    alt="addImage"
                    className=""
                    onClick={() => document.getElementById('imageInput').click()}
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '-1px',
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
