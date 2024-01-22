import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { createDepartmentRequest } from '../../../redux/actions/adminResourceRoleAction';
import { useDispatch } from 'react-redux';

const AdminCreateDept = ({
    setShowDept,
    handleAddDept,
}) => {
    const [department, setDepartment] = useState('');
    const dispatch = useDispatch();
    
    const submitDepartment = () => {
        const data = {
            deptName: department,
        };
        dispatch(createDepartmentRequest(data))
        handleAddDept(data)
        setShowDept(false);
    };

    

    const hideaddDept = () => {
        setShowDept(false);
    };

    return (
        <>
            <div>
                <div className="p-inputgroup">
                    <InputText
                        className="w-full md:w-14rem"
                        placeholder="Department Name"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <Button type="button" icon="pi pi-check"
                     onClick={submitDepartment}
                      />
                    <Button type="button" severity="secondary" icon="pi pi-times" onClick={hideaddDept} />
                </div>
            </div>
        </>
    );
};

export default AdminCreateDept;
