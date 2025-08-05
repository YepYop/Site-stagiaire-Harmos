/**
 * CandidatureRecord - Interface for candidature data structure
 */
export interface CandidatureRecord {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
  big_five_1?: number;
  big_five_2?: number;
  big_five_3?: number;
  big_five_4?: number;
  big_five_5?: number;
  communication_style?: string;
  conflict_style?: string;
  availability_1?: string;
  availability_2?: string;
  weekly_hours?: number;
  creativity_1?: string;
  creativity_2?: string;
  song_1?: string;
  song_2?: string;
  song_3?: string;
  portfolio?: string;
  files?: string;
  file_urls?: string[];
  created_at?: string;
}

/**
 * DatabaseService - Simplified version that doesn't use Supabase
 * 
 * This service is a placeholder that simulates database operations
 * but doesn't actually store data persistently since we're using EmailJS only.
 */
export class DatabaseService {
  /**
   * Simulates saving a candidature record
   * Since we're not using a database anymore, this just returns success
   */
  static async saveCandidature(candidatureData: CandidatureRecord): Promise<{ success: boolean; error?: string; data?: CandidatureRecord[] }> {
    try {
      // Generate a fake ID for consistency with previous implementation
      const fakeId = `fake-${Date.now()}`;
      console.log('Candidature processed (no database storage):', candidatureData.name);
      
      // Create a fake response that mimics the previous structure
      const fakeData = [{
        ...candidatureData,
        id: fakeId,
        created_at: new Date().toISOString()
      }];
      
      return { success: true, data: fakeData };
    } catch (error) {
      console.error('Error in candidature processing:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Simulates file upload
   * Since we're not using Supabase storage anymore, this just returns a placeholder URL
   */
  static async uploadFile(file: File, bucket: string = 'candidature-files'): Promise<{ success: boolean; url?: string; error?: string }> {
    try {
      // Clean filename: remove special characters and spaces
      const cleanName = file.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
        .replace(/_{2,}/g, '_'); // Replace multiple underscores with single
      
      const fileName = `${Date.now()}-${cleanName}`;
      
      // Create a placeholder URL
      const placeholderUrl = `file://${bucket}/${fileName}`;
      
      console.log('File processed (no storage):', file.name);
      return { success: true, url: placeholderUrl };
    } catch (error) {
      console.error('Error processing file:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Simulates fetching all candidatures
   * Since we're not using a database anymore, this returns an empty array
   */
  static async getAllCandidatures(): Promise<{ success: boolean; data?: CandidatureRecord[]; error?: string }> {
    try {
      console.log('Fetching candidatures (no database, returning empty array)');
      return { success: true, data: [] };
    } catch (error) {
      console.error('Error in getAllCandidatures:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}