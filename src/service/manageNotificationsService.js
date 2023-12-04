// localStorage.setItem('NEW_OFFLINE_ORDER', [])
// localStorage.setItem('ADD_ORDER_DETAIL', [])
// localStorage.setItem('CALL_STAFF', [])

class ManageNotificationsService {

    addNotification(notification) {
        if (notification.message === 'NEW_OFFLINE_ORDER') {
            let orders = [];
            if(localStorage.getItem('NEW_OFFLINE_ORDER') !== null){
                orders = JSON.parse(localStorage.getItem('NEW_OFFLINE_ORDER'))
            }
            orders.push(notification.data)
            console.log('order', orders);
            localStorage.setItem('NEW_OFFLINE_ORDER', JSON.stringify(orders))
        }
    }

    updateNotificationsRepository() {

    }
}

const manageNotificationsService = new ManageNotificationsService();

export default manageNotificationsService;