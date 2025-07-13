import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllUploads, deleteUpload } from '../../services/uploadService';
import Loader from '../../components/Loader';
import ConfirmModal from '../../components/ConfirmModal';
import { CheckCircle } from 'lucide-react';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await getAllUploads();
        setFiles(res.data);
      } catch (err) {
        console.error('Failed to fetch files:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteUpload(selectedId);
      setFiles(files.filter((f) => f._id !== selectedId));
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-700">File Management</h1>
        <div className="text-sm text-slate-500">{files.length} presentations</div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Presentation</th>
              <th className="px-6 py-4 text-left font-medium">Uploaded By</th>
              <th className="px-6 py-4 text-left font-medium">Date</th>
              <th className="px-6 py-4 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {files.map((file, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {file.fileName
                    ? file.fileName
                    : file.text
                      ? file.text.slice(0, 50) + '...'
                      : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{file.userId?.name || 'Unknown'}</div>
                  <div className="text-xs text-slate-500">{file.userId?.email}</div>
                </td>
                <td className="px-6 py-4">
                  {file.dateUploaded
                    ? new Date(file.dateUploaded).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSelectedId(file._id);
                      setShowModal(true);
                    }}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Success animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center gap-2 mt-4 text-green-600 text-sm font-medium"
            >
              <CheckCircle className="w-5 h-5" />
              Deleted successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </motion.div>
  );
};

export default FileManager;
