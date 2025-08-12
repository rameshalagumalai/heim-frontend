import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getNotificationsByUser } from "../../api-calls/notifications";
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import { auth } from "../../firebase/firebase";
import LoadingNotification from "./LoadingNotification";
import Notification from "./Notification";

export default function Notifications() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getNotifications() {
            const result = await getNotificationsByUser(user);

            if (Array.isArray(result)) {
                if (result.length !== 0) {
                    setNotifications(result.reverse());
                } else {
                    setNotifications(null);
                    setError('No notifications to show');
                }
            } else {
                setNotifications(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setLoading(false);
        }

        getNotifications();
    }, [user])

    return (
        <div className="full-height d-flex justify-content-center overflow-auto page">
            <Navbar />
            {
                loading ?
                    <div className="col-11 col-lg-6 mt-5 pt-3">
                        <h1 className="f-700">Notifications</h1>
                        <LoadingNotification />
                        <LoadingNotification />
                        <LoadingNotification />
                    </div>
                    :
                    notifications ?
                        <div className="col-11 col-lg-6 mt-5 pt-3">
                            <h1 className="f-700">Notifications</h1>
                            {
                                notifications.map((notification, i) => {
                                    return (<Notification key={i} notification={notification} />);
                                })
                            }
                        </div> :
                        <div className="full-height d-flex align-items-center justify-content-center">
                            <h1 className="text-center">{error}</h1>
                        </div>
            }
            <BottomNav />
        </div>
    );
}