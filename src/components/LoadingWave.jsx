import LoadingUserPrimaryData from "./LoadingUserPrimaryData";

export default function LoadingWave() {
    return (
        <div className="border rounded p-3 mt-3">
            <LoadingUserPrimaryData />
            <p className="mt-3 placeholder-glow">
                <span className="placeholder col-6 me-1"></span>
                <span className="placeholder col-5"></span>
                <span className="placeholder col-8 me-1"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-4 me-1"></span>
                <span className="placeholder col-7"></span>
            </p>
        </div>
    );
}