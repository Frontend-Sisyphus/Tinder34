import { SwipeStats } from "@/utils/types/swipeTypes";

import { Info } from "lucide-react";

import "@/styles/sidebar.css";

interface SidebarProps {
  showStats: boolean;
  onToggle: () => void;
  stats: SwipeStats;
}

export default function Sidebar({ showStats, onToggle }: SidebarProps) {
  return (
    <aside
      className={`sidebar ${
        showStats ? "sidebarOpen" : "sidebarClosed"
      }`}
    >
      <div className="sidebar-content">
        <button
          onClick={onToggle}
          className="sidebar-content-toggleButton"
        >
          <Info size={24} />
        </button>
      </div>
    </aside>
  );
}