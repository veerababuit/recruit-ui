import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
// import { useEffect } from 'react';
// import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
// import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import Viewer from '../../../../components/viewers/Viewer';
import { Button } from 'primereact/button';

const UsersCompaniesTab = () => {

  // const dataTableRef = useRef();
  // const { resources, loading, error, allResources } = useSelector((state) => state.resource);
  const contracts = [
    {
      userName: "Austin Roy",
      userRole: 'Admin',
      email: 'austinroy@gmail.com',
      phone: '9999999999',
      createdOn: '10/08/2018',
      status: 'ACTIVE',
    },
    {
      userName: "Johnson",
      userRole: 'Admin',
      email: 'johnson@gmail.com',
      phone: '8888888888',
      createdOn: '10/08/2018',
      status: 'ACTIVE',
    },

  ]



  const optionsColumn = () => {
    return (
      <div>
        <i className="pi pi-ellipsis-v" />
      </div>
    );
  };

  const [addSidebarVisible, setAddSidebarVisible] = useState(false);
  const [viewSidebarVisible, setViewSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setViewSidebarVisible(!viewSidebarVisible);
  };

  const handleOnHide = () => {
    setAddSidebarVisible(false);
    toggleSidebar() //remove this later
  };

  return (
    <>

      <div className='p-2'>
        <Viewer
          visible={addSidebarVisible}
          onHide={handleOnHide}
          header={
            <TitleHeaderOnly
              onClick={handleOnHide}
              title={"Add New Address"}
            />
          }
          // contentComponent={<AddNewAddressDetails setAddSidebarVisible={setAddSidebarVisible} />}
        />

        <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
          <h5>User List</h5>
          <Button
            label=""
            severity="primary"
            icon="pi pi-plus fs-5"
            // onClick={addAddressActionHandler}
            size="small"
          />
        </div>
      </div>

      <DataTable className='p-2' value={contracts} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        tableStyle={{ minWidth: '50rem' }} size="small">
        <Column field="userName" header="User Name"></Column>
        <Column field="userRole" header="Role"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="status" header="Status"></Column>
        <Column body={optionsColumn} header="Options" ></Column>
      </DataTable>
    </>
  );
};

export default UsersCompaniesTab;





