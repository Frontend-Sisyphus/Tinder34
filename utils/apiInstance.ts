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

export async function fetchPosts(
  page: number = 0, 
  tags: string = ''
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  
  // Добавляем все параметры
  params.append('page', API_CONFIG.defaultParams.page);
  params.append('s', API_CONFIG.defaultParams.s);
  params.append('q', API_CONFIG.defaultParams.q);
  params.append('json', API_CONFIG.defaultParams.json.toString());
  params.append('limit', API_CONFIG.defaultParams.limit.toString());
  params.append('pid', page.toString());
  
  if (tags) {
    params.append('tags', tags);
  }

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