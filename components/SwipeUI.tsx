"use client";
import { useSwipeActions } from '@/hooks/useSwipeActions';

import { motion } from 'framer-motion';

export default function SwipeUI({ tags }: { tags?: string }) {
  const {
    currentPost,
    isLoading,
    error,
    swipeWithAnimation,
    undoLastSwipe,
    getStats,
  } = useSwipeActions(tags);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return <div>No more posts</div>;

  const stats = getStats();

  return (
    <div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 100) swipeWithAnimation('right');
          if (info.offset.x < -100) swipeWithAnimation('left');
        }}
      >
        <img src={currentPost.image} alt={currentPost.title} />
        <h3>{currentPost.title}</h3>
      </motion.div>
      
      <div>
        <button onClick={() => swipeWithAnimation('left')}>👎</button>
        <button onClick={() => swipeWithAnimation('right')}>👍</button>
        <button onClick={undoLastSwipe}>↩️ Undo</button>
      </div>
      
      <div>
        <span>Likes: {stats.totalLikes}</span>
        <span>Remaining: {stats.remainingPosts}</span>
      </div>
    </div>
  );
};