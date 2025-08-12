import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";

export default function SetProfileImageModal({ selectedImage }) {

    const [submitted] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    useEffect(() => {
        const element = document.getElementById("rot");
        const event = new Event("change");
        console.log(element);
        console.log(event);
        element.dispatchEvent(event);
    }, []);

    function cropComplete(croppedArea, croppedAreaPixels) {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    return (
        <div className="modal fade" id="setProfileImageModal" tabIndex="-1" role="dialog" aria-labelledby="setProfileImageModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-bg">
                    <div className="modal-header">
                        <h3 onClick={()=>setRotation(1)} className="f-700 mb-0" id="setProfileImageModalLabel">Set profile image</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div style={{height: "25vh"}} className="modal-body">
                        <Cropper
                            image={selectedImage}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropChange={setCrop}
                            initialCroppedAreaPixels={croppedAreaPixels}
                            onCropComplete={cropComplete}
                        />
                        {/* <img className="w-100 mb-2" src={selectedImage} /> */}
                    </div>
                    <div className="modal-footer">
                    <label className="form-label">Zoom <span className="text-secondary medium-text">{0}</span></label>
                        <input min={1} step={0.1} max={3} type="range" value={zoom} onChange={e=>setZoom(e.target.value)} className="form-range" />
                        <label className="form-label">Rotation <span className="text-secondary medium-text">{0}</span></label>
                        <input id="rot"  min={0} max={360} type="range" value={rotation} onChange={e=>{console.log("yes");setRotation(e.target.value);}} className="form-range" />
                        <button id="close-delete-comment-modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {
                            submitted ?
                                <button className="btn btn-danger" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Deleting...
                                </button>
                                :
                                <button className="btn btn-app text-white">Save</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}