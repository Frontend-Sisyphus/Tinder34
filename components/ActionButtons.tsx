import { motion } from "framer-motion";

import { Heart, X, RotateCcw } from "lucide-react";

import "@/styles/actionButtons.css";

interface ActionButtonsProps {
  onNope: () => void;
  onLike: () => void;
  onUndo: () => void;
}

export default function ActionButtons({ onNope, onLike, onUndo }: ActionButtonsProps) {
  return (
    <div className="actionButtons">
      <div className="actionButtons-container">
        <motion.button
          onClick={onNope}
          className="actionButtons-container-button dislikeButton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={24} />
        </motion.button>

        <motion.button
          onClick={onUndo}
          className="actionButtons-container-button skipButton"
          whileHover={{ scale: 1.1, rotate: -180 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
        </motion.button>

        <motion.button
          onClick={onLike}
          className="actionButtons-container-button likeButton"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={24} />
        </motion.button>
      </div>
    </div>
  );
}