import './UploadPhoto.css';
import React, { useState } from 'react';

function UploadPhoto(props) {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            props.isUpload(true);
            const file = event.target.files[0];
            const allowedTypes = ["image/jpeg", "image/png"];
            const maxSize = 5242880; // 5MB file size

            if (file && allowedTypes.includes(file.type) && file.size <= maxSize) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target.result);
                    props.onImgUpload(e.target.result);
                    
                }
                reader.readAsDataURL(file);
            } else {
                if (!allowedTypes.includes(file.type)) {
                    props.errMsg('The file is not in supported format.');
                    return;
                }
                if (file.size > maxSize) {
                    props.errMsg('The size of the file is too big.'); 
                    return;
                }

            }
        } else {
            props.isUpload(false);
        }
    };

    return (
        <>
            <div className="upload-photo-container" id="profile-pic">
                <label htmlFor="upload-photo-input" id='upload-label'>
                    <div className="circle-container">
                        {image ? (
                            <img src={image} alt="Uploaded" className="uploaded-image" />
                        ) : (
                            <i className="bi bi-camera-fill"></i>
                        )}
                    </div>
                    <input
                        id="upload-photo-input"
                        type="file"
                        accept="image/*"
                        name='profilePic'
                        onChange={handleImageChange}
                    />
                </label>
            </div>
        </>

    );
}

export default UploadPhoto;