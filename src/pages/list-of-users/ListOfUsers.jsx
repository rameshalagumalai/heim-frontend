import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useParams } from "react-router-dom";
import { getProfilesByQuery } from "../../api-calls/profile";
import BottomNav from "../../components/BottomNav";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";
import UsersList from "../../components/UsersList";
import { auth } from "../../firebase/firebase";
import { getCount } from "../../utils/helpers";

export default function ListOfUsers() {

    const [user] = useAuthState(auth);

    const { waveId, userId } = useParams();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { pathname } = useLocation();

    var dec;
    switch(pathname.slice(-3)){
        case "ers":
            dec = 1;
            break;
        case "ing":
            dec = 2;
            break;
        case "ars":
            dec = 3;
            break;
        default:
            dec = 0;            
    }

    useEffect(() => {
        async function getProfiles(query) {
            const result = await getProfilesByQuery(query, user);

            if (Array.isArray(result)) {
                if (result.length !== 0) {
                    setUsers(result);
                } else {
                    setUsers(null);
                    if (dec === 1) {
                        setError("No followers");
                    } else {
                        setError("No one is followed");
                    }
                }
            } else {
                setUsers(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setLoading(false);
        }

        switch(dec) {
            case 1:
                getProfiles(`followersOf=${userId}`);
                break;
            case 2:
                getProfiles(`followedBy=${userId}`);
                break;    
            case 3:
                getProfiles(`starred=${waveId}`);
                break;
            default:
                alert("Nothing much");  
        }
    }, [user, waveId, userId, dec])

    return (
        <div className="full-height d-flex justify-content-center overflow-auto page">
            <Navbar />
            {
                loading ?
                    <Loading />
                    :
                    users ?
                        <div className="col-11 col-lg-6 mt-5 pt-3">
                            <h1 className="f-700">{(dec===1&&"Followers")||(dec===2?"Following":"Stars")} <span className="text-secondary h2">{getCount(users.length)}</span></h1>
                            <UsersList users={users.slice().reverse()} />
                        </div> :
                        <div className="full-height d-flex align-items-center justify-content-center">
                            <h1>{error}</h1>
                        </div>
            }
            <BottomNav />
        </div>
    );
}