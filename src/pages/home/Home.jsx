import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getWavesByQuery } from "../../api-calls/waves";
import BottomNav from "../../components/BottomNav";
import LoadingWave from "../../components/LoadingWave";
import Navbar from "../../components/Navbar";
import Waves from "../../components/Waves";
import { auth } from "../../firebase/firebase";

export default function Home() {

    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(true);
    const [waves, setWaves] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getWaves() {
            const result = await getWavesByQuery(`followedBy=${user.uid}`, user);

            if (Array.isArray(result)) {
                if (result.length !== 0) {
                    setWaves(result);
                } else {
                    setWaves(null);
                    setError('No waves from the people you follow');
                }
            } else {
                setWaves(null);
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Network error');
                }
            }
            setLoading(false);
        }

        getWaves();
    }, [user])

    return (
        <div className="full-height d-flex justify-content-center overflow-auto page">
            <Navbar />
            {loading ?
                <div className="col-11 col-lg-6 py-5 full-height">
                    <div>
                        <LoadingWave />
                        <LoadingWave />
                        <LoadingWave />
                        <LoadingWave />
                    </div>
                </div> :
                waves ?
                    <div className="col-11 col-lg-6 py-5 full-height">
                        <Waves waves={waves.slice().reverse()} />
                    </div> :
                    <div className="full-height d-flex align-items-center justify-content-center">
                        <h1 className="text-center">{error}</h1>
                    </div>
            }
            <BottomNav />
        </div>
    );
}