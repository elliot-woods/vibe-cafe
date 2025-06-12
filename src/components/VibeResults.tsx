'use client';

import Image from 'next/image';
import { VibeAnalysis } from '@/types';

interface VibeResultsProps {
  analysis: VibeAnalysis;
  imageUrl?: string;
}

export default function VibeResults({ analysis, imageUrl }: VibeResultsProps) {
  const getCrowdedLevel = (level: number) => {
    if (level < 30) return { text: 'Quiet', color: 'text-green-600', bg: 'bg-green-100' };
    if (level < 70) return { text: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Busy', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return '🍸';
      case 'restaurant':
        return '🍽️';
      case 'cafe':
        return '☕';
      default:
        return '🏪';
    }
  };

  const crowdedInfo = getCrowdedLevel(analysis.crowded);

  return (
    <div className="result-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Vibe Analysis</h2>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getBusinessIcon(analysis.business_type)}</span>
          <span className="text-sm font-medium text-gray-600 capitalize">
            {analysis.business_type}
          </span>
        </div>
      </div>

      {imageUrl && (
        <div className="mb-6 flex justify-center">
          <div className="inline-block rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <Image
              src={imageUrl}
              alt="Uploaded venue"
              width={800}
              height={600}
              className="max-h-96 object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Overall Vibe</h3>
          <p className="text-gray-700 italic">&ldquo;{analysis.overall_vibe}&rdquo;</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Crowd Level</h3>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${crowdedInfo.color} ${crowdedInfo.bg}`}>
                {crowdedInfo.text}
              </span>
              <span className="text-gray-600">{analysis.crowded}%</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
            <div className="text-gray-700">
              {analysis.business_type === 'bar' ? (
                <span>{analysis.open_bar_seats || 0} open bar seats</span>
              ) : (
                <span>{analysis.open_tables || 0} open tables</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 