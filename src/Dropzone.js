import React from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onDrop, accept }) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, accept});
    const getClassName = (className, isActive) => {
        if(!isActive) {
            return className;
        }
        return `${className} ${className}-active`;
    };

    return (
        <div className={getClassName('dropzone', isDragActive)} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()}/>
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">Release to drop files here</p>
                    ) : (
                        <p className="dropzone-content">Drag and drop some files here, or click to select files from your computer.</p>
                    )}
                </div>
        </div>
    )
}