// stores/useSwipeStore.ts

import { create } from 'zustand';
import { Post, SwipeStore, SwipeStats } from '@/utils/types/swipeTypes';
import { fetchPosts } from '@/utils/apiInstance';

const useSwipeStore = create<SwipeStore>((set, get) => ({
  // Состояние
  posts: [],
  currentIndex: 0,
  currentPage: 0,
  isLoading: false,
  error: null,
  likedPosts: new Set<number>(),
  dislikedPosts: new Set<number>(),
  viewedPosts: new Set<number>(),
  currentTags: '',

  // Инициализация
  initialize: async (tags: string = ''): Promise<void> => {
    set({ isLoading: true, error: null, currentTags: tags });
    
    try {
      const data = await fetchPosts(0, tags);
      set({ 
        posts: data.posts || [], 
        currentIndex: 0,
        currentPage: 0,
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ 
        error: errorMessage, 
        isLoading: false,
        posts: [],
        currentIndex: 0
      });
    }
  },

  // Подгрузка дополнительных постов
  loadMore: async (): Promise<void> => {
    const { isLoading, currentPage, viewedPosts, currentTags } = get();
    
    if (isLoading) return;
    
    set({ isLoading: true });
    
    try {
      const nextPage = currentPage + 1;
      const data = await fetchPosts(nextPage, currentTags);
      const newPosts = (data.posts || []).filter(
        (post: Post) => !viewedPosts.has(post.id)
      );
      
      set((state) => ({
        posts: [...state.posts, ...newPosts],
        currentPage: nextPage,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
    }
  },

  // Получить текущий пост
  getCurrentPost: (): Post | null => {
    const { posts, currentIndex } = get();
    return posts[currentIndex] || null;
  },

  // Свайп влево (NOPE)
  swipeLeft: (): Post | null => {
    const { currentIndex, posts } = get();
    const currentPost = posts[currentIndex];
    
    if (!currentPost) return null;
    
    set((state) => {
      const newDislikedPosts = new Set(state.dislikedPosts);
      const newViewedPosts = new Set(state.viewedPosts);
      newDislikedPosts.add(currentPost.id);
      newViewedPosts.add(currentPost.id);
      
      return {
        dislikedPosts: newDislikedPosts,
        viewedPosts: newViewedPosts,
        currentIndex: state.currentIndex + 1
      };
    });
    
    // Автоподгрузка если подходим к концу
    if (currentIndex >= posts.length - 3) {
      void get().loadMore();
    }
    
    return get().getCurrentPost();
  },

  // Свайп вправо (LIKE)
  swipeRight: (): Post | null => {
    const { currentIndex, posts } = get();
    const currentPost = posts[currentIndex];
    
    if (!currentPost) return null;
    
    set((state) => {
      const newLikedPosts = new Set(state.likedPosts);
      const newViewedPosts = new Set(state.viewedPosts);
      newLikedPosts.add(currentPost.id);
      newViewedPosts.add(currentPost.id);
      
      return {
        likedPosts: newLikedPosts,
        viewedPosts: newViewedPosts,
        currentIndex: state.currentIndex + 1
      };
    });
    
    // Автоподгрузка если подходим к концу
    if (currentIndex >= posts.length - 3) {
      void get().loadMore();
    }
    
    return get().getCurrentPost();
  },

  // Сброс просмотренных постов
  resetViewedPosts: (): void => {
    set({ viewedPosts: new Set<number>() });
  },

  // Проверка, лайкнут ли пост
  isPostLiked: (postId: number): boolean => {
    return get().likedPosts.has(postId);
  },

  // Проверка, дизлайкнут ли пост
  isPostDisliked: (postId: number): boolean => {
    return get().dislikedPosts.has(postId);
  },

  // Получение статистики
  getStats: (): SwipeStats => {
    const { likedPosts, dislikedPosts, viewedPosts, posts, currentIndex } = get();
    return {
      totalLikes: likedPosts.size,
      totalDislikes: dislikedPosts.size,
      totalViewed: viewedPosts.size,
      remainingPosts: posts.length - currentIndex
    };
  },

  // Очистка ошибки
  clearError: (): void => set({ error: null })
}));

export default useSwipeStore;