import React, { useState } from "react";
import { createPost } from "../../api/postsApi";
import "./NewPostModal.css";

const NewPostModal = ({ isVisible, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [isExclusive, setIsExclusive] = useState(false);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size (max 100MB for videos)
      const maxSize = selectedFile.type.includes('video') ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError(`File size too large. Max ${selectedFile.type.includes('video') ? '100MB' : '10MB'}`);
        return;
      }

      setFile(selectedFile);
      setFileType(selectedFile.type.includes('video') ? 'video' : 'image');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!content && !file) {
      setError("Please add content or upload a file");
      return;
    }

    if (isExclusive && (!price || parseFloat(price) <= 0)) {
      setError("Please set a valid price for exclusive content");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", content);

      if (file) {
        formData.append("post_type", fileType);
        formData.append("media_file", file);
      } else {
        formData.append("post_type", "text");
      }

      if (isExclusive) {
        formData.append("is_exclusive", "true");
        formData.append("price", price);
      }

      await createPost(formData);

      // Reset form
      setContent("");
      setFile(null);
      setPreview(null);
      setFileType(null);
      setIsExclusive(false);
      setPrice("");

      if (onPostCreated) onPostCreated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="new-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a caption..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
          />

          {preview && (
            <div className="preview-container">
              {fileType === 'video' ? (
                <video src={preview} controls style={{ width: '100%', maxHeight: '400px' }} />
              ) : (
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
              )}
              <button 
                type="button" 
                className="remove-media-btn"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setFileType(null);
                }}
              >
                ✕ Remove
              </button>
            </div>
          )}

          <label className="file-upload-label">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            📷 {file ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)` : 'Add Photo or Video'}
          </label>

          <div className="exclusive-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={isExclusive}
                onChange={(e) => setIsExclusive(e.target.checked)}
              />
              <span>Make this exclusive content</span>
            </label>

            {isExclusive && (
              <input
                type="number"
                placeholder="Price ($)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.01"
                step="0.01"
                className="price-input"
              />
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Share Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;
