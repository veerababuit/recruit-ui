import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResourceRequest, paginationhResourceRequest } from '../../../../redux/actions/resourceActions';
import { useEffect } from 'react';
// import CustomDataTable from '../../../../components/datatable/CustomDataTable';
// import resourceSelectedColumns from '../../../resources/config/resourceSelectedColumns';
// import handleResourceAction from '../../../resources/config/handleResourceAction';
// import resourceActionMenu from '../../../resources/config/resourceActionMenu';
import resourceColumnConfig from '../../../resources/config/resourceColumnConfig';
import MainTableLoaderSkeleton from '../../../../components/loaderSkeleton/MainTableLoaderSkeleton';
// import resourceCompaniesSelectedColumns from '../../config/resourceCompaniesSelectedColumns';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// 
const ResourceCompaniesTab = () => {
  const dispatch = useDispatch();
  // const dataTableRef = useRef();
  const { resources, loading, error } = useSelector((state) => state.resource);
  // const [resourceTableData, setResourceTableData] = useState(resourceData);
  // const total = allResources.totalElements;
  // const [first, setFirst] = useState(0);
  // const [last, setLast] = useState(total);
  const [columnConfig, setColumnConfig] = useState(resourceColumnConfig);
  console.log(setColumnConfig);
  // const [sidebarVisible, setSidebarVisible] = useState(false);
  // const [handleFilterClick, setHandleFilterClick] = useState(false);
  useEffect(() => {

    dispatch(fetchResourceRequest());
    dispatch(paginationhResourceRequest());
  }, [dispatch]);


  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (resources && resources.length <= 0) {
    return <div>No Results found</div>;
  }
  // const onCustomPage = (event) => {
  //   setFirst(event.first);
  //   setLast(event.last);
  //   // setCurrentPage(event.page);
  // }

  const resourcesDemo = [
    {
      name: "Austin Roy",
      resourceType: 'resource name ',
      contractName: 'contract Name',
      endClient: 'End Client',
      supplier: 'Supplier',
      startDate: '11-01-2024',
      endDate: '11-01-2025',
      status: 'ACTIVE',
    },
    {
      name: "Json Roy",
      resourceType: 'resource name ',
      contractName: 'contract Name',
      endClient: 'End Client',
      supplier: 'Supplier',
      startDate: '11-01-2024',
      endDate: '11-01-2025',
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

  return (
    <>
      <div className="m-2">

        {loading ? (<MainTableLoaderSkeleton columnConfig={columnConfig} numRows={resourcesDemo.length} />
        ) : (
          <DataTable value={resourcesDemo} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            tableStyle={{ minWidth: '50rem' }} size="small">
            <Column field="name" header="Resource Name"></Column>
            <Column field="resourceType" header="Resource Type"></Column>
            <Column field="contractName" header="Contract Name"></Column>
            <Column field="endClient" header="End Client"></Column>
            <Column field="supplier" header="Supplier"></Column>
            <Column field="startDate" header="Start Date"></Column>
            <Column field="endDate" header="End Date"></Column>
            <Column field="status" header="Status"></Column>

            <Column header="Options" body={optionsColumn} ></Column>
          </DataTable>

        )}

        {/* {loading ? (<MainTableLoaderSkeleton columnConfig={columnConfig} numRows={resourcesDemo.length} />
        ) : (
          <CustomDataTable
            data={resourcesDemo}
            actionMenu={resourceActionMenu}
            columnsConfig={columnConfig}
            // selectedColumns={resourceSelectedColumns}
            selectedColumns={resourceCompaniesSelectedColumns}
            handleAction={handleResourceAction}
            dataTableRef={dataTableRef}
            rows={10}
            paginator
            first={first}
            last={last}
            totalRecords={total}
            currentPageReportTemplate={`{first} to {last} of ${total}`}
            onPage={onCustomPage}
            rowsPerPageOptions={[10, 25, 50]}
          />
        )} */}

      </div>
    </>
  );
};

export default ResourceCompaniesTab;