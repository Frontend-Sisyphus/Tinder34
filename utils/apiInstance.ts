import { ApiResponse } from '@/utils/types/swipeTypes';

import axios from "axios";

const API_CONFIG = {
  baseUrl: 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&api_key=9a9d453f3b0adb648543aeec40aa141faf147a370f5c8de1e626919360ca9a8935043cbf72730ecdacb2152d8515ca5d97fba020fd12d61774cf24880a82e214&user_id=3623331',
  defaultParams: {
    json: 1,
    limit: 1000
  }
} as const;

export async function fetchPosts(
  page: number = 0, 
  tags: string = ''
): Promise<any> {
  try {
    const response = await axios.get<ApiResponse>(`${API_CONFIG.baseUrl}`, {
      params: {
        json: API_CONFIG.defaultParams.json,
        limit: API_CONFIG.defaultParams.limit,
        pid: page,
        ...(tags && { tags })
      }
    });
    
    if (response.data.success === false) {
      throw new Error(response.data.message || 'Search is down');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP error! status: ${error.response?.status || error.message}`);
    }
    throw error;
  }
}