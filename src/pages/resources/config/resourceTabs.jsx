import React from 'react';
import AllResourcesListTab from '../components/AllResourcesListTab';
import BillableResourcesListTab from '../components/BillableResourcesListTab';
import NonBillableResourceListTab from '../components/NonBillableResourceListTab';
import BenchResourcesListTab from '../components/BenchResourcesListTab';
import TerminatedResourcesListTab from '../components/TerminatedResourcesListTab';

const resourceTabs = ({
    showExportModal,
    setShowExportModal,
    columnConfig,
    handleFilterClick,
    dataTableRef,
    setColumnConfig,
    // resourceFilters,
    // setResourceFilters,
    // resourcedDataTableRef
}) => [
        {
            id: 'allResourceList',
            label: 'All',

            content: (
                <AllResourcesListTab
                    columnConfig={columnConfig}
                    handleFilterClick={handleFilterClick}
                    dataTableRef={dataTableRef}
                    setColumnConfig={setColumnConfig}
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                />
            ),

            // content: (
            //     <AllResourcesListTab
            //         columnConfig={columnConfig}
            //         resourceFilters={resourceFilters}
            //         setResourceFilters={setResourceFilters}
            //         handleFilterClick={handleFilterClick}
            //         dataTableRef={resourcedDataTableRef}
            //     />
            // ),
        },
        {
            id: 'BillableResourceList',
            label: 'Billable',

            // content: <BillableResourcesListTab />,

            content: (
                <BillableResourcesListTab
                    columnConfig={columnConfig}
                    handleFilterClick={handleFilterClick}
                    dataTableRef={dataTableRef}
                    setColumnConfig={setColumnConfig}
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                />
            ),
        },
        {
            id: 'NonBillableResourceList',
            label: 'Non Billable',

            content: <NonBillableResourceListTab
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />,
        },
        {
            id: 'NonBillableResourceList',
            label: 'Bench',

            content: <BenchResourcesListTab
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />,
        },
        {
            id: 'NonBillableResourceList',
            label: 'Terminated',

            content: <TerminatedResourcesListTab
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />,
        },
    ];

export default resourceTabs;
