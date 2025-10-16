// Global type definitions for the application

// Media Converter Types - removed MediaFile as it's redundant with native File type

export interface FileInfo {
  filename: string;
  file_type: 'video' | 'audio' | 'image' | 'unknown';
  mime_type: string;
  size: number;
  duration?: number;
  width?: number;
  height?: number;
  codec?: string;
  bitrate?: number;
  sample_rate?: number;
  video_codec?: string;
  audio_codec?: string;
  fps?: number;
  channels?: number;
}

export interface SupportedConversion {
  format: string;
  type: 'video' | 'audio' | 'image';
  description?: string;
}

export interface ConversionOptions {
  format: string;
  available_options: {
    [key: string]: string[] | string;
  };
}

export interface ConversionResult {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  download_url?: string;
  error?: string;
}

export interface MediaAnalyzeResponse {
  temp_id: string;
  filename: string;
  file_type: 'video' | 'audio' | 'image' | 'unknown';
  mime_type: string;
  size: number;
  file_info: FileInfo;
  supported_conversions: SupportedConversion[];
}

// Services Types
export interface Service {
  title: string;
  description: string[];
  status: 'available' | 'in progress' | 'maintenance';
  url: string;
}

export interface ServicesProps {
  isThin: boolean;
}

// Common UI Types
export interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ProgressBarProps {
  progress: number;
  className?: string;
}

// API Response Types
export interface ApiError {
  error: string;
  message?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// File Upload Types - using AxiosProgressEvent directly
// React event types are used directly instead of custom interfaces

// Conversion Status Types
export type ConversionStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ConversionTask {
  task_id: string;
  status: ConversionStatus;
  progress: number;
  input_path?: string;
  output_path?: string;
  output_format?: string;
  download_url?: string;
  error?: string;
}

// Media Type Definitions
export type MediaType = 'video' | 'audio' | 'image' | 'unknown';

export type VideoFormat =
  | 'mp4'
  | 'avi'
  | 'mov'
  | 'mkv'
  | 'webm'
  | 'flv'
  | 'wmv'
  | 'm4v'
  | 'mpg'
  | 'mpeg'
  | '3gp'
  | 'ogv';
export type AudioFormat =
  | 'mp3'
  | 'wav'
  | 'flac'
  | 'aac'
  | 'ogg'
  | 'wma'
  | 'm4a'
  | 'opus'
  | 'aiff'
  | 'ac3'
  | 'dts';
export type ImageFormat =
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'bmp'
  | 'webp'
  | 'tiff'
  | 'ico'
  | 'svg'
  | 'heic'
  | 'heif';

export type SupportedFormat = VideoFormat | AudioFormat | ImageFormat;

// Conversion Option Types
export interface VideoConversionOptions {
  resolution?: string;
  fps?: number;
  codec?: string;
  bitrate?: string;
  quality?: 'high' | 'medium' | 'low';
}

export interface AudioConversionOptions {
  bitrate?: string;
  sample_rate?: number;
  channels?: number;
  quality?: 'high' | 'medium' | 'low';
}

export interface ImageConversionOptions {
  quality?: 'high' | 'medium' | 'low';
  resolution?: string;
  timestamp?: number;
}

export type AllConversionOptions = VideoConversionOptions &
  AudioConversionOptions &
  ImageConversionOptions & {
    start_time?: number;
    end_time?: number;
  };
