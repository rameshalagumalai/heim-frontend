import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

export default function BottomNav() {

    const [{ uid }] = useAuthState(auth);

    return (
        <div className="d-flex justify-content-between position-absolute fixed-bottom border-top dark-mode-border bg-bg py-2">
            <Link className="text-secondary h3 d-inline-block text-center bnav-link" to="/"><i className="fa-solid fa-house"></i></Link>
            <Link className="text-secondary h3 d-inline-block text-center bnav-link" to="/search"><i className="fa-solid fa-search"></i></Link>
            <Link className="text-secondary h3 d-inline-block text-center bnav-link" to="/new-wave"><i className="fa-solid fa-plus"></i></Link>
            <Link className="text-secondary h3 d-inline-block text-center bnav-link" to="/notifications"><i className="fa-solid fa-bell"></i></Link>
            <Link className="text-secondary h3 d-inline-block text-center bnav-link" to={`/${uid}`}><img style={{width: "1.75rem"}} className="rounded-circle" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" /></Link>
        </div>
    );
}