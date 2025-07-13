import React, { useState, useEffect } from 'react';
import { getUserUploads } from '../../services/uploadService';
import { getPresentationFeedback } from '../../services/feedbackService';
import FeedbackModal from '../../components/FeedbackModal';

const MyPresentations = () => {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPresentation, setSelectedPresentation] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPresentations();
  }, []);

  const fetchPresentations = async () => {
    try {
      const response = await getUserUploads();
      console.log('Fetched presentations:', response.data);
      if (response.data && response.data.length > 0) {
        console.log('First presentation structure:', response.data[0]);
      }
      setPresentations(response.data);
    } catch (error) {
      console.error('Error fetching presentations:', error);
      alert('Failed to load presentations. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetFeedback = async (presentation) => {
    console.log('=== Getting feedback for presentation ===');
    console.log('Presentation object:', presentation);
    console.log('Has textContent:', !!presentation.textContent);
    console.log('Has fileName:', !!presentation.fileName);

    setSelectedPresentation(presentation);
    setFeedbackLoading(true);
    setShowModal(true);

    try {
      let response;

      if (presentation.textContent) {
        console.log('Processing text presentation');
        if (!presentation.textContent.trim()) {
          throw new Error('Presentation text is empty');
        }
        response = await getPresentationFeedback('text', presentation.textContent);

      } else if (presentation.fileName) {
        console.log('Processing file presentation');
        console.log('File name:', presentation.fileName);

        // ✅ Use correct backend file path
       const apiBaseUrl = import.meta.env?.VITE_REACT_APP_API_BASE_URL || 'http://localhost:5000';

        const fileUrl = `${apiBaseUrl}/uploads/${presentation.fileName}`;
        console.log('Fetching file from:', fileUrl);

        try {
          const fileResponse = await fetch(fileUrl, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
          });

          if (!fileResponse.ok) {
            console.error('File fetch failed:', fileResponse.status, fileResponse.statusText);
            throw new Error(`Failed to fetch file: ${fileResponse.status}`);
          }

          const fileBlob = await fileResponse.blob();
          console.log('File blob received, size:', fileBlob.size);
          if (fileBlob.size === 0) {
            throw new Error('Downloaded file is empty');
          }

          const fileExtension = presentation.fileName.split('.').pop().toLowerCase();
          const mimeTypes = {
            'pdf': 'application/pdf',
            'txt': 'text/plain',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'ppt': 'application/vnd.ms-powerpoint',
            'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          };
          const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

          const file = new File([fileBlob], presentation.fileName, { type: mimeType });
          console.log('Created file object:', {
            name: file.name,
            type: file.type,
            size: file.size
          });

          response = await getPresentationFeedback('file', file);

        } catch (fetchError) {
          console.error('Error fetching file:', fetchError);
          throw new Error(`Could not retrieve the file: ${fetchError.message}`);
        }

      } else {
        throw new Error('Presentation has neither text content nor file');
      }

      console.log('Feedback response received:', response);
      const feedbackData = response.data;

      if (feedbackData && feedbackData.feedback) {
        setFeedback(feedbackData.feedback);
      } else {
        setFeedback('No feedback was generated. Please try again.');
      }

    } catch (error) {
      console.error('=== Error getting feedback ===');
      console.error('Error:', error);

      let errorMessage = 'Error generating feedback. ';
      if (error.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your presentation format.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (error.response?.status === 413) {
        errorMessage = 'File is too large. Maximum size is 10MB.';
      } else if (error.response?.status === 415) {
        errorMessage = 'Unsupported file type. Please use PDF, DOC, DOCX, PPT, PPTX, or TXT files.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. The AI service may be temporarily unavailable.';
      } else if (error.message.includes('fetch file')) {
        errorMessage = 'Could not retrieve the uploaded file. Please try re-uploading.';
      } else if (error.message.includes('empty')) {
        errorMessage = 'The presentation appears to be empty.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }

      setFeedback(errorMessage);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Unknown Date'
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
  };

  const testFeedbackAPI = async () => {
    try {
      const testResponse = await fetch('http://127.0.0.1:8000/api/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          type: 'text',
          content: 'This is a test presentation content for debugging purposes.'
        })
      });

      const responseText = await testResponse.text();
      console.log('Test response status:', testResponse.status);
      console.log('Test response headers:', testResponse.headers);
      console.log('Test response body:', responseText);
    } catch (error) {
      console.error('Test API error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading presentations...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">My Presentations</h1>
        <button 
          onClick={testFeedbackAPI}
          className="bg-yellow-500 text-white px-4 py-2 rounded text-sm hover:bg-yellow-600"
        >
          Test API
        </button>
      </div>

      {presentations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No presentations uploaded yet.</p>
          <a href="/upload" className="text-blue-600 hover:underline mt-2 inline-block">
            Upload your first presentation
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presentations.map((presentation) => (
            <div
              key={presentation._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {presentation.fileName ? `📄 ${presentation.fileName}` : '📝 Text Presentation'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Uploaded: {formatDate(presentation.createdAt)}
                </p>
              </div>

              {presentation.textContent && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {presentation.textContent.substring(0, 150)}
                  {presentation.textContent.length > 150 && '...'}
                </p>
              )}

              <button
                onClick={() => handleGetFeedback(presentation)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Get AI Feedback
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <FeedbackModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setFeedback('');
            setSelectedPresentation(null);
          }}
          presentation={selectedPresentation}
          feedback={feedback}
          loading={feedbackLoading}
        />
      )}
    </div>
  );
};

export default MyPresentations;
