import { useCallback, useMemo } from 'react';
import SwipeController from '@/components/SwipeController';
import { useSwipeStore } from '@/store/useSwipeStore';
import { Post, SwipeStats } from '@/utils/types/swipeTypes';

type SwipeDirection = 'left' | 'right';

export const useSwipeActions = (tags: string = '') => {
  const {
    currentPost,
    isLoading,
    isFetchingNextPage,
    error,
    allPosts,
    currentIndex,
    handleSwipeLeft,
    handleSwipeRight,
    handleUndo,
    refetch,
  } = SwipeController({ tags });

  const {
    isPostLiked,
    isPostDisliked,
    getStats: getStoreStats,
  } = useSwipeStore();

  const swipeWithAnimation = useCallback((direction: SwipeDirection): Post | null => {
    if (!currentPost) return null;
    
    // Здесь можно добавить анимацию
    if (direction === 'left') {
      handleSwipeLeft();
    } else {
      handleSwipeRight();
    }
    
    // Отправка аналитики
    console.log(`Swiped ${direction} on post ${currentPost.id}`);
    
    return currentPost;
  }, [currentPost, handleSwipeLeft, handleSwipeRight]);

  const getStats = useCallback((): SwipeStats => {
    const storeStats = getStoreStats();
    return {
      ...storeStats,
      remainingPosts: allPosts.length - currentIndex,
    };
  }, [allPosts.length, currentIndex, getStoreStats]);

  return {
    // Данные
    currentPost,
    allPosts,
    currentIndex,
    isLoading: isLoading || isFetchingNextPage,
    error: error?.message || null,
    hasMore: !!useSwipeActions.length,
    
    // Действия
    swipeWithAnimation,
    undoLastSwipe: handleUndo,
    reset: () => useSwipeStore.getState().reset(),
    refetch,
    
    // Утилиты
    isPostLiked,
    isPostDisliked,
    getStats,
  };
};