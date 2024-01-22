import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';

const Notes = () => {
    const [textareaValue, setTextareaValue] = useState('');
    const [notes, setNotes] = useState([]);
    const {username} = useSelector((state)=>state.auth);
    const firstLetterLabel = username.toUpperCase().charAt(0); 
    const [isShow,setIsShow] =useState(false);
    const toast = useRef(null);
const objects = JSON.parse(localStorage.getItem("key"));

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };
    const handleAdd = () => {
        if (textareaValue.trim() !== '') {
            const formatDate = (date) => {
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
            };

            const formatTime = (date) => {
                const options = {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
            };
            const now = new Date();
            const formattedTimestamp = `${formatDate(now)} at ${formatTime(now)}`;
            const newNote = {
                id: generateRandomId(),
                note: textareaValue,
                timestamp: formattedTimestamp,
            };
            setNotes([...notes, newNote]);
            toast.current.show({ severity: 'success', summary: 'success', sticky: false,detail: 'Note Added successfully' });
            setIsShow(false);
            setTextareaValue('');
        }else{
            toast.current.show({ severity: 'error', summary: 'Error', sticky: false, detail: 'Note cannot be empty' });
            setIsShow(true);
        }
    };

    return (
        <>
         <Toast ref={toast} />
<>  <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5>Notes</h5>
            {isShow === false  && ( <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
              onClick={() => setIsShow(true)}
              size="small"
            /> )}
          </div> 
          </>

          {isShow === true && (<>
            {/* <h6>Add Note</h6> */}
               <InputTextarea
                    autoResize
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    rows={2}
                    cols={30}
                    placeholder="Add note..."
                    className="w-100 h-33 mt-3"
                />
                <div className="d-flex justify-content-end align-items-center mt-2">
                    <Button  label="Cancel" onClick={() => setIsShow(false)} size="small" severity="secondary" className='m-2' />
                    <Button onClick={() =>{handleAdd();
                    }} label="Add" size="small" className="company-primary-btn" />
                </div>
                </>)}
            <div className="w-100">
                <div className="profile_card m-1 d-flex justify-content-start align-items-center gap-1 p-2  ">
                    <div>
                        <Avatar label={firstLetterLabel} size="xlarge" shape="circle" />
                    </div>

                    <div>
                        <span className="p-0 mb-0 company-main-text fs-6 fw-bold">{username}</span>{' '}
                        <span className="company-secondary-text">{objects.timestamp}</span>
                        <p className="p-0 mb-0 company-main-text">
                        {username} comment...
                        </p>
                    </div>
                </div>
                {notes
                    ?.slice()
                    .reverse()
                    .map((item, index) => (
                        <div
                            key={index}
                            className="profile_card m-1 d-flex justify-content-start align-items-center gap-1 p-2  "
                        >
                            <div>
                                <Avatar label={firstLetterLabel} size="xlarge" shape="circle" />
                            </div>

                            <div>
                                <span className="p-0 mb-0 company-main-text fs-6 fw-bold">{username}</span>{' '}
                                <span className="company-secondary-text">{item.timestamp}</span>
                                <p className="p-0 mb-0 company-main-text">{item.note}</p>
                            </div>
                        </div>
                    ))}
               
            </div>
        </>
    );
};

export default Notes;
