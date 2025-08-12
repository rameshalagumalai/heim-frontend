import { useEffect, useState } from "react"

export default function Playground() {

    // async function cropImage() {
    //     setSubmitted(true);
    //     alert !== "" && setAlert("");
    //     try {
    //         const { file, url } = await getCroppedImg(selectedImage, croppedAreaPixels);
    //         console.log(file.size/1024/1024);
    //         const compressedFile = await imageCompression(file, { maxSizeMB: 0.5 });
    //         console.log(compressedFile.size/1024/1024);
    //         setSelectedImage(url);
    //         setFile(file);
    //         document.getElementById("close-set-profile-image-modal").click();
    //     } catch (err) {
    //         setAlert(err.message);
    //     } finally {
    //         setSubmitted(false);
    //     }
    // }

    return (
        <div>
            <input type="file" className="btn btn-primary" />
        </div>
    )
}