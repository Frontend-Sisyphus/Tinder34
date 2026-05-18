export interface Post {
  id: number;
  file_url?: string;
  tags?: string;
  rating?: string;
  score?: number;
  // Добавь другие поля, которые возвращает твой API
  [key: string]: any;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  posts?: Post[];
  [key: string]: any;
}

export interface SwipeStats {
  totalLikes: number;
  totalDislikes: number;
  totalViewed: number;
  remainingPosts: number;
}

export interface SwipeState {
  posts: Post[];
  currentIndex: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  likedPosts: Set<number>;
  dislikedPosts: Set<number>;
  viewedPosts: Set<number>;
  currentTags: string;
}

export interface SwipeActions {
  initialize: (tags?: string) => Promise<void>;
  loadMore: () => Promise<void>;
  getCurrentPost: () => Post | null;
  swipeLeft: () => Post | null;
  swipeRight: () => Post | null;
  resetViewedPosts: () => void;
  isPostLiked: (postId: number) => boolean;
  isPostDisliked: (postId: number) => boolean;
  getStats: () => SwipeStats;
  clearError: () => void;
}

export type SwipeStore = SwipeState & SwipeActions;