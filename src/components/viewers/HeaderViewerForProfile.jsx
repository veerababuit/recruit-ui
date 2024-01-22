import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import React from 'react';
import { useSelector } from 'react-redux';
import addImage from '../../assets/images/addImage.svg';

const HeaderViewerForProfile = ({
    onClick,
    name,
    email,
    setShowUserInfo,
    setSelectedImage
}) => {
    const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);



    const handleImageChange = (e) => {
        const fileInput = document.getElementById('profilePicInput');
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            setSelectedImage(reader.result);
        });

        if (file) {
            reader.readAsDataURL(file);
            setShowUserInfo(false);

            // Reset file input value to allow selecting the same image again
            fileInput.value = '';
        }
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.addEventListener('load', () => {
    //         setSelectedImage(reader.result);
    //     });

    //     if (file) {
    //         reader.readAsDataURL(file);
    //         //   setShowCropper(true);
    //           setShowUserInfo(false);
    //     }
    // };

    const handleAvatarClick = () => {
        // Trigger file input when Avatar is clicked
        document.getElementById('profilePicInput').click();
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

                            <input
                                type="file"
                                accept="image/*"
                                id="profilePicInput"
                                onChange={handleImageChange}
                                className="image-input"
                                style={{ display: 'none' }}
                            />
                            <img
                                src={addImage}
                                alt="addImage"
                                className=""
                                onClick={handleAvatarClick}
                                style={{
                                    position: 'absolute',
                                    bottom: '7px',
                                    right: '-1px',
                                    cursor: 'pointer',
                                }}
                            />
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
