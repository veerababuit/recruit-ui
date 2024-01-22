import { Button } from 'primereact/button';

export const confirmationToast = (actionDetails, handleClick, visible, setVisible, toastBC, clear) => {
    if (!visible) {
        setVisible(true);
        toastBC.current.clear();
        toastBC.current.show({
            severity: 'warn',
            summary: 'Warning',
            detail: actionDetails,
            sticky: true,
            content: (props) => (
                <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
                    <div className="flex align-items-center justify-content-start gap-2">
                        <div className="pi pi-exclamation-triangle"></div>
                        <div className="font-medium text-lg p-0">{props.message.summary}</div>
                    </div>
                    <div className="font-medium text-lg p-0 ml-4">{props.message.detail}</div>
                    <div className="flex  justify-content-end align-items-center gap-2 p-1">
                        <Button icon="pi pi-times  fs-5" size="small" severity="secondary" onClick={clear} />
                        <Button icon="pi pi-check  fs-5" size="small" onClick={handleClick} />
                    </div>
                </div>
            ),
        });
    }
};
