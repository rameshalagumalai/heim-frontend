export default function LoadingUserPrimaryData() {
    return (
        <div className="d-flex">
            <div>
                <img style={{width: "2.5rem"}} className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
            </div>
            <div className="w-40">
                <h6 className="mb-0 placeholder-glow"><span className="placeholder col-12"></span></h6>
                <p className="mb-0 placeholder-glow"><span className="placeholder col-8"></span></p>
            </div>
        </div>
    );
}