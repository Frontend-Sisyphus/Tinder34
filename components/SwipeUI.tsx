"use client";
import React, { useEffect, useState, useCallback } from 'react';

import useSwipeStore from '@/store/useSwipeStore';

import { Post } from '@/utils/types/swipeTypes';

import "@/styles/swipeUi.css";

interface TouchOrMouseEvent {
  clientX: number;
  type: string;
}

const SwipeUI: React.FC = () => {
  const {
    posts,
    currentIndex,
    isLoading,
    error,
    getCurrentPost,
    swipeLeft,
    swipeRight,
    initialize,
    getStats
  } = useSwipeStore();

  const [currentX, setCurrentX] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Инициализация при монтировании
  useEffect(() => {
    void initialize('rating:safe');
  }, [initialize]);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent): void => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newX = clientX - startX;
    setCurrentX(newX);
    
    const cardElement = document.getElementById('swipe-card');
    if (cardElement) {
      const rotation = newX * 0.1;
      cardElement.style.transform = `translateX(${newX}px) rotate(${rotation}deg)`;
      
      if (newX > 50) {
        cardElement.style.boxShadow = '0 10px 20px rgba(76, 175, 80, 0.3)';
      } else if (newX < -50) {
        cardElement.style.boxShadow = '0 10px 20px rgba(244, 67, 54, 0.3)';
      }
    }
  }, [isDragging, startX]);

  const handleDragEnd = useCallback((): void => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    const cardElement = document.getElementById('swipe-card');
    
    if (Math.abs(currentX) > threshold) {
      const direction = currentX > 0 ? 1 : -1;
      
      if (cardElement) {
        cardElement.style.transition = 'all 0.3s ease';
        cardElement.style.transform = `translateX(${direction * 500}px) rotate(${direction * 30}deg)`;
        cardElement.style.opacity = '0';
      }
      
      setTimeout(() => {
        if (direction > 0) {
          swipeRight();
        } else {
          swipeLeft();
        }
        setCurrentX(0);
      }, 300);
    } else {
      if (cardElement) {
        cardElement.style.transition = 'all 0.3s ease';
        cardElement.style.transform = 'translateX(0) rotate(0)';
        cardElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }
      setCurrentX(0);
    }
  }, [isDragging, currentX, swipeLeft, swipeRight]);

  const currentPost: Post | null = getCurrentPost();
  const stats = getStats();

  if (error) {
    return (
      <div className="error-container">
        <p>Ошибка: {error}</p>
        <button onClick={() => void initialize()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="swipe-container">
      {isLoading && currentIndex === 0 ? (
        <div className="loading">Загрузка...</div>
      ) : currentPost ? (
        <>
          <div 
            className="card-container"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              id="swipe-card"
              className="card"
              style={{
                transform: `translateX(${currentX}px)`,
                transition: isDragging ? 'none' : 'all 0.3s ease'
              }}
            >
              {currentPost.file_url && (
                <img 
                  src={currentPost.file_url} 
                  alt="Post image"
                  className="card-image"
                  draggable={false}
                />
              )}
              <div className="card-info">
                <div className="card-tags">
                  {(currentPost.tags || '').split(' ').slice(0, 10).map((tag: string) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-meta">
                  <span>ID: {currentPost.id}</span>
                  <span>Рейтинг: {currentPost.rating || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="controls">
            <button onClick={swipeLeft} className="btn-dislike">
              ❌ NOPE
            </button>
            <button onClick={swipeRight} className="btn-like">
              ❤️ LIKE
            </button>
          </div>
          
          <div className="stats">
            <p>👍 {stats.totalLikes} | 👎 {stats.totalDislikes} | Осталось: {stats.remainingPosts}</p>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>Нет доступных постов</p>
          <button onClick={() => void initialize()}>Обновить</button>
        </div>
      )}
      
      {isLoading && currentIndex > 0 && (
        <div className="loading-more">Подгрузка...</div>
      )}
    </div>
  );
};

export default SwipeUI;