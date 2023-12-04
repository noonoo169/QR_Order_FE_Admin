import { createSlice } from "@reduxjs/toolkit";

const notifications =
  localStorage.getItem("notifications") !== null
    ? JSON.parse(localStorage.getItem("notifications"))
    : [];

const notificationsQuantity =
  localStorage.getItem("notificationsQuantity") !== null
    ? JSON.parse(localStorage.getItem("notificationsQuantity"))
    : 0;

const setNotificationLocalStorage = ( notifications, notificationsQuantity) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
  localStorage.setItem("notificationsQuantity", JSON.stringify(notificationsQuantity));
};

const initialState = {
  notifications: notifications,
  notificationsQuantity: notificationsQuantity
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {

    // =========== add item ============
    addNotification(state, action) {
      const newNotification = action.payload;
      state.notifications.push(newNotification)
      state.notificationsQuantity++;
      setNotificationLocalStorage(state.notifications, state.notificationsQuantity)
    },

    //============ delete item ===========
    deleteNotification(state, action) {
      const id = action.payload.id;
      console.log("id", id)
      const existingNotification = state.notifications.find((notification) => notification.id === id);
      if (existingNotification) {
        state.notifications = state.notifications.filter((notification) => notification.id !== id)
        state.notificationsQuantity = state.notificationsQuantity - 1;
      }
      console.log('deleted', state.notifications);
      setNotificationLocalStorage(state.notifications, state.notificationsQuantity)
    },
  },
});
export default notificationSlice;
