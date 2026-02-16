import React from "react";
import "./ProfileImagePicker.css";

const ProfileImagePicker = ({ onFileSelect, preview }) => {
  return (
    <div className="profile-pic-container">
      <label className="profile-pic-label">Profile Picture *</label>

      <div className="image-preview-box">
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <div className="placeholder-box">No Image Selected</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="profile-file-input"
        onChange={(e) => onFileSelect(e.target.files[0])}
        required
      />
    </div>
  );
};

export default ProfileImagePicker;
