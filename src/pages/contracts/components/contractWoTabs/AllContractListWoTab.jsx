import React, { useEffect, useRef, useState } from 'react';
import CustomDataTable from '../../../../components/datatable/CustomDataTable';
import ViewerWithTabs from '../../../../components/viewers/ViewerWithTabs';
import contractSelectedColumnsWo from '../../config/contractSelectedColumnsWo';
// import handlecontractActions from '../../config/handleContractActions';
import viewContractTabs from '../../config/viewContractTabs';
import contractActionMenu from '../../config/contractActionMenu';
import HeaderViewerWithTabs from '../../../../components/viewers/HeaderViewerWithTabs';
import contractHeaderViewerBtn from '../../config/contractHeaderViewerBtn';
import contractHeaderViewerOptions from '../../config/contractHeaderViewerOptions';
import { fetchAllWorkOrderRequest, handlecontractActionMenu } from '../../../../redux/actions/contractActions';
import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import MainTableLoaderSkeleton from '../../../../components/loaderSkeleton/MainTableLoaderSkeleton';
import handleContractActions from '../../config/handleContractActions';

const AllContractListWoTab = ({ columnConfig, handleFilterClick, dataTableRef }) => {




    const dispatch = useDispatch();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const AwaitComponentRerender = useRef(false);
    useEffect(() => {
        if (AwaitComponentRerender.current) return;
        AwaitComponentRerender.current = true;
        dispatch(fetchAllWorkOrderRequest())
    }, [dispatch]);

    const { workOrderGetAll, workOrderSummaryWithNavigation, loading, error } = useSelector((state) => state.contract);

    const [activeRowMenu, setActiveRowMenu] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const onRowMenuClick = (event, item, action, activeRowMenu) => {
        handleContractActions(event, item, action, activeRowMenu);
    };

    const handleRowSelect = (rowData) => {
        // console.log(event.data.clientName,"viewHeaders");s
        setSelectedRowData(rowData);
        setSidebarVisible(!sidebarVisible);
    };

    const handleRowUnselect = (e) => {
        setSelectedRowData(null);
        setSidebarVisible(!sidebarVisible);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
        dispatch(handlecontractActionMenu(''));
    };
    const total = workOrderSummaryWithNavigation.totalElements;
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(total);
    if (loading) {
        <>
            {/* <h6>Data  loading....</h6> */}
            <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={workOrderGetAll.length} />
        </>
    }

    // if (loading) {
    //     return (
    //         <>
    //             <MainTableLoaderSkeleton columnConfig={columnConfig} numRows={10}  />
    //         </>
    //     );
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (workOrderGetAll && workOrderGetAll.length <= 0) {
        return <div>Error</div>;
    }
    const onCustomPage = (event) => {
        setFirst(event.first);
        setLast(event.last);
    };


    const onViewClick = (event) => {
        setSidebarVisible(true);
        setActiveIndex(0);
        // setIsEditClick(isEditClick) //false
        // dispatch(contractSummaryRequest(activeRowMenu.contractID));
    };

    const onEditClick = (event) => {
        setSidebarVisible(true);
        setActiveIndex(0);
        // setIsEditClick(true)
        // dispatch(contractSummaryRequest(activeRowMenu.contractID));
    };
    const action = {
        onViewClick,
        onEditClick,
    };

    const onRowClick = (event) => {
        const rowData = event.data;
        // console.log(rowData);
        setActiveRowMenu(rowData);
    };
    return (
        <div>
            <ViewerWithTabs
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                visible={sidebarVisible}
                onHide={toggleSidebar}
                tabs={viewContractTabs}
                header={
                    <HeaderViewerWithTabs
                        name={selectedRowData?.data?.clientName || ''}
                        // employeeType={selectedRowData?.data?.workOrders || ''}
                        // tags="Submitted"
                        showTag={false}
                        buttons={contractHeaderViewerBtn}
                        options={contractHeaderViewerOptions}
                        onClick={toggleSidebar}
                        buttonFlag={false}
                    />
                }
            />
            <CustomDataTable
                data={workOrderGetAll}
                onRowSelect={handleRowSelect}
                onRowUnselect={handleRowUnselect}
                actionMenu={contractActionMenu}
                selectedColumns={contractSelectedColumnsWo}
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

export default AllContractListWoTab;
