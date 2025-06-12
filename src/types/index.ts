export interface VibeAnalysis {
  crowded: number; // 0-100
  open_tables?: number;
  open_bar_seats?: number;
  business_type: 'bar' | 'restaurant' | 'cafe';
  overall_vibe: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis?: VibeAnalysis;
  error?: string;
}

export interface UploadResponse {
  success: boolean;
  result?: VibeAnalysis;
  error?: string;
} 