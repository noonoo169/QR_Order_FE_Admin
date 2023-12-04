import React from 'react';
import { Link } from 'react-router-dom';
import '../global/popup_notification.css';
import { useState, useEffect } from 'react';

const PopupNotification = ({ notificationData, onCloseSnackbar }, ref) => {

    const [message, setMessage] = useState('')
    const [route, setRoute] = useState('')

    useEffect(() => {
        if (notificationData.message === 'NEW_OFFLINE_ORDER') {
            const table = notificationData.data;
            setMessage(`Table ${table.name} has just been ordered`);
            setRoute(`/tableManagement/viewOrderDetail/${table.id}`);
        }
    }, [notificationData]);

    return (
        <div className="container" ref={ref}>
            <div className="cookiesContent" id="cookiesPopup">
                <p className='message'>{notificationData.message}</p>
                <p className='message'>{message}</p>
                <Link
                    to={route}
                    className="check"
                    onClick={() => onCloseSnackbar()}>Check</Link>
            </div>
        </div>
    );
};

export default React.forwardRef(PopupNotification);
