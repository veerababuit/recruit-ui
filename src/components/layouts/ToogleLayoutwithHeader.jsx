import React, { useState } from 'react';
import PlainLayout from './PlainLayout';
import { Sidebar } from 'primereact/sidebar';
// import { Avatar } from 'primereact/avatar';
import { useSelector } from 'react-redux';
// import addImage from "../../assets/images/addImage.svg"
import EmployeeProfilePicture from '../../eselfservice/pages/profile/components/EmployeeProfilePicture';

const ToogleLayoutwithHeader = ({ menuItems, selectedItem, avatar, name, email, handleClick }) => {
    const [visible, setVisible] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(selectedItem);
    const selectedProfilePicture = useSelector((state) => state.headerTitle.selectedProfilePicture);


    const sidebarStyle = {
        marginLeft: '-1.5vw',
        marginTop: '-2.4vh',
    };

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
        setVisible(false);
    };

    const togglelayoutHeader = () => {
        return (
            <>
                <div className="m-2 ms-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }} className='me-2'>
                         <EmployeeProfilePicture
                            selectedImage={selectedProfilePicture}
                            // handleImageSelection={handleImageSelection}
                        />
                    </div>
                    <div className="mb-3">
                        <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{name}</div>
                        <div className="p-text-secondary">{email}</div>
                    </div>
                </div>
                <hr />
            </>
        )
    }

    return (
        <PlainLayout>
            <Sidebar
                header={false}
                style={{ width: '280px' }}
                showCloseIcon={false}
                visible={visible}
                onHide={() => setVisible(false)}
            >
                {togglelayoutHeader()}
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`link ${selectedMenuItem === item.name ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick(item.name)}
                    >
                        <div className="d-flex gap-2 p-1 ">
                            <div className="col-1">{item.icon}</div>
                            <div className="col-2" style={{ width: '180px' }}>
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
            </Sidebar>
            <div style={sidebarStyle}>
                <div className="d-flex">
                    <div className="border-end  hidden lg:block">
                        <div className='mt-3'>
                        {togglelayoutHeader()}
                        </div>
                        
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`link ${selectedMenuItem === item.name ? 'active' : ''}`}
                                onClick={() => handleMenuItemClick(item.name)}
                            >
                                <div className="d-flex ps-1">
                                    <div className="col-1">{item.icon}</div>
                                    <div className="col-2" style={{ width: '250px' }}>
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <main className="my-3">
                        <div className="text-end mx-5 lg:hidden block">
                            <i className="pi pi-align-right cursor-pointer" onClick={() => setVisible(true)} />
                        </div>
                        <div className="mx-5 my-2 grid">
                            {/* <div className='col-1'></div> */}
                            <div className='me-0 m-3'>{menuItems.find((item) => item.name === selectedMenuItem)?.component}</div>
                            {/* <div className='col-1'></div> */}
                        </div>
                    </main>
                </div>
            </div>
        </PlainLayout>
    );
};

export default ToogleLayoutwithHeader;
