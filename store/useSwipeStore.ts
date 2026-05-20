import { create } from 'zustand';
import { Post, SwipeStats } from '@/utils/types/swipeTypes';

interface SwipeStoreState {
  // Состояние свайпов (локальное, не требующее кэширования)
  currentIndex: number;
  likedPosts: Set<number>;
  dislikedPosts: Set<number>;
  viewedPosts: Set<number>;
  
  // Действия
  swipeLeft: (post: Post) => void;
  swipeRight: (post: Post) => void;
  undoLastSwipe: (posts: Post[]) => void;
  reset: () => void;
  getStats: () => SwipeStats;
  isPostLiked: (postId: number) => boolean;
  isPostDisliked: (postId: number) => boolean;
}

export const useSwipeStore = create<SwipeStoreState>((set, get) => ({
  currentIndex: 0,
  likedPosts: new Set(),
  dislikedPosts: new Set(),
  viewedPosts: new Set(),

  swipeLeft: (post: Post) => {
    set((state) => ({
      dislikedPosts: new Set(state.dislikedPosts).add(post.id),
      viewedPosts: new Set(state.viewedPosts).add(post.id),
      currentIndex: state.currentIndex + 1,
    }));
  },

  swipeRight: (post: Post) => {
    set((state) => ({
      likedPosts: new Set(state.likedPosts).add(post.id),
      viewedPosts: new Set(state.viewedPosts).add(post.id),
      currentIndex: state.currentIndex + 1,
    }));
  },

  undoLastSwipe: (posts: Post[]) => {
    set((state) => {
      if (state.currentIndex === 0) return state;
      
      const previousPost = posts[state.currentIndex - 1];
      const newLiked = new Set(state.likedPosts);
      const newDisliked = new Set(state.dislikedPosts);
      const newViewed = new Set(state.viewedPosts);
      
      newLiked.delete(previousPost.id);
      newDisliked.delete(previousPost.id);
      newViewed.delete(previousPost.id);
      
      return {
        likedPosts: newLiked,
        dislikedPosts: newDisliked,
        viewedPosts: newViewed,
        currentIndex: state.currentIndex - 1,
      };
    });
  },

  reset: () => {
    set({
      currentIndex: 0,
      likedPosts: new Set(),
      dislikedPosts: new Set(),
      viewedPosts: new Set(),
    });
  },

  getStats: () => {
    const { likedPosts, dislikedPosts, viewedPosts, currentIndex } = get();
    return {
      totalLikes: likedPosts.size,
      totalDislikes: dislikedPosts.size,
      totalViewed: viewedPosts.size,
      remainingPosts: 0, // Будет вычисляться в компоненте
    };
  },

  isPostLiked: (postId: number) => get().likedPosts.has(postId),
  isPostDisliked: (postId: number) => get().dislikedPosts.has(postId),
}));