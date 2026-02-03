import React, { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import './ImageUpload.css';

const ImageUpload = ({ onImagesSelect, initialImages = [] }) => {
    const [previews, setPreviews] = useState(initialImages || []);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Filter large files
        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert(`File ${file.name} is too large (max 5MB). Skipped.`);
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        // Process all files
        const newPreviews = [];
        let processedCount = 0;

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                processedCount++;

                if (processedCount === validFiles.length) {
                    // All processed
                    const updatedPreviews = [...previews, ...newPreviews];
                    setPreviews(updatedPreviews);
                    onImagesSelect(updatedPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index, e) => {
        e.stopPropagation();
        const updated = previews.filter((_, i) => i !== index);
        setPreviews(updated);
        onImagesSelect(updated);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    // Update previews if initialImages changes (e.g. when editing loads data)
    React.useEffect(() => {
        if (initialImages && initialImages.length > 0 && previews.length === 0) {
            setPreviews(initialImages);
        }
    }, [initialImages]);

    return (
        <div className="image-upload-wrapper">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
            />

            {previews.length === 0 ? (
                <div className="upload-placeholder glass-panel" onClick={handleClick}>
                    <Upload size={40} className="upload-icon" />
                    <p>Tap to upload invitations</p>
                    <span className="sub-text">(Multiple allowed)</span>
                </div>
            ) : (
                <div className="previews-container">
                    <div className="upload-add-btn glass-panel" onClick={handleClick}>
                        <Plus size={24} />
                        <span>Add</span>
                    </div>
                    {previews.map((src, index) => (
                        <div key={index} className="preview-item glass-panel" style={{ backgroundImage: `url(${src})` }}>
                            <div className="remove-btn" onClick={(e) => removeImage(index, e)}>
                                <X size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
