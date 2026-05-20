import { motion } from "framer-motion";

import { Post } from "@/utils/types/swipeTypes";

import "@/styles/swipeCard.css";

interface SwipeCardProps {
  post: Post;
  swipeDirection: "left" | "right" | null;
}

export default function SwipeCard({ post, swipeDirection }: SwipeCardProps) {
  const getAnimation = () => {
    if (swipeDirection === "left") {
      return { x: -500, opacity: 0, rotate: -10 };
    }
    
    if (swipeDirection === "right") {
      return { x: 500, opacity: 0, rotate: 10 };
    }

    return { x: 0, opacity: 1, rotate: 0 };
  };

  return (
    <motion.div
      key={post.id}
      className="swipeCard"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      animate={getAnimation()}
      transition={{ duration: 0.3 }}
      // whileTap={{ cursor: 'grabbing' }}
    >
      <div className="swiperCard-imageContainer">
        <img
          src={post.sample_url}
          alt={""}
        />
      </div>
    
      <div className="swipeCard-tagsContainer">
        {(post.tags || '').split(' ').slice(0, 10).map((tag: string) => (
          <span key={tag} className="swipeCard-tagsContainer-tag">{tag}</span>
        ))}
      </div>

      <div className="nopeHint">
        NOPE
      </div>

      <div className="likeHint">
        LIKE
      </div>
    </motion.div>
  );
}