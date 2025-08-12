import { useState } from "react";
import Cropper from "react-easy-crop";

export default function ImageCropper({imageUrl}) {

    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    return (
        <div>
            <Cropper 
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={1}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
            />
        </div>
    );
}