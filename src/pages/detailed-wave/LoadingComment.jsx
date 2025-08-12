import LoadingUserPrimaryData from "../../components/LoadingUserPrimaryData";

export default function LoadingComment() {
    return (
        <div className="border rounded p-3 mb-1 cursor-pointer">
            <LoadingUserPrimaryData />
            <p className="my-2 placeholder-glow">
                <span className="placeholder col-6 me-1"></span>
                <span className="placeholder col-5"></span>
            </p>
        </div>
    );
}