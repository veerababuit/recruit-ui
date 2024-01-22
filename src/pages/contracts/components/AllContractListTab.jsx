import React, { useRef, useState } from 'react';
import CustomDataTable from '../../../components/datatable/CustomDataTable';
import ViewerWithTabs from '../../../components/viewers/ViewerWithTabs';
import contractSelectedColumns from '../config/contractSelectedColumns';
// import handlecontractActions from '../config/handleContractActions';
import viewContractTabs from '../config/viewContractTabs';
import contractActionMenu from '../config/contractActionMenu';
import HeaderViewerWithTabs from '../../../components/viewers/HeaderViewerWithTabs';
import contractHeaderViewerBtn from '../config/contractHeaderViewerBtn';
import contractHeaderViewerOptions from '../config/contractHeaderViewerOptions';
import { contractSummaryRequest, fetchContractsLoadRequest } from '../../../redux/actions/contractActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import MainTableLoaderSkeleton from '../../../components/loaderSkeleton/MainTableLoaderSkeleton';
import handleContractActions from '../config/handleContractActions';
import DataExportModal from '../../../components/exportUtils/DataExportModal';

const AllContractListTab = ({ columnConfig, handleFilterClick, dataTableRef,   
     showExportModal,
    setShowExportModal, }) => {

    const dispatch = useDispatch();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const { contractSummary, loading, error, contractSummaryWithNavigation, contractSummarySelected } = useSelector((state) => state.contract);
    const total = contractSummaryWithNavigation.totalElements;
    console.log(contractSummary, contractSummaryWithNavigation, loading, error, selectedRowData, "contractSummary");
    const AwaitComponentRerender = useRef(false);
    // console.log(AwaitComponentRerender, "dataId");


    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const onRowMenuClick = (event, item, action, activeRowMenu) => {
        handleContractActions(event, item, action, activeRowMenu);
    };

    useEffect(() => {
        if (AwaitComponentRerender.current) return;
        AwaitComponentRerender.current = true;
        // dispatch(fetchUserRequest())
        dispatch(fetchContractsLoadRequest());
    }, [dispatch]);

    const handleRowSelect = (rowData) => {
        // console.log(event.data.clientName,"viewHeaders");s
        dispatch(contractSummaryRequest(rowData.data.contractID));
        setSelectedRowData(rowData);
        setSidebarVisible(!sidebarVisible);
    };

    const handleRowUnselect = (e) => {
        setSelectedRowData(null);
        setSidebarVisible(!sidebarVisible);
        setActiveIndex(0);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        setActiveIndex(0);
    };
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);

    if (loading) {
        <>
            {/* <h6>Data  loading....</h6> */}
            <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={contractSummary.length} />
        </>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (contractSummary && contractSummary.length <= 0) {
        return <div>Error</div>;
    }
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };


    const onViewClick = (event) => {
        setSidebarVisible(true);
        // setIsEditClick(isEditClick) //false
        setActiveIndex(0); 
        dispatch(contractSummaryRequest(activeRowMenu.contractID));
    };

    const onEditClick = (event) => {
        setSidebarVisible(true);
        // setIsEditClick(true)
        setActiveIndex(1); 
        dispatch(contractSummaryRequest(activeRowMenu.contractID));
    };

    const onDeleteClick = (event) => {
        setSidebarVisible(true);
        setActiveIndex(2);  // for particular tab index give here
        dispatch(contractSummaryRequest(activeRowMenu.contractID));
    };
const onResourceClick = () => {
    setSidebarVisible(true);
    setActiveIndex(3);  // for particular tab index give here
    dispatch(contractSummaryRequest(activeRowMenu.contractID));  
}
  
const onHistroyClick = () => {
    setSidebarVisible(true);
    setActiveIndex(4);  // for particular tab index give here
    dispatch(contractSummaryRequest(activeRowMenu.contractID));  
}
const onTermClick = () => {
    setSidebarVisible(true);
    setActiveIndex(5);  // for particular tab index give here
    dispatch(contractSummaryRequest(activeRowMenu.contractID));  
}
const action = {
        onViewClick,
        onEditClick,
        onDeleteClick,
        onResourceClick,
        onHistroyClick,
        onTermClick
    };

    const onRowClick = (event) => {
        const rowData = event.data;
        // console.log(rowData);
        setActiveRowMenu(rowData);
    };
    const contractModifiedData = contractSummary.map(item => {
        const relatedOrg = item?.relatedOrg?.name || "";
        const endDate = item?.endData || "---";
        const lastUpdatedAt = item?.lastUpdatedAt || "---";
        return {...item,
            "relatedOrg.name": relatedOrg,
            "endDate":endDate,
            "lastUpdatedAt":lastUpdatedAt
        }
    })
    const exportCompaniesModifiedData = contractSummary.map(item => {
        const relatedOrg = item?.relatedOrg?.name || "";
        const endDate = item?.endData || "---";
        return {...item,
            "relatedOrg.name": relatedOrg,
            "endDate":endDate,
        }
    })
    return (
        <div>
              <DataExportModal
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                    columnConfig={columnConfig}
                    exportData={exportCompaniesModifiedData}
                    dataTableRef={dataTableRef}
                />
            <ViewerWithTabs
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={viewContractTabs}
                header={
                    <HeaderViewerWithTabs
                        name={contractSummarySelected?.contractName || ''}
                        // employeeType={selectedRowData?.data?.contractTitle || ''}
                        // tags={contractSummarySelected?.contractStatus}
                        // showTag={true}
                        buttons={contractHeaderViewerBtn}
                        options={contractHeaderViewerOptions}
                        onClick={toggleSidebar}
                        buttonFlag={false}
                    />
                }
            />
            <CustomDataTable
                data={contractModifiedData}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={contractActionMenu}
                selectedColumns={contractSelectedColumns}
                // handleAction={handlecontractActions}
                handleAction={onRowMenuClick}
                columnsConfig={columnConfig}
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
                onPage={onCustomPage}
                currentPageReportTemplate={`{first} to {last} of ${total}`}
                rowsPerPageOptions={[10, 25, 50]}
            />
        </div>
    );
};

export default AllContractListTab;
