import React, { useState } from 'react';
import toast from 'react-hot-toast';
import shape_5 from "@/assets/images/deal/shape/shape-5.png";
import shape_8 from "@/assets/images/deal/shape/shape-8.png";
import shape_9 from "@/assets/images/deal/shape/shape-9.png";

import Image, { StaticImageData } from "next/image";

interface UploadFieldProps {
  onFileSelect: (file: File) => void;
}

function Shape({ id, imgSrc }: { id: string; imgSrc: StaticImageData }) {
    return (
      <div className={`tp-detect-shape-${id}`}>
        <Image className="layer" src={imgSrc} alt="shape" />
      </div>
    );
}

export function UploadField({ onFileSelect }: UploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 20 * 1024 * 1024; // 20MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only JPG, JPEG, PNG, or WEBP files are allowed.');
        return;
      }

      if (selectedFile.size > maxSize) {
        toast.error('File size must not exceed 20MB.');
        return;
      }

      onFileSelect(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 20 * 1024 * 1024; // 20MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only JPG, JPEG, PNG, or WEBP files are allowed.');
        return;
      }

      if (selectedFile.size > maxSize) {
        toast.error('File size must not exceed 20MB.');
        return;
      }

      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="tp-detect animation-u">
      <div className="tp-detect-shape">
        {/* <Shape id="5" imgSrc={shape_5} /> */}
        {/* <Shape id="8" imgSrc={shape_8} /> */}
        {/* <Shape id="9" imgSrc={shape_9} /> */}
      </div>
      
      <div className="tp-detect-container">
        <h3 className="tp-detect-title text-center pb-30">Upload File</h3>
        
        <div
          className={`tp-detect-field ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <svg width="47" height="38" viewBox="0 0 47 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 27L24 19L16 27" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M24 19V37" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M40.78 31.78C42.7307 30.7166 44.2717 29.0338 45.1598 26.9973C46.0479 24.9608 46.2325 22.6865 45.6845 20.5334C45.1364 18.3803 43.887 16.4711 42.1334 15.1069C40.3797 13.7428 38.2218 13.0015 36 13H33.48C32.8747 10.6585 31.7464 8.4847 30.1799 6.64202C28.6135 4.79933 26.6497 3.33573 24.4362 2.36124C22.2227 1.38676 19.8171 0.926747 17.4003 1.01579C14.9834 1.10484 12.6182 1.74063 10.4824 2.87536C8.34662 4.01009 6.49586 5.61424 5.06929 7.56719C3.64271 9.52015 2.67742 11.7711 2.246 14.1508C1.81458 16.5305 1.92825 18.9771 2.57847 21.3066C3.22869 23.636 4.39853 25.7878 6.00004 27.6" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M32 27L24 19L16 27" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <p className="tp-detect-field-text">Select a file or drag and drop here</p>
          <p className="tp-detect-field-hint"><strong>JPG, JPEG, PNG</strong> or <strong>WEBP</strong>, file size no more than <strong>20MB</strong></p>
          
          <label className="tp-detect-field-button">
            Select File
            <input type="file" onChange={handleFileChange} accept="image/png, image/jpg, image/jpeg, image/webp" className="upload-input" />
          </label>
        </div>
      </div>
    </div>
  );
}
