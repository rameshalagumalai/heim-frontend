import { useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav";
import Navbar from "../../components/Navbar";
import { auth } from "../../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import EditProfileModal from "../../modals/EditProfileModal";
import { getProfileDetails } from "../../api-calls/profile";
import LoadingWave from "../../components/LoadingWave";
import { useNavigate, useParams } from "react-router-dom";
import { getWavesByQuery } from "../../api-calls/waves";
import { addFollow, removeFollow } from "../../api-calls/complements";
import { getCount, getProcessedWave } from "../../utils/helpers";
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import Waves from "../../components/Waves";
import SetProfileImageModal from "../../modals/SetProfileImageModal";

export default function Profile() {

    const { userId } = useParams();

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');
    const [wavesLoading, setWavesLoading] = useState(true);
    const [waves, setWaves] = useState([])
    const [wavesError, setWavesError] = useState('');
    const [followLoading, setFollowLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        async function getDetails() {
            const result = await getProfileDetails(user, userId);

            if (result.name) {
                setUserData(result);
            } else {
                setUserData(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setLoading(false);
        }

        async function getWaves() {
            const result = await getWavesByQuery(`userId=${userId}`, user);

            if (Array.isArray(result)) {
                if (result.length !== 0) {
                    setWaves(result.reverse());
                } else {
                    setWaves(null);
                    setWavesError('No waves yet');
                }
            } else {
                setWaves(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setWavesLoading(false);
        }

        getDetails();
        getWaves();
    }, [user, userId]);

    function selectProfileImage() {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = () => {
            const selectedFile = fileInput.files[0];
            if (selectedFile) {
                setFile(selectedFile);
                setSelectedImage(URL.createObjectURL(selectedFile));
                document.getElementById("open-set-profile-image-modal").click();
            }
        }
        fileInput.click();
    }

    async function follow() {
        setFollowLoading(true);
        const result = await addFollow(user, userId);

        if (result === "Started following successfully") {
            setUserData({ ...userData, am_following: true, followers: (userData.followers + 1) });
        }
        setFollowLoading(false);
    }

    async function unFollow() {
        setFollowLoading(true);
        const result = await removeFollow(user, userId);

        if (result === "Unfollowed successfully") {
            setUserData({ ...userData, am_following: false, followers: (userData.followers - 1) });
        } else {
            alert(result);
        }
        setFollowLoading(false);
    }

    return (
        <div className="full-height d-flex justify-content-center overflow-auto page">
            <Navbar />
            {
                loading ?
                    <div className="col-11 col-lg-6 mt-5 pt-3">
                        <div className="d-flex">
                            <div>
                                <img style={{ width: "6rem" }} className="rounded-circle me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
                            </div>
                            <div className="w-50">
                                <h5 className="f-700 mb-0 placeholder-glow"><span className="placeholder col-12"></span></h5>
                                <p className="mb-0 placeholder-glow"><span className="placeholder col-8"></span></p>
                                <p className="mt-2 placeholder-glow">
                                    <span className="placeholder col-5 me-1"></span>
                                    <span className="placeholder col-5"></span>
                                </p>
                            </div>
                        </div>
                        <p className="my-2 placeholder-glow"><span className="placeholder col-8"></span></p>
                        <p className="mb-1 placeholder-glow"><span className="placeholder col-3"></span></p>
                        <p className="placeholder-glow"><span className="placeholder col-3"></span></p>
                        <div className="input-group mb-3">
                            <button className="btn btn-dark grp-btn disabled placeholder"></button>
                            <button className="btn btn-dark disabled placeholder"></button>
                        </div>
                        <div className="row">
                            <button href="#" className="btn btn-app pe-none placeholder col-4"></button>
                        </div>
                        <div className="mt-2">
                            <LoadingWave />
                            <LoadingWave />
                        </div>
                    </div>

                    :

                    userData ?
                        <div className="col-11 col-lg-6 mt-5 pt-3">
                            <div className="d-flex">
                                <div className="position-relative">
                                    <img style={{ width: "6rem" }} className="rounded-circle cursor-pointer me-2" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="profile-img" />
                                    {user.uid === userId && <div>
                                        <button onClick={() => selectProfileImage()} className="btn btn-secondary btn-sm rounded-circle position-absolute bottom-0 end-0"><i className="fa-solid fa-camera"></i></button>
                                        <input type="hidden" id="open-set-profile-image-modal" data-bs-toggle="modal" data-bs-target="#setProfileImageModal" />
                                        <SetProfileImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} setFile={setFile} />
                                    </div>}
                                </div>
                                <div>
                                    <h5 className="f-700 mb-0">{userData.name} {userData.verified === 1 && <i className="fa-solid fa-circle-check text-app"></i>}</h5>
                                    <p className="text-secondary mb-0">{`@${userData.app_user_id}`}</p>
                                    <p className="mt-2"><span className="cursor-pointer" onClick={() => navigate(`/${userId}/followers`)}><span className="f-700">{getCount(userData.followers)}</span> followers</span> &emsp;<span className="cursor-pointer" onClick={() => navigate(`/${userId}/following`)}><span className="f-700">{getCount(userData.following)}</span> following</span></p>
                                </div>
                            </div>
                            <p className="my-2" dangerouslySetInnerHTML={{ __html: getProcessedWave(userData.intro) }}></p>
                            <p className="text-secondary mb-1"><i className="fa-solid fa-cake"></i> {new Date(userData.date_of_birth).toLocaleString('en-us', { year: "numeric", month: "long", day: "numeric" })}</p>
                            {userData.residence !== "" && <p className="text-secondary"><i className="fa-solid fa-location-dot"></i> {userData.residence}</p>}
                            {
                                user.uid === userId ?
                                    <div className="input-group">
                                        <button className="btn btn-outline-secondary grp-btn" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit profile</button>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-gear" />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item cursor-pointer" data-bs-toggle="modal" data-bs-target="#changePasswordModal" href="#">Change password</a></li>
                                                <li><a className="dropdown-item cursor-pointer" onClick={() => auth.signOut()}>Logout</a></li>
                                            </ul>
                                        </div>
                                        <EditProfileModal />
                                        <ChangePasswordModal />
                                    </div>
                                    :
                                    (userData.am_following ?
                                        followLoading ?
                                            <button className="btn btn-secondary form-control" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                            :
                                            <button className="btn btn-secondary form-control" onClick={() => unFollow()}>Unfollow</button>
                                        :
                                        (followLoading ?
                                            <button className="btn btn-app text-white form-control" type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                            :
                                            <button className="btn btn-app text-white form-control" onClick={() => follow()}>Follow</button>
                                        )
                                    )
                            }
                            <ul className="nav nav-pills nav-fill mt-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button name="status" className="nav-link active" id="waves-tab" data-bs-toggle="tab" data-bs-target="#profile-waves" type="button" role="tab" aria-controls="home" aria-selected="true">Waves</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button name="status" className="nav-link" id="comments-tab" data-bs-toggle="tab" data-bs-target="#profile-comments" type="button" role="tab" aria-controls="profile" aria-selected="false">Comments</button>
                                </li>
                            </ul>
                            <div className="tab-content mt-2" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile-waves" role="tabpanel" aria-labelledby="waves-tab">
                                    {
                                        wavesLoading ?
                                            <div>
                                                <LoadingWave />
                                                <LoadingWave />
                                            </div> :
                                            waves ?
                                                <Waves waves={waves} setWaves={setWaves} /> : <h1>{wavesError}</h1>
                                    }
                                </div>
                                <div className="tab-pane fade" id="profile-comments" role="tabpanel" aria-labelledby="comments-tab">
                                    {/* <Waves /> */}
                                </div>
                            </div>
                        </div> :
                        <div className="full-height d-flex align-items-center justify-content-center">
                            <h1>{error}</h1>
                        </div>
            }
            <BottomNav />
        </div>
    );
}