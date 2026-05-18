import { ApiResponse } from '@/utils/types/swipeTypes';

const API_CONFIG = {
  baseUrl: 'https://rule34.xxx/index.php',
  defaultParams: {
    page: 'dapi',
    s: 'post',
    q: 'index',
    json: 1,
    limit: 20
  }
} as const;

interface FetchPostsParams {
  page?: number;
  tags?: string;
  limit?: number;
}

export async function fetchPosts(
  page: number = 0, 
  tags: string = ''
): Promise<ApiResponse> {
  const params = new URLSearchParams({
    ...API_CONFIG.defaultParams,
    pid: page.toString(),
    ...(tags && { tags })
  });

  const response = await fetch(`${API_CONFIG.baseUrl}?${params}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data: ApiResponse = await response.json();
  
  if (data.success === false) {
    throw new Error(data.message || 'Search is down');
  }
  
  return data;
}