import React, { useEffect } from 'react'
import { onMessage } from 'firebase/messaging';
import { messaging } from '../../../firebase';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast } from 'react-toastify';

const Notification = () => {
    const onMessageListener = () => {
        return new Promise((resolve) => {
            onMessage(messaging, (payload) => {
                if (payload.from !== "") {
                    toast.success(payload?.notification?.title)
                }
            });
        });
    };

    useEffect(() => {
        onMessageListener();
    }, []);

    return (
        <div>

        </div>
    )
}

export default Notification
