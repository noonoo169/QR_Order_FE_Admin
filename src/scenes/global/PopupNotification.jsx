import React from 'react';
import { Link } from 'react-router-dom';
import '../global/popup_notification.css';
import { useState, useEffect } from 'react';

const PopupNotification = ({ notificationData, onCloseSnackbar, handleClickCheck }, ref) => {

    return (
        <div className="container" ref={ref}>
            <div className="cookiesContent" id="cookiesPopup">
                <p className='message'>{notificationData.type}</p>
                <p className='message'>{notificationData.content}</p>
                <div class="button-container">
                    <button
                        class='close-btn'
                        onClick={() => onCloseSnackbar()}
                    >
                        Close
                    </button>
                    <Link
                        to={notificationData.route}
                        class="check-btn"
                        onClick={(e) => { handleClickCheck(notificationData.id); onCloseSnackbar(); }}
                    >
                        Check
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default React.forwardRef(PopupNotification);
