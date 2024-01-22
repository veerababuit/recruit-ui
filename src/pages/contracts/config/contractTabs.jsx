import ActiveContractListTabs from "../components/ActiveContractListTabs";
import AllContractListTab from "../components/AllContractListTab";
import InactiveContractTabsList from "../components/InactiveContractTabsList";

const contractTabs = ({
    showExportModal,
    setShowExportModal,
    columnConfig,
    handleFilterClick,
    dataTableRef,
    setColumnConfig,
}) => [
        {
            id: "allContractList",
            label: "All",

            content: <AllContractListTab
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        },
        {
            id: "activeContractList",
            label: "Active",

            content: <ActiveContractListTabs
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        },
        {
            id: "inactiveContractList",
            label: "Inactive",

            content: <InactiveContractTabsList
                columnConfig={columnConfig}
                handleFilterClick={handleFilterClick}
                dataTableRef={dataTableRef}
                setColumnConfig={setColumnConfig}
                showExportModal={showExportModal}
                setShowExportModal={setShowExportModal}
            />
        }
    ]

export default contractTabs;