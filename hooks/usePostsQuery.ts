import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { fetchPosts } from '@/utils/apiInstance';

import { Post } from '@/utils/types/swipeTypes';

export const usePostsQuery = (tags: string = '') => {
  return useInfiniteQuery({
    queryKey: ['posts', tags],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam, tags),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Предполагаем, что API возвращает hasMore или проверяем длину
      const hasMore = lastPage.posts?.length > 0;
      return hasMore ? allPages.length : undefined;
    },
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут (раньше было cacheTime)
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

// Хук для предзагрузки следующей страницы
export const usePreloadNextPage = (tags: string = '') => {
  const queryClient = useQueryClient();
  
  return (nextPage: number) => {
    queryClient.prefetchInfiniteQuery({
      queryKey: ['posts', tags],
      queryFn: ({ pageParam }) => fetchPosts(pageParam, tags),
      initialPageParam: 0,
      pages: [nextPage],
    });
  };
};