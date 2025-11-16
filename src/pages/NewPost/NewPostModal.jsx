// NewPostModal.jsx

import React, { useState } from 'react';
import './NewPostModal.css';

const NewPostModal = ({ isVisible, onClose }) => {
    const [isExclusive, setIsExclusive] = useState(false);
    const [mediaFile, setMediaFile] = useState(null);

    if (!isVisible) return null;

    const handleFileChange = (e) => {
        setMediaFile(e.target.files[0]);
    };
    
    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Post creation logic here...
        alert('Post submitted! (Placeholder)');
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <form className="new-post-modal" onSubmit={handlePostSubmit} onClick={e => e.stopPropagation()}>
                
                <div className="modal-header">
                    <h2>Create New Post</h2>
                    <button type="button" onClick={onClose} className="close-btn">×</button>
                </div>

                <div className="modal-content-area">
                    
                    {/* 1. Media Upload Area */}
                    <div className="media-upload-box">
                        {mediaFile ? (
                            <div className="uploaded-preview">
                                <span>{mediaFile.name}</span>
                                <i className="fas fa-check-circle"></i> {/* Check icon */}
                            </div>
                        ) : (
                            <>
                                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                                <p>Drag and drop image or video here</p>
                                <label htmlFor="media-upload" className="upload-label primary-teal-btn">Select from Computer</label>
                                <input 
                                    type="file" 
                                    id="media-upload" 
                                    accept="image/*,video/*" 
                                    onChange={handleFileChange} 
                                    hidden 
                                />
                            </>
                        )}
                    </div>
                    
                    {/* 2. Caption/Details */}
                    <textarea 
                        className="caption-input" 
                        placeholder="Write a caption..." 
                        rows="3"
                        required
                    />

                    {/* 3. Exclusivity Toggle */}
                    <div className="exclusivity-toggle-group">
                        <label htmlFor="exclusive-toggle">Exclusive Content?</label>
                        <input 
                            type="checkbox" 
                            id="exclusive-toggle" 
                            checked={isExclusive} 
                            onChange={() => setIsExclusive(!isExclusive)}
                        />
                        <span className={`toggle-slider ${isExclusive ? 'on' : 'off'}`}></span>
                    </div>

                    {isExclusive && (
                        <input 
                            type="number" 
                            className="price-input" 
                            placeholder="Set unlock price (e.g., 4.99)" 
                            min="0.01"
                            step="0.01"
                            required
                        />
                    )}
                </div>

                <div className="modal-footer">
                    <button type="submit" className="post-submit-btn primary-teal-btn" disabled={!mediaFile}>
                        Post Content
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPostModal;