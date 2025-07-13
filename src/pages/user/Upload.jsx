// src/pages/user/Upload.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadText, uploadFile } from '../../services/uploadService';

const Upload = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await uploadText({ text });
      setMessage('✅ Text uploaded successfully!');
      setText('');
      
      // Redirect to presentations page after 1 second
      setTimeout(() => {
        navigate('/user/my-presentations');
      }, 1000);
    } catch (error) {
      setMessage('❌ Error uploading text.');
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await uploadFile(file, (p) => setProgress(p));
      setMessage('✅ File uploaded successfully!');
      setFile(null);
      setProgress(0);
      
      // Redirect to presentations page after 1 second
      setTimeout(() => {
        navigate('/user/my-presentations');
      }, 1000);
    } catch (error) {
      setMessage('❌ Error uploading file.');
      setProgress(0);
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear message after 5 seconds
  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="space-y-8 max-w-2xl mx-auto mt-8 p-4">
      <div>
        <h1 className="text-3xl font-bold text-blue-700">Upload Presentation</h1>
        <p className="text-gray-600 mt-2">
          Upload your presentation as text or file to get AI-powered feedback
        </p>
      </div>

      {message && (
        <div className={`p-3 rounded shadow-sm border transition-all duration-300 ${
          message.includes('✅') 
            ? 'bg-green-50 text-green-700 border-green-200' 
            : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Upload Text Form */}
      <form onSubmit={handleTextSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-100">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Paste Presentation Text
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Copy and paste your presentation content below
          </p>
        </div>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          rows="8"
          placeholder="Enter your presentation text here..."
          required
          disabled={isSubmitting}
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {text.length > 0 && `${text.length} characters`}
          </span>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              isSubmitting || !text.trim()
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
            }`}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Text'}
          </button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-50 text-gray-500">OR</span>
        </div>
      </div>

      {/* Upload File Form */}
      <form onSubmit={handleFileSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-100">
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Upload PDF or PPT File
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Maximum file size: 10MB
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            accept=".pdf,.ppt,.pptx,.txt,.doc,.docx"
            id="file-upload"
            required
            disabled={isSubmitting}
          />
          <label 
            htmlFor="file-upload" 
            className="cursor-pointer"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, PPT, PPTX, DOC, DOCX, TXT up to 10MB
            </p>
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <div className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">{file.name}</span>
              <span className="text-xs text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {progress > 0 && progress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !file}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            isSubmitting || !file
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
          }`}
        >
          {isSubmitting ? 'Uploading...' : 'Upload File'}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        <p>After uploading, you'll be redirected to view your presentations and get AI feedback</p>
      </div>
    </div>
  );
};

export default Upload;