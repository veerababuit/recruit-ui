import React, { useState } from 'react';
import CustomInputText from '../../../../../components/controls/CustomInputText';
import { Button } from 'primereact/button';

const Demo = ({ control, errors, setValue, data }) => {
    //data = watch()
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleAdd = () => {
        // Get the form values using the data=watch() prop
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };

        // Check if all required fields are filled
        if (data.firstName && data.lastName && data.email) {
            // Add the new user to the users array
            setUsers([...users, userData]);

            // , you can clear the form fields after adding a user
            setValue('firstName', '');
            setValue('lastName', '');
            setValue('email', '');
        } else {
            // Handle case when some fields are empty
            console.error('Please fill in all fields');
        }
    };

    const handleEdit = (index) => {
        setEdit(true);
        setValue('firstName', users[index].firstName);
        setValue('lastName', users[index].lastName);
        setValue('email', users[index].email);
        setEditIndex(index);
    };

    const handleUpdate = () => {
        // Get the form values using the data=watch() prop
        const updatedUserData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };

        // Check if all required fields are filled
        if (data.firstName && data.lastName && data.email) {
            if (edit && editIndex !== null && users[editIndex]) {
                // If in edit mode, update the user at the specified index
                const updatedUsers = [...users];
                updatedUsers[editIndex] = updatedUserData;
                setUsers(updatedUsers);
                setEdit(false);
                setEditIndex(null);

                // Clear the form fields after updating a user
                setValue('firstName', '');
                setValue('lastName', '');
                setValue('email', '');
            } else {
                console.error('Invalid edit state or index'); // Handle error case
            }
        } else {
            // Handle case when some fields are empty
            console.error('Please fill in all fields');
        }
    };

    const handleDelete = (index) => {
        // Display a confirmation dialog before proceeding with the deletion

        // Check if the index is valid
        if (index !== null && users[index]) {
            // If in edit mode, clear the form fields
            if (edit) {
                setEdit(false);
                setEditIndex(null);
                setValue('firstName', '');
                setValue('lastName', '');
                setValue('email', '');
            }

            // Remove the user at the specified index
            const updatedUsers = [...users];
            updatedUsers.splice(index, 1);
            // const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);
        } else {
            console.error('Invalid delete index'); // Handle error case
        }
    };

    return (
        <div>
            <div>
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="firstName"
                    labelId="First Name"
                    placeholder="Address line 2"
                    defaultValue=""
                    className="col-12"
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="lastName"
                    labelId="Last Name"
                    placeholder="Address line 2"
                    defaultValue=""
                    className="col-12"
                />
                <CustomInputText
                    control={control}
                    errors={errors}
                    name="email"
                    labelId="Email"
                    placeholder="Address line 2"
                    defaultValue=""
                    className="col-12"
                />
            </div>
            <div>
                {edit ? <Button label="UPDATE" onClick={handleUpdate} /> : <Button label="ADD" onClick={handleAdd} />}
            </div>
            <div>
                <table className="table table-striped">
                    <thead className="table-light">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <i
                                        className="pi pi-pencil cursor-pointer"
                                        // onClick={() => {
                                        //     setEdit(true);
                                        //     setValue('firstName', data.firstName);
                                        //     setValue('lastName', data.lastName);
                                        //     setValue('email', data.email);
                                        // }}
                                        onClick={() => handleEdit(index)}
                                    />
                                </td>
                                <td>
                                    <i className="pi pi-times cursor-pointer" onClick={() => handleDelete(index)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Demo;
