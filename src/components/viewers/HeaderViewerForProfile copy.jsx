import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Menu } from 'primereact/menu';
import React, { useRef, useState } from 'react';
import EmployeeProfilePicture from '../../eselfservice/pages/profile/components/EmployeeProfilePicture';
import { useSelector } from 'react-redux';
import addImage from '../../assets/images/addImage.svg';

const HeaderViewerForProfile = ({
    onClick,
    profile,
    name,
    email,
}) => {
    const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);

    const [tempSelectedImage, setTempSelectedImage] = useState(selectedProfilePicture);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            setTempSelectedImage(reader.result);
        });

        if (file) {
            reader.readAsDataURL(file);
            //   setShowCropper(true);
            //   setDialogVisible(true);
        }
    };

    return (
        <div className="d-flex justify-content-between align-items-start h-full p-sidebar-header p-3 border-bottom">
            <div className="d-flex justify-content-between align-items-center gap-3 w-full">
                <div className="d-flex justify-content-start align-items-center gap-3">
                    {/* <Avatar size="xlarge" shape="circle" className="">
                        <i className="pi pi-shopping-bag fs-3 "></i>
                        {profile}
                    </Avatar> */}
                    <div style={{ position: 'relative' }} >

                        <div className="">
                {tempSelectedImage &&  (
                  <div className="">
                    <Avatar
                      image={tempSelectedImage}
                      onClick={() => document.getElementById('imageInput').click()}
                      alt="Selected"
                      size="xlarge"
                      shape="circle"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="imageInput"
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
                      right: '-1px',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
                        {/* <EmployeeProfilePicture /> */}

                    </div>

                    <div className='mb-2'>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                            <div className="company-main-text p-0 fs-6 fw-bold mb-0 mr-2">{name}</div>
                        </div>
                        <div className='p-text-secondary'> {email}</div>

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2">
                <div className="customDivider"></div>
                <div>
                    <Button icon="pi pi-times" rounded onClick={onClick} style={{ width: '30px', height: '30px' }} />
                </div>
            </div>
        </div>
    );
};

export default HeaderViewerForProfile;
