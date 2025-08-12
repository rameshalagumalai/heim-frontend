import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../utils/helpers";

export default function Notification({ notification }) {

    const { name, from_user, type, wave, viewed, instance } = notification;

    var content, redirectPath, display = "";

    const navigate = useNavigate();

    switch(type) {
        case 1:
            content = " started following you.";
            redirectPath = `/${from_user}`;
            break;
        case 2:
            content = " starred your wave.";
            redirectPath = `/waves/${wave}`;
            break;
        case 3:
            content = " commented on your wave.";
            redirectPath = `/waves/${wave}`;
            break;
        default:
            display = " d-none"           
    }

    return (
        <div onClick={()=>navigate(redirectPath)} className={`d-flex border${viewed === 0 ? " border-dark" : ""} rounded mb-1 p-2${display} cursor-pointer`}>
            <div>
                <img style={{width: "2.5rem"}} className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
            </div>
            <div className="col-10">
                <p className="mb-0"><span className="f-700 h6">{name}</span>{content}</p>
                <p className="text-end text-secondary small-text mb-0">{getFormattedDate(instance)}</p>
            </div>
        </div>
    );
}