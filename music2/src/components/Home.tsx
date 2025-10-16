import { useState, useEffect } from 'react';
import UploadModal from './/UploadModal';

interface Song {
  id: number;
  title: string;
  artist: string;
  duration: number;
  audio_url: string;
  file_size: number;
  file_format: string;
  created_at: string;
}

const Home = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Fetch songs from backend
  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3002/api/songs');
      if (!response.ok) {
        throw new Error('Failed to fetch songs');
      }
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format file size from bytes to MB
  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handlePlay = (songId: number) => {
    if (currentlyPlaying === songId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(songId);
    }
  };

  const handleUploadSuccess = () => {
    fetchSongs(); // Refresh the songs list
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading songs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-6 py-4 rounded-lg max-w-md">
          <h3 className="font-bold text-lg mb-2">Error</h3>
          <p>{error}</p>
          <button 
            onClick={fetchSongs}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 My Music Library
          </h1>
          <p className="text-gray-400">
            {songs.length} {songs.length === 1 ? 'song' : 'songs'} in your library
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchSongs}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Song
          </button>
        </div>
      </div>

      {/* Songs Grid */}
      {songs.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-md mx-auto">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-bold text-white mb-3">No Songs Found</h3>
            <p className="text-gray-400 mb-6">
              Your music library is empty. Upload some songs to get started!
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Upload Your First Song
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-all duration-300 transform hover:scale-105"
            >
              {/* Song Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 truncate">
                  {song.title}
                </h3>
                <p className="text-gray-400 mb-3 truncate">
                  {song.artist}
                </p>
                
                {/* Song Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-xs font-medium">
                    ⏱️ {formatDuration(song.duration)}
                  </span>
                  <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                    💾 {formatFileSize(song.file_size)}
                  </span>
                  <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs font-medium">
                    🎶 {song.file_format.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Song Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => handlePlay(song.id)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    currentlyPlaying === song.id
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                >
                  {currentlyPlaying === song.id ? (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Play
                    </>
                  )}
                </button>

                {/* Audio Player */}
                {currentlyPlaying === song.id && (
                  <div className="bg-gray-900 rounded-lg p-3 border border-gray-600">
                    <audio
                      controls
                      autoPlay
                      className="w-full h-8"
                      src={`http://localhost:3002${song.audio_url}`}
                      onEnded={() => setCurrentlyPlaying(null)}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>

              {/* Created Date */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Added: {new Date(song.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default Home;