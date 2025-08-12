import { useNavigate } from "react-router-dom";
import UserPrimaryData from "./UserPrimaryData";

export default function ListUser({ user }) {

    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center p-3 border rounded mb-1 cursor-pointer" onClick={()=>navigate(`/${user.id}`)}>
            <UserPrimaryData id={user.id} name={user.name} verified={user.verified} appUserId={user.app_user_id} />
            {/* <button className="btn btn-sm btn-app text-white ms-auto">Follow</button> */}
        </div>
    );
}