import React, { useState } from 'react';
import axios from 'axios';

interface VideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  view_count: number;
  description: string;
  upload_date: string;
  tags: string[];
  categories: string[];
  available_qualities: number[];
  available_formats: string[];
  has_subtitles: boolean;
  formats: {
    video: FormatInfo[];
    audio: FormatInfo[];
  };
}

interface FormatInfo {
  format_id: string;
  ext: string;
  quality: number;
  filesize: number;
  filesize_approx: number;
  format_note: string;
  fps: number;
  vcodec: string;
  acodec: string;
  height: number;
  width: number;
  abr: number;
  vbr: number;
  tbr: number;
}

interface DownloadOptions {
  type: 'video' | 'audio';
  video_quality: string;
  video_format: string;
  audio_quality: string;
  audio_format: string;
}

type ActiveTab = 'quick' | 'advanced' | 'batch';

const YouTubeDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('quick');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const progressAnimationRef = React.useRef<NodeJS.Timeout | null>(null);
  const [downloadOptions, setDownloadOptions] = useState<DownloadOptions>({
    type: 'video',
    video_quality: 'best',
    video_format: 'mp4',
    audio_quality: '320',
    audio_format: 'mp3',
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  const fetchVideoInfo = async () => {
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/youtube-info/`, {
        url,
      });
      setVideoInfo(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch video information');
    } finally {
      setLoading(false);
    }
  };

  const simulateDownloadProgress = () => {
    let progress = 0;

    const updateProgress = () => {
      // Remove 1% of the remaining space every 10ms
      const remaining = 100 - progress;
      const increment = remaining * 0.01;
      progress += increment;

      setDownloadProgress(progress);

      // Continue indefinitely (never reaches 100%)
      progressAnimationRef.current = setTimeout(updateProgress, 10);
    };

    updateProgress();
  };

  const handleDownload = async () => {
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    // Cancel any existing progress animation
    if (progressAnimationRef.current) {
      clearTimeout(progressAnimationRef.current);
      progressAnimationRef.current = null;
    }

    setLoading(true);
    setError('');
    setDownloadProgress(0);

    // Start the fake progress simulation
    simulateDownloadProgress();

    try {
      console.log('Video Info Title:', videoInfo?.title);
      console.log('Download Options:', downloadOptions);

      // Auto-configure advanced options based on format support
      const autoConfiguredOptions = {
        ...downloadOptions,
        // Auto settings
        video_codec: 'auto',
        file_size_limit: null,
        // Auto-include features based on type and format
        include_subtitles: downloadOptions.type === 'video',
        include_thumbnail: downloadOptions.type === 'audio',
        include_metadata: true,
      };

      const payload = {
        url,
        ...autoConfiguredOptions,
      };

      console.log('Full payload being sent to backend:', JSON.stringify(payload, null, 2));

      const response = await axios.post(`${API_BASE_URL}/youtube-download/`, payload, {
        responseType: 'blob',
        timeout: 300000, // 5 minutes timeout for large files
      });

      // Create a download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Generate filename on frontend with actual timestamp
      const filename = generateFilename(true);
      console.log('Generated filename on frontend:', filename);

      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Download failed');
    } finally {
      // Cancel progress animation when download completes
      if (progressAnimationRef.current) {
        clearTimeout(progressAnimationRef.current);
        progressAnimationRef.current = null;
      }
      setLoading(false);
      setDownloadProgress(0);
    }
  };

  const updateDownloadOption = <K extends keyof DownloadOptions>(
    key: K,
    value: DownloadOptions[K]
  ) => {
    setDownloadOptions((prev) => ({ ...prev, [key]: value }));
  };

  const generateFilename = (withTimestamp = false) => {
    if (!videoInfo?.title) return 'download';

    // Clean title for filename use
    let cleanTitle = videoInfo.title
      .replace(/[<>:"/\\|?*]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    if (cleanTitle.length > 50) {
      cleanTitle = cleanTitle.substring(0, 50).replace(/_+$/, '');
    }

    // Build quality parts
    const qualityParts = [];

    if (downloadOptions.type === 'video') {
      if (downloadOptions.video_quality === 'best') {
        qualityParts.push('BEST');
      } else if (downloadOptions.video_quality === 'worst') {
        qualityParts.push('LOWEST');
      } else if (downloadOptions.video_quality.match(/^\d+$/)) {
        qualityParts.push(`${downloadOptions.video_quality}p`);
      } else {
        qualityParts.push(downloadOptions.video_quality.toUpperCase());
      }
      qualityParts.push(downloadOptions.video_format.toUpperCase());
    } else {
      qualityParts.push(`${downloadOptions.audio_quality}kbps`);
      qualityParts.push(downloadOptions.audio_format.toUpperCase());
    }

    // Auto-include features are now implicit in the format choice
    if (downloadOptions.type === 'video') qualityParts.push('SUBS');
    if (downloadOptions.type === 'audio') qualityParts.push('THUMB');

    const qualityString = qualityParts.join('_');
    const ext =
      downloadOptions.type === 'audio'
        ? downloadOptions.audio_format
        : downloadOptions.video_format;

    // Generate timestamp when actually downloading
    const timestamp = withTimestamp
      ? new Date().toISOString().replace(/[-:]/g, '_').replace(/T/, '_').split('.')[0]
      : 'YYYY_MM_DD_HH_MM_SS';

    return `${cleanTitle}_${qualityString}_${timestamp}.${ext}`;
  };

  const generateFilenamePreview = () => {
    return generateFilename(false);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="youtube-downloader pixel-font">
      <h2 className="mb-6 text-3xl font-bold text-blue-300">YouTube Downloader Pro</h2>

      <div className="input-section mb-6">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-3 text-white placeholder-blue-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchVideoInfo}
          disabled={loading || !url}
          className="mt-3 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-700"
        >
          {loading ? 'Loading...' : 'Get Video Info'}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-700 bg-red-900/50 px-4 py-3 text-red-300">
          {error}
        </div>
      )}

      {videoInfo && (
        <div className="video-info mb-6 rounded-lg border border-blue-700 bg-blue-800/50 p-6">
          {/* Video Information */}
          <div className="mb-6 flex items-start space-x-6">
            <img
              src={videoInfo.thumbnail}
              alt={videoInfo.title}
              className="h-auto w-48 rounded-lg shadow-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold leading-tight text-blue-200">{videoInfo.title}</h3>
              <p className="text-blue-400">By: {videoInfo.uploader}</p>
              <p className="text-blue-400">Duration: {formatDuration(videoInfo.duration)}</p>
              <p className="text-blue-400">Views: {videoInfo.view_count?.toLocaleString()}</p>
              {videoInfo.upload_date && (
                <p className="text-blue-400">
                  Upload Date: {new Date(videoInfo.upload_date).toLocaleDateString()}
                </p>
              )}
              {videoInfo.has_subtitles && <p className="text-green-400">✓ Subtitles Available</p>}
              {videoInfo.available_qualities.length > 0 && (
                <p className="text-blue-400">
                  Available Qualities: {videoInfo.available_qualities.join('p, ')}p
                </p>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs mb-6">
            <div className="flex border-b border-blue-700">
              {(['quick', 'advanced'] as ActiveTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-400 text-blue-300' : 'text-blue-500 hover:text-blue-300'}`}
                >
                  {tab === 'quick' ? 'Quick Download' : 'Advanced Options'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Download Tab */}
          {activeTab === 'quick' && (
            <div className="quick-download space-y-6">
              {/* Media Type Button Group */}
              <div className="media-type-selection">
                <h4 className="mb-4 text-lg font-semibold text-blue-300">Choose Download Type</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateDownloadOption('type', 'video')}
                    className={`flex-1 rounded-xl border-2 px-6 py-4 transition-all duration-200 ${
                      downloadOptions.type === 'video'
                        ? 'border-blue-400 bg-blue-600/30 text-blue-200'
                        : 'border-blue-700 bg-blue-900/20 text-blue-400 hover:border-blue-500 hover:bg-blue-800/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-2 text-2xl">🎬</div>
                      <div className="font-semibold">Video</div>
                      <div className="text-sm opacity-80">Best Quality MP4</div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateDownloadOption('type', 'audio')}
                    className={`flex-1 rounded-xl border-2 px-6 py-4 transition-all duration-200 ${
                      downloadOptions.type === 'audio'
                        ? 'border-blue-400 bg-blue-600/30 text-blue-200'
                        : 'border-blue-700 bg-blue-900/20 text-blue-400 hover:border-blue-500 hover:bg-blue-800/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-2 text-2xl">🎵</div>
                      <div className="font-semibold">Audio Only</div>
                      <div className="text-sm opacity-80">320kbps MP3</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Options Tab */}
          {activeTab === 'advanced' && (
            <div className="advanced-options space-y-6">
              {/* Media Type Selection */}
              <div className="media-type">
                <h4 className="mb-4 text-lg font-semibold text-blue-300">Media Type</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateDownloadOption('type', 'video')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 transition-all duration-200 ${
                      downloadOptions.type === 'video'
                        ? 'border-blue-400 bg-blue-600/30 text-blue-200'
                        : 'border-blue-700 bg-blue-900/20 text-blue-400 hover:border-blue-500 hover:bg-blue-800/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-1 text-lg">🎬</div>
                      <div className="font-medium">Video</div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateDownloadOption('type', 'audio')}
                    className={`flex-1 rounded-lg border-2 px-4 py-3 transition-all duration-200 ${
                      downloadOptions.type === 'audio'
                        ? 'border-blue-400 bg-blue-600/30 text-blue-200'
                        : 'border-blue-700 bg-blue-900/20 text-blue-400 hover:border-blue-500 hover:bg-blue-800/30'
                    }`}
                  >
                    <div className="text-center">
                      <div className="mb-1 text-lg">🎵</div>
                      <div className="font-medium">Audio Only</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Video Options */}
              {downloadOptions.type === 'video' && (
                <div className="video-options space-y-4">
                  <h4 className="text-lg font-semibold text-blue-300">Video Options</h4>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Video Quality */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">
                        Quality
                      </label>
                      <select
                        value={downloadOptions.video_quality}
                        onChange={(e) => updateDownloadOption('video_quality', e.target.value)}
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="best">Best Available (Auto)</option>
                        <option value="2160">4K Ultra HD (2160p)</option>
                        <option value="1440">Quad HD (1440p)</option>
                        <option value="1080">Full HD (1080p)</option>
                        <option value="720">HD Ready (720p)</option>
                        <option value="480">Standard Definition (480p)</option>
                        <option value="360">Mobile Quality (360p)</option>
                        <option value="240">Low Quality (240p)</option>
                        <option value="144">Very Low Quality (144p)</option>
                        <option value="worst">Extreme Data Saver (Lowest Available)</option>
                      </select>
                    </div>

                    {/* Video Format */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">Format</label>
                      <select
                        value={downloadOptions.video_format}
                        onChange={(e) => updateDownloadOption('video_format', e.target.value)}
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="mp4">MP4 (Most Compatible)</option>
                        <option value="webm">WebM (Smaller Size)</option>
                        <option value="mkv">MKV (High Quality)</option>
                        <option value="avi">AVI (Legacy)</option>
                        <option value="mov">MOV (Apple)</option>
                        <option value="flv">FLV (Flash)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-blue-400">
                    <p>✓ Subtitles and metadata will be included automatically when available</p>
                  </div>
                </div>
              )}

              {/* Audio Options */}
              {downloadOptions.type === 'audio' && (
                <div className="audio-options space-y-4">
                  <h4 className="text-lg font-semibold text-blue-300">Audio Options</h4>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Audio Quality/Bitrate */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">
                        Quality (Bitrate)
                      </label>
                      <select
                        value={downloadOptions.audio_quality}
                        onChange={(e) => updateDownloadOption('audio_quality', e.target.value)}
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="320">320 kbps (Premium Quality)</option>
                        <option value="256">256 kbps (High Quality)</option>
                        <option value="192">192 kbps (Standard Quality)</option>
                        <option value="128">128 kbps (Good Quality)</option>
                        <option value="96">96 kbps (Acceptable Quality)</option>
                        <option value="64">64 kbps (Basic Quality)</option>
                        <option value="32">32 kbps (Very Low Quality)</option>
                        <option value="16">16 kbps (Extreme Data Saver)</option>
                        <option value="8">8 kbps (Unrecognizable Quality)</option>
                      </select>
                    </div>

                    {/* Audio Format */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-blue-300">Format</label>
                      <select
                        value={downloadOptions.audio_format}
                        onChange={(e) => updateDownloadOption('audio_format', e.target.value)}
                        className="w-full rounded-lg border border-blue-700 bg-blue-900/50 p-2 text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="mp3">MP3 (Universal)</option>
                        <option value="m4a">M4A (Apple)</option>
                        <option value="flac">FLAC (Lossless)</option>
                        <option value="ogg">OGG (Open Source)</option>
                        <option value="wav">WAV (Uncompressed)</option>
                        <option value="opus">OPUS (Modern)</option>
                        <option value="aac">AAC (Advanced)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-blue-400">
                    <p>✓ Thumbnail and metadata will be included automatically for album art</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Filename Preview */}
          <div className="filename-preview mt-6 rounded-lg border border-blue-800 bg-blue-900/30 p-4">
            <h4 className="mb-2 text-sm font-medium text-blue-300">Filename Preview:</h4>
            <div className="break-all rounded bg-blue-950/50 p-2 font-mono text-xs text-blue-200">
              {generateFilenamePreview()}
            </div>
            <p className="mt-1 text-xs text-blue-400">
              * Timestamp will be replaced with actual download time (YYYY_MM_DD_HH_MM_SS format)
            </p>
          </div>

          {/* Download Progress Bar */}
          {loading && (
            <div className="download-progress mt-6 rounded-lg border border-blue-700 bg-blue-900/30 p-4">
              <div className="h-2 w-full rounded-full bg-blue-800/50">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Download Button */}
          <div className="download-section mt-8 border-t border-blue-700 pt-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="download-summary space-y-1 text-sm text-blue-400">
                <p>Download: {downloadOptions.type === 'audio' ? 'Audio Only' : 'Video'}</p>
                <p>
                  Format:{' '}
                  {downloadOptions.type === 'audio'
                    ? downloadOptions.audio_format.toUpperCase()
                    : downloadOptions.video_format.toUpperCase()}
                  {downloadOptions.type === 'audio' && ` (${downloadOptions.audio_quality}kbps)`}
                  {downloadOptions.type === 'video' &&
                    downloadOptions.video_quality !== 'best' &&
                    downloadOptions.video_quality !== 'worst' &&
                    ` (${downloadOptions.video_quality}p)`}
                  {downloadOptions.video_quality === 'worst' && ' (Lowest Quality)'}
                </p>
                <p className="text-xs text-blue-500">
                  {downloadOptions.type === 'video'
                    ? '✓ Includes subtitles & metadata automatically'
                    : '✓ Includes thumbnail & metadata automatically'}
                </p>
              </div>

              <button
                onClick={handleDownload}
                disabled={loading}
                className="min-w-[200px] rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>Downloading...</span>
                  </span>
                ) : (
                  `Download ${downloadOptions.type === 'audio' ? downloadOptions.audio_format.toUpperCase() : downloadOptions.video_format.toUpperCase()}`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeDownloader;
