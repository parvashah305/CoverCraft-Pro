import { useState, useRef } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FileUpload = ({ title, accept, onFileSelect, onTextChange, placeholder, allowText = false }) => {
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
    setTextContent(''); // Clear text when file is selected
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

  const handleTextChangeInternal = (e) => {
    const text = e.target.value;
    setTextContent(text);
    setSelectedFile(null); // Clear file when text is entered
    if (onTextChange) {
      onTextChange(text);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setTextContent('');
    if (onFileSelect) {
      onFileSelect(null);
    }
    if (onTextChange) {
      onTextChange('');
    }
  };

  const hasContent = selectedFile || textContent.trim();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {hasContent && (
          <button
            onClick={clearSelection}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Clear selection"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <div
        className={`upload-zone ${isDragOver ? 'dragover' : ''} ${hasContent ? 'has-content' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !hasContent && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        
        {selectedFile ? (
          <div className="flex items-center justify-center space-x-2">
            <DocumentIcon className="h-8 w-8 text-primary-500" />
            <div className="text-center">
              <span className="text-sm font-medium text-gray-900 block">
                {selectedFile.name}
              </span>
              <span className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        ) : (
          <>
            <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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

      {allowText && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Or paste text directly:
          </label>
          <textarea
            value={textContent}
            onChange={handleTextChangeInternal}
            placeholder={placeholder}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
          />
          {textContent.trim() && (
            <p className="text-xs text-gray-500">
              {textContent.length} characters
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;