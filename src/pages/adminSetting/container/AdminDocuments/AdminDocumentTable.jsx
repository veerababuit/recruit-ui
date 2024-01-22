import React, { useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchDocumentsRequest } from '../../../../redux/actions/adminResourceRoleAction';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'primereact/menu';
import { InputSwitch } from 'primereact/inputswitch';
import DocumentDefinitionTableSkeleton from '../../config/DocumentDefinationTableSkeleton';
import { Toast } from 'primereact/toast';

function AdminDocumentTable({ handleRowSelect, handleRowUnselect, setActiveRowMenu, action, onRowClick }) {
    const DocumentActionMenu = [
        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">View</div>,
            id: 'view',
            action: 'view',
        },
        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Edit</div>,
            id: 'edit',
            action: 'edit',
        },

        {
            label: <div className="p-text-primary p-2 fs-6 fw-bold m-1  w-auto">Delete</div>,
            id: 'delete',
            action: 'delete',
        },
    ];

    const statusBodyTemplate = (rowData) => {
        const handleStatusUpdate = (e) => {
            e.stopPropagation();
        };
        return <InputSwitch checked={rowData.status === 'ACTIVE'} onChange={handleStatusUpdate} />;
    };
    const dispatch = useDispatch();
    const { documentList, loadingDocumentList, errorDocumentList } = useSelector((state) => state.adminRole);

    useEffect(() => {
        dispatch(fetchDocumentsRequest());
    }, [dispatch]);

    const menuRef = useRef(null);
    const showMenu = (event, rowData) => {
        setActiveRowMenu(rowData);
        menuRef.current.show(event);
    };

    const onActionMenuItemClick = (event, item, actions, activeRowMenu) => {
        const { id } = item;

        if (id === 'view') {
            action.onViewClick(activeRowMenu);
        } else if (id === 'edit') {
            action.onEditClick(activeRowMenu);
        } else if (id === 'delete') {
            action.onDeleteClick(activeRowMenu);
        }
    };

    const onHideMenu = () => {
        setActiveRowMenu(null);
    };

    const actionBodyTemplate = (rowData, activeRowMenu) => {
        const handleOptionClick = (event) => {
            event.stopPropagation();
            const clickedDocumentDefID = rowData.documentDefID;

            showMenu(event, rowData);
            setActiveRowMenu(clickedDocumentDefID);
        };

        return (
            <div className="action-buttons" onClick={handleOptionClick}>
                <i className="pi pi-ellipsis-v cursor-pointer" />
                <Menu
                    popup
                    ref={menuRef}
                    onHide={onHideMenu}
                    model={DocumentActionMenu.map((item, index) => ({
                        id: index,
                        label: item.label,
                        command: (event) => onActionMenuItemClick(event, item, action, activeRowMenu),
                    }))}
                />
            </div>
        );
    };
    const toast = useRef(null);

    useEffect(() => {
        if (errorDocumentList) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${errorDocumentList}`, sticky: false });
        }
    }, [errorDocumentList]);

    return (
        <div>
            <Toast ref={toast} />

            {loadingDocumentList && !errorDocumentList && documentList.length === 0 && (
                <DocumentDefinitionTableSkeleton />
            )}
            {!loadingDocumentList && documentList.length > 0 && (
                <DataTable
                    value={documentList}
                    dataKey="id"
                    tableStyle={{ minWidth: '50rem' }}
                    stripedRows
                    size="small"
                    onRowSelect={handleRowSelect}
                    onRowUnselect={handleRowUnselect}
                    selectionMode="single"
                    onRowClick={onRowClick}
                >
                    <Column field="documentName" header="DocumentName" />
                    <Column field="docDisplayName" header="DisplayName" />
                    <Column field="status" header="Status" body={statusBodyTemplate} />

                    <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'center' }} />
                </DataTable>
            )}
            {!loadingDocumentList && errorDocumentList && (
                <>
                    <DataTable tableStyle={{ minWidth: '50rem' }} stripedRows size="small">
                        <Column field="documentName" header="DocumentName" />
                        <Column field="docDisplayName" header="DisplayName" />
                        <Column field="status" header="Status" body={statusBodyTemplate} />

                        <Column header="Options" body={actionBodyTemplate} bodyStyle={{ textAlign: 'center' }} />
                    </DataTable>
                </>
            )}
        </div>
    );
}

export default AdminDocumentTable;
