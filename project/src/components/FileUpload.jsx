import { useState, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ title, accept, onFileSelect, placeholder }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textContent, setTextContent] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    if (onFileSelect) {
      onFileSelect(new Blob([e.target.value], { type: 'text/plain' }));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      
      <div
        className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        
        <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-2">
            <DocumentIcon className="h-5 w-5 text-primary-500" />
            <span className="text-sm font-medium text-gray-900">
              {selectedFile.name}
            </span>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-primary-600 cursor-pointer">Click to upload</span>
              {' '}or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              {accept.includes('pdf') ? 'PDF, DOCX files' : 'Supported formats'}
            </p>
          </>
        )}
      </div>

      {title.includes('Job Description') && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Or paste job description text:
          </label>
          <textarea
            value={textContent}
            onChange={handleTextChange}
            placeholder={placeholder}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>
      )}

      {selectedFile && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Selected:</strong> {selectedFile.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Size: {(selectedFile.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;