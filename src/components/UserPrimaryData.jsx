import { useNavigate } from "react-router-dom";

export default function UserPrimaryData({ id, name, verified, appUserId }) {

    const navigate = useNavigate();

    function redirectToProfilePage(e) {
        e.preventDefault();
        navigate(`/${id}`);
    }

    return (
        <div onClick={e=>redirectToProfilePage(e)} className="d-flex w-fit-content cursor-pointer">
            <div>
                <img style={{width: "2.5rem"}} className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
            </div>
            <div>
                <h6 className="f-700 mb-0">{name} {verified === 1 && <i className="fa-solid fa-circle-check text-app"></i>}</h6>
                <p className="text-secondary mb-0">@{appUserId}</p>
            </div>
        </div>
    );  
}