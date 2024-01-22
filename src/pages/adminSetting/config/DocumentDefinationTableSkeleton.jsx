import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const DocumentDefinitionTableSkeleton = () => {
    const renderSkeletonBody = () => {
        return <Skeleton width="100%" height="1.5rem" />;
    };
    return (
        <>
            <DataTable
                value={Array.from({ length: 6 })}
                size="small"
                tableStyle={{ border: 'none', marginBottom: '40px' }}
                tableClassName="borderless-table"
            >
                <Column field="documentName" header="Document Name" body={renderSkeletonBody} />
                <Column field="docDisplayName" header="Doc Display Name" body={renderSkeletonBody} />
                <Column field="status" header="Status" body={renderSkeletonBody} />
                <Column field="options" header="Options" body={renderSkeletonBody} />
            </DataTable>
        </>
    );
};

export default DocumentDefinitionTableSkeleton;
