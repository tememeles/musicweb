import React, { useState, useEffect } from 'react';

interface UploadFormData {
  title: string;
  artist: string;
  file: File | null;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const apiurl = import.meta.env.VITE_BACKEND_URL;

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    artist: '',
    file: null
  });
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ title: '', artist: '', file: null });
      setError(null);
      setSuccess(false);
      setUploading(false);
      setDragActive(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (!formData.title) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({
          ...prev,
          title: fileName,
          file
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          file
        }));
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({
          ...prev,
          title: !prev.title ? fileName : prev.title,
          file
        }));
        setError(null);
      } else {
        setError('Please upload an audio file');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file || !formData.title || !formData.artist) {
      setError('Please fill in all fields and select a file');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('artist', formData.artist);
    formDataToSend.append('audio', formData.file);

    try {
      setUploading(true);
      setError(null);
      
      const response = await fetch(new URL('/api/upload', apiurl), {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      
      setSuccess(true);
      
      // Call success callback to refresh songs
      onUploadSuccess();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gray-800 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">🎵 Upload Music</h2>
            <p className="text-gray-400 mt-1">Add new songs to your library</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Upload Successful!</h3>
              <p className="text-gray-400">Your song has been added to your library.</p>
              <p className="text-sm text-gray-500 mt-2">This modal will close automatically...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold text-white">
                  Audio File
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    dragActive
                      ? 'border-pink-400 bg-pink-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    id="modal-file-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {formData.file ? (
                    <div className="space-y-2">
                      <div className="text-4xl">🎵</div>
                      <p className="text-white font-semibold">{formData.file.name}</p>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(formData.file.size)} • {formData.file.type}
                      </p>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, file: null }))}
                        className="text-red-400 hover:text-red-300 text-sm underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-4xl">📁</div>
                      <div>
                        <p className="text-white font-semibold mb-2">
                          Drag and drop your audio file here
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                          or click to browse files
                        </p>
                        <div className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block">
                          Choose File
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Supported formats: MP3, WAV, FLAC, M4A
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Song Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Song Title */}
                <div className="space-y-2">
                  <label htmlFor="modal-title" className="block text-lg font-semibold text-white">
                    Song Title
                  </label>
                  <input
                    type="text"
                    id="modal-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter song title"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Artist */}
                <div className="space-y-2">
                  <label htmlFor="modal-artist" className="block text-lg font-semibold text-white">
                    Artist
                  </label>
                  <input
                    type="text"
                    id="modal-artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    placeholder="Enter artist name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                  <p className="font-semibold">Error:</p>
                  <p>{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !formData.file || !formData.title || !formData.artist}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    uploading || !formData.file || !formData.title || !formData.artist
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Uploading...
                    </div>
                  ) : (
                    'Upload Song'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;