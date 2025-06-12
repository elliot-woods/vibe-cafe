'use client';

import { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import LoadingSpinner from '@/components/LoadingSpinner';
import VibeResults from '@/components/VibeResults';
import { VibeAnalysis, UploadResponse } from '@/types';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VibeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    // Create preview URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (data.success && data.result) {
        setResult(data.result);
      } else {
        setError(data.error || 'Failed to analyze image');
        setUploadedImageUrl(null);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setUploadedImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
      setUploadedImageUrl(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Check the Vibe
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a photo of any restaurant, bar, or cafe to get an AI-powered analysis 
          of its atmosphere, crowd level, and availability.
        </p>
      </div>

      {!result && !isLoading && (
        <UploadZone onFileSelect={handleFileSelect} disabled={isLoading} />
      )}

      {isLoading && (
        <LoadingSpinner message="Checking the vibe..." />
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-700 font-medium">Oops! Something went wrong</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={handleReset}
            className="mt-3 text-red-600 hover:text-red-700 font-medium text-sm underline"
          >
            Try Again
          </button>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <VibeResults analysis={result} imageUrl={uploadedImageUrl || undefined} />
          <div className="text-center">
            <button
              onClick={handleReset}
              className="btn-primary"
            >
              Analyze Another Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 