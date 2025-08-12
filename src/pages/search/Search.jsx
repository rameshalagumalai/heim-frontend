import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getProfilesByQuery } from "../../api-calls/profile";
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import UsersList from "../../components/UsersList";
import { auth } from "../../firebase/firebase";

export default function Search() {

    const [user] = useAuthState(auth);

    const [searchKey, setSearchKey] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        const result = await getProfilesByQuery(`searchKey=${searchKey}`, user);

        if (Array.isArray(result)) {
            if (result.length !== 0) {
                setUsers(result);
            } else {
                setUsers(null);
                setError('No users found');
            }
        } else {
            setUsers(null);
            if (result.message) {
                setError(result.message);
            } else {
                setError('Network error');
            }
        }
        setSubmitted(false);
    }

    return (
        <div className=" d-flex justify-content-center page">
            <Navbar />
            <div className="col-11 col-lg-6 mt-5 pt-3">
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={searchKey} onChange={e=>setSearchKey(e.target.value)} placeholder="Search for users" />
                        <button className="btn btn-app text-white" type="submit"><i className="fa-solid fa-search"></i></button>
                    </div>
                </form>
                <div className="mt-4">
                    {
                        submitted ?
                        <h1>Loading</h1>
                        :
                        users ?
                        <UsersList users={users} />
                        :
                        <h1>{error}</h1>
                    }
                </div>
            </div>
            <BottomNav />
        </div>
    );
}