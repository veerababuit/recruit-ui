import React, { useEffect } from 'react'
import ProfileMenuItems from './config/ProfileMenuItemSidebar';
import ToogleLayoutwithHeader from '../../../components/layouts/ToogleLayoutwithHeader';
import { setCurrentPageName } from '../../../redux/actions/headerTitleActions';
import { useDispatch } from 'react-redux';

function EmployeeProfilePage() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageName('Profile'));
  }, [dispatch]);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <>
      <ToogleLayoutwithHeader
        menuItems={ProfileMenuItems}
        selectedItem="Personal Information"
        avatar={user.name.slice(0, 1)}
        name={user.name}
        email={user.email}
      />;
    </>
  );
}

export default EmployeeProfilePage;