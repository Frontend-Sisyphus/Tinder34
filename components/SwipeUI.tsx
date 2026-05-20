'use client';

import { useState } from 'react';
import { useSwipeActions } from '@/hooks/useSwipeActions';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import Sidebar from './Sidebar';
import TheHeader from './TheHeader';
import SwipeCard from './SwipeCard';
import ActionButtons from './ActionButtons';

import "@/styles/swipeUi.css";

interface SwipeUIProps {
  tags?: string;
}

export default function SwipeUI({ tags }: SwipeUIProps) {
  const {
    currentPost,
    isLoading,
    error,
    swipeWithAnimation,
    undoLastSwipe,
    getStats,
  } = useSwipeActions(tags);

  const [showStats, setShowStats] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!currentPost) return <EmptyState />;

  const stats = getStats();

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      swipeWithAnimation(direction);
      setSwipeDirection(null);
    }, 200);
  };

  return (
    <div className="swipeUi">
      <Sidebar showStats={showStats} onToggle={() => setShowStats(!showStats)} stats={stats} />

      <main className="main">
        <TheHeader tags={tags} />

        <div className="cardContainer">
          {currentPost && <SwipeCard post={currentPost} swipeDirection={swipeDirection} />}
        </div>

        <ActionButtons
          onNope={() => handleSwipe('left')}
          onLike={() => handleSwipe('right')}
          onUndo={undoLastSwipe}
        />
      </main>

      <style jsx global>{`
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </div>
  );
}