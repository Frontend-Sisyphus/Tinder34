// hooks/useSwipeActions.ts

import { useCallback } from 'react';

import useSwipeStore from '@/store/useSwipeStore';

import { Post, SwipeStats } from '@/utils/types/swipeTypes';

type SwipeDirection = 'left' | 'right';

interface UseSwipeActionsReturn {
  // Состояние
  posts: Post[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  currentTags: string;
  
  // Действия
  swipeWithAnimation: (direction: SwipeDirection) => Post | null;
  undoLastSwipe: () => void;
  resetViewedPosts: () => void;
  isPostLiked: (postId: number) => boolean;
  isPostDisliked: (postId: number) => boolean;
  getStats: () => SwipeStats;
  clearError: () => void;
}

export const useSwipeActions = (): UseSwipeActionsReturn => {
  const {
    posts,
    currentIndex,
    isLoading,
    error,
    currentTags,
    swipeLeft,
    swipeRight,
    resetViewedPosts,
    isPostLiked,
    isPostDisliked,
    getStats,
    clearError
  } = useSwipeStore();

  const swipeWithAnimation = useCallback((direction: SwipeDirection): Post | null => {
    // Здесь можно добавить дополнительную логику перед/после свайпа
    // Например, аналитику или сохранение в localStorage
    
    if (direction === 'left') {
      return swipeLeft();
    } else {
      return swipeRight();
    }
  }, [swipeLeft, swipeRight]);

  const undoLastSwipe = useCallback((): void => {
    const state = useSwipeStore.getState();
    if (state.currentIndex > 0) {
      useSwipeStore.setState((prevState) => ({
        currentIndex: prevState.currentIndex - 1
      }));
    }
  }, []);

  return {
    posts,
    currentIndex,
    isLoading,
    error,
    currentTags,
    swipeWithAnimation,
    undoLastSwipe,
    resetViewedPosts,
    isPostLiked,
    isPostDisliked,
    getStats,
    clearError
  };
};