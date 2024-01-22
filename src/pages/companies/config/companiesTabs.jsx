import React from 'react';
import AllCompaniesListTab from '../components/AllCompaniesListTab';
import ActiveCompaniesListTab from '../components/ActiveCompaniesListTab';
import InactiveCompaniesListTab from '../components/InactiveCompaniesListTab';
import PendingCompaniesListTab from '../components/PendingCompaniesListTab';
import DraftCompaniesListTab from '../components/DraftCompaniesListTab';

const companiesTabs = ({
    showExportModal,
    setShowExportModal,
    columnConfig,
    handleFilterClick,
    dataTableRef,
    setColumnConfig,
}) => [
        {
            id: 'ALL',
            label: 'All',

            content: (
                <AllCompaniesListTab
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
            id: 'ACTIVE',
            label: 'Active',

            content: (
                <ActiveCompaniesListTab
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
            id: 'INACTIVE',
            label: 'Inactive',

            content: (
                <InactiveCompaniesListTab
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
            id: 'PENDING',
            label: 'Pending',

            content: (
                <PendingCompaniesListTab
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
            id: 'DRAFT',
            label: 'Draft',

            content: (
                <DraftCompaniesListTab
                    columnConfig={columnConfig}
                    handleFilterClick={handleFilterClick}  
                    dataTableRef={dataTableRef}
                    setColumnConfig={setColumnConfig}
                    showExportModal={showExportModal}
                    setShowExportModal={setShowExportModal}
                />
            ),
        },
    ];

export default companiesTabs;
