// const handleCompanyAction = (action, rowData) => {
//     switch (action) {
//         case 'view':
//             // Implement view action logic
//             console.log('view:', action);
//             break;
//         case 'edit':
//             // Implement edit action logic
//             console.log('edit:', action);
//             break;
//         case 'addUser':
//             // Implement edit action logic
//             console.log('addUser:', rowData);
//             break;
//         case 'addDocuments':
//             // Implement edit action logic
//             console.log('addDocuments:', rowData);
//             break;
//         case 'addNotes':
//             // Implement delete action logic
//             console.log('addNotes:', rowData);
//             break;
//         default:
//             break;
//     }
// };
// export default handleCompanyAction;


const handleCompanyAction = (event, item, action, activeRowMenu) => {
    const { id } = item;

    if (id === 'view') {
        action.onViewClick(activeRowMenu);
    } else if (id === 'edit') {
        action.onEditClick(activeRowMenu);
    } else if (id === 'addUser') {
        action.onAddUserClick(activeRowMenu);
    } else if (id === 'addDocuments') {
        action.onAddDocumentClick(activeRowMenu);
    } else if (id === 'addNotes') {
        action.onAddNoteClick(activeRowMenu);
    } else if (id === 'changeStatus') {
        action.onChangeStatusClick(activeRowMenu);
    }
};

export default handleCompanyAction;