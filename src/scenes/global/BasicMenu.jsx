import React from 'react'
import { Link } from "react-router-dom";
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux'
import "./basic_menu.css"
import  notificationSlice  from "../../redux/notificationSlice";

const BasicMenu = ({ open, anchorEl, handleClose, handleClickCheck }) => {
  const notifications = useSelector((state) => state.notifications.notifications)
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div id="notifications-popup">
          <div className="custom-paper">
            <ul className="custom-list">
              {
                notifications.map((notification) => (
                  <div key={notification.id}>
                  <li className="custom-list-item" >
                    <p className="custom-body1">
                      <span>
                        <b>
                        {notification.type}
                        </b>
                      </span>
                    </p>
                    <p>
                      {notification.content}
                      <a 
                      href={notification.route} 
                      className='check-btn' 
                      onClick={() => handleClickCheck(notification.id)}
                      >Check</a>
                    </p>
                  </li>
                  <hr className="custom-divider"></hr>
                  </div>
                ))
              }

            </ul>
          </div>
        </div>
      </Menu>

    </div>
  )
}

export default BasicMenu