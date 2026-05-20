"use client";

import { useEffect } from 'react';
import { usePostsQuery } from '@/hooks/usePostsQuery';
import { useSwipeStore } from '@/store/useSwipeStore';
import { useSwipeActions } from '@/hooks/useSwipeActions';

export default function SwipeController ({ tags = '' }: { tags?: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = usePostsQuery(tags);

  const { currentIndex, swipeLeft, swipeRight, undoLastSwipe } = useSwipeStore();
  
  // Получаем все посты из пагинированных данных
  const allPosts = data?.pages[0] || [];
  console.log(allPosts);
  const currentPost = allPosts[currentIndex];

  // Автоматическая подгрузка при приближении к концу
  useEffect(() => {
    if (currentIndex >= allPosts.length - 3 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [currentIndex, allPosts.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Сброс индекса при смене тегов
  useEffect(() => {
    useSwipeStore.getState().reset();
  }, [tags]);

  const handleSwipeLeft = () => {
    if (currentPost) {
      swipeLeft(currentPost);
    }
  };

  const handleSwipeRight = () => {
    if (currentPost) {
      swipeRight(currentPost);
    }
  };

  const handleUndo = () => {
    undoLastSwipe(allPosts);
  };

  // Возвращаем данные для UI
  return {
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
  };
};