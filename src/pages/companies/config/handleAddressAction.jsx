// const handleAddressAction = (action, rowData) => {
//     switch (action) {

//         case 'edit':
//             // Implement edit action logic
//             console.log('edit:', rowData);
//             break;
//         case 'delete':
//             // Implement delete action logic
//             console.log('delete:', rowData);
//             break;
//         default:
//             break;
//     }
// };
// export default handleAddressAction;


const handleAddressAction = (event, item, action, activeRowMenu) => {
    const { id } = item;

    if (id === 'view') {
        action.onViewClick(activeRowMenu);
    } else if (id === 'edit') {
        action.onEditClick(activeRowMenu);
    } else if (id === 'delete') {
        action.onDeleteClick(activeRowMenu);
    }

};

export default handleAddressAction;
