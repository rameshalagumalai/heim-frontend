export default function Loading() {
    return (
        <div className="full-height d-flex align-items-center justify-content-center">
            <div className="spinner-grow text-app" style={{width: '3rem', height: '3rem'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}