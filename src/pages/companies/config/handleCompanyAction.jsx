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
    } else if (id === 'changeStatus' && action.onChangeStatusClick) {
        action.onChangeStatusClick(activeRowMenu);
    }
};

export default handleCompanyAction;
