import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
// import handleCompanyAction from '../../config/handleCompanyAction';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import addressSelectedColumns from '../../config/addressSelectedColumns';
import addressColumnConfig from '../../config/addressColumnConfig';
import addressActionMenu from '../../config/addressActionMenu';
import { Button } from 'primereact/button';
import EditAddressDetails from './EditAddressDetails';
import Viewer from '../../../../components/viewers/Viewer';
import TitleHeaderOnly from '../../../../components/header/TitleHeaderOnly';
import AddNewAddressDetails from './AddNewAddressDetails';
import handleAddressAction from '../../config/handleAddressAction';
import { updateCompanyRequest } from '../../../../redux/actions/companiesActions';
import MainTableLoaderSkeleton from '../../../../components/loaderSkeleton/MainTableLoaderSkeleton';
// import { fetchCompanyRequest } from '../../../../redux/actions/companiesActions';

const AddressCompaniesTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {

  const [addSidebarVisible, setAddSidebarVisible] = useState(false);
  const [viewSidebarVisible, setViewSidebarVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const toast = useRef(null);
  const [activeRowMenu, setActiveRowMenu] = useState(null);

  // const [sidebarVisible, setSidebarVisible] = useState(false);
  const { loading, error, selectedCompany } = useSelector((state) => state.company);
  const orgAddresses = selectedCompany ? selectedCompany.orgAddresses : "No Address Available";

  const total = orgAddresses ? orgAddresses.length : 0;
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(total);

  const onRowMenuClick = (event, item, action, activeRowMenu) => {
    handleAddressAction(event, item, action, activeRowMenu);
  };

  // const apiRequest = useRef(false);

  // useEffect(() => {
  //   if (apiRequest.current) return;
  //   apiRequest.current = true;
  //   // dispatch(fetchCompaniesRequest());
  // }, [dispatch]);

  const handleRowSelect = (selectedRow) => {
    setViewSidebarVisible(true);
  };


  const handleRowUnselect = () => {
    setViewSidebarVisible(false);
  };

  const addAddressActionHandler = () => {
    setAddSidebarVisible(true);
  };

  const toggleSidebar = () => {
    setViewSidebarVisible(!viewSidebarVisible);
  };

  const handleOnHide = () => {
    setAddSidebarVisible(false);
  };

  const onCustomPage = (event) => {
    setFirst(event.first);
    setLast(event.last);
  };

  useEffect(() => {
    // if (loading) {
    //   // toast.current.show({ severity: 'info', summary: 'Loading', detail: 'Please wait Loading...' });
    //   return;
    // }

    if (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `${error}`, sticky: false });
    }

    if (!selectedCompany) {
      toast.current.show({ severity: 'warn', summary: 'Error', life: '500', detail: 'No data available. Wait Data Loading...' });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //  customdata table option actions
  const [isEditClick, setIsEditClick] = useState(false);

  const onViewClick = (event) => {
    //  setSidebarVisible(true);
    setViewSidebarVisible(true);
    setIsEditClick(isEditClick)
    setSelectedAddress(event);
  };

  const onEditClick = (event) => {
    //  setSidebarVisible(true);
    setViewSidebarVisible(true);
    setIsEditClick(true)
    // console.log("onEditClick");
    setSelectedAddress(event);
  };

  const onDeleteClick = async (event) => {
    // console.log("first onDeleteClick");
    try {
      const deletedAddress = orgAddresses.find((item) => item.orgAddressID === event.orgAddressID);
      // console.log(deletedAddress, "deleteAddress Done");

      const payload = {
        organizationID: selectedCompany.organizationID,
        orgAddresses: [
          {
            ...deletedAddress,
            deleted: true,
          },
        ],
      };

      // Dispatch the updateCompanyRequest
      await dispatch(updateCompanyRequest(selectedCompany.organizationID, payload));
      // showSuccess("Succussfully Deleted")
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Address deleted successfully', life: 1000 });

    } catch (error) {
      console.error('Delete request failed:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete address', life: 1000 });
    }
  };

  const action = {
    onViewClick,
    onEditClick,
    onDeleteClick
  };

  const onRowClick = (event) => {
    const rowData = event.data;
    // console.log(rowData);
    setActiveRowMenu(rowData);
    setSelectedAddress(rowData);
    // toggleSidebar(); 

  };

  return (
    <>
      <div className='m-3'>
        <Toast ref={toast} />
        <>
          <Viewer
            visible={addSidebarVisible}
            onHide={handleOnHide}
            header={
              <TitleHeaderOnly
                onClick={handleOnHide}
                title={"Add New Address"}
              />
            }
            contentComponent={<AddNewAddressDetails setAddSidebarVisible={setAddSidebarVisible} />}
          />

          <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5>Address List</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
              onClick={addAddressActionHandler}
              size="small"
            />
          </div>
        </>

        <Viewer
          visible={viewSidebarVisible}
          onHide={toggleSidebar}
          header={
            <TitleHeaderOnly
              onClick={toggleSidebar}
              title={"Edit Address"}
            />
          }
          contentComponent={
            <EditAddressDetails
              selectedRowData={selectedAddress}
              setViewSidebarVisible={setViewSidebarVisible}
            />
          }
        />

        {loading ? (
          <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={orgAddresses?.length} />
        ) : (
          <>
            {orgAddresses && orgAddresses.length > 0 ? (
              <CustomDataTable
                data={orgAddresses}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={addressActionMenu}
                columnsConfig={addressColumnConfig}
                selectedColumns={addressSelectedColumns}
                // handleAction={handleCompanyAction}
                handleAction={onRowMenuClick}
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                action={action}
                onRowClick={onRowClick}
                setActiveRowMenu={setActiveRowMenu}
                activeRowMenu={activeRowMenu}
                rows={10}
                paginator
                first={first}
                last={last}
                totalRecords={total}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                onPage={onCustomPage}
                rowsPerPageOptions={[10, 25, 50]}
                sortable
              />
            ) : (
              <h5 className='m-2'>No Address available...</h5>
            )}
          </>
        )
        }

      </div>
    </>
  );
};

export default AddressCompaniesTab;
