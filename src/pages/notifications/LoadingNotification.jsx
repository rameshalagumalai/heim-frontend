export default function LoadingNotification() {

    return (
        <div className="d-flex border rounded mb-1 p-2">
            <div>
                <img style={{width: "2.5rem"}} className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
            </div>
            <div className="col-9">
                <p className="mb-0 placeholder-glow"><span className="placeholder col-5 me-1"></span><span className="placeholder col-6"></span><span className="placeholder col-4"></span></p>
            </div>
        </div>
    );
}