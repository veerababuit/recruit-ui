// const handleResourceAction = (action, rowData) => {
//     if (action === 'view') {
//         // action.onViewClick();
//         console.log("view");
        
//     } else if (action === 'edit') {
//         action.onEditClick();
//         console.log("edit");

//     } else if (action === 'status') {
//         // action.handleStatusClick();
//         console.log("status");

//     } else if (action === 'changeDate') {
//         // action.handleChangeDateClick();
//         console.log("changeDate");

//     } else if (action === 'addDocument') {
//         // action.handleAddDocument();
//         console.log("addDocument");

//     } else if (action === 'addNotes') {
//         // action.navigateToNotesTab();
//         console.log("addNotes");

//     }
// };
// export default handleResourceAction;


const handleResourceAction = (event, item, action, activeRowMenu) => {
    const { id } = item;

    if (id === 'view') {
        action.onViewClick(activeRowMenu);
    } else if (id === 'edit') {
        action.onEditClick(activeRowMenu);
    } else if (id === 'status') {
        action.onStatusChangeClick(activeRowMenu);
    } else if (id === 'changeDate') {
        action.onChangeDateClick(activeRowMenu);
    } else if (id === 'addDocument') {
        action.onAddDocumentClick(activeRowMenu);
    } else if (id === 'addNotes') {
        action.onAddNoteClick(activeRowMenu);
    }

};

export default handleResourceAction;
