import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
// import { useEffect } from 'react';
// import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
// import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import { Button } from 'primereact/button';

const DocumentCompaniesTab = () => {

  // const dataTableRef = useRef();
  // const { resources, loading, error, allResources } = useSelector((state) => state.resource);
  const contracts = [
    {
      resourceTitle: "LCA-lucidtech",
      resourceID: 'R-AB009',
      DocNumber: '3119766101',
      uploadDate: '10/08/2018',
      expDate: '18/08/2020',
    },
    {
      resourceTitle: "Tata Consultant",
      resourceID: 'R-AB008',
      DocNumber: '3119766102',
      uploadDate: '10/08/2018',
      expDate: '18/08/2023',
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
    toggleSidebar() // remove it later
  };

  return (
    <div className=''>
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
          <h5>Document List</h5>
          <Button label="" severity="primary" icon="pi pi-plus fs-5" size="small"
          // onClick={addAddressActionHandler}
          />
        </div>
      </div>

      <DataTable className='p-2' value={contracts} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        tableStyle={{ minWidth: '50rem' }} size="small">
        <Column field="resourceTitle" header="Resource Title"></Column>
        <Column field="resourceID" header="Resource ID"></Column>
        <Column field="DocNumber" header="Doc. Number"></Column>
        <Column field="uploadDate" header="Upload Date"></Column>
        <Column field="expDate" header="Expiry Date"></Column>
        <Column body={optionsColumn} header="Options"></Column>
      </DataTable>
    </div>
  );
};

export default DocumentCompaniesTab;





