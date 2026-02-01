import React, { useMemo } from "react";

// --- SINGLE MESSAGE ---
const SkeletonMessage = ({ isSender, width }) => {
  const bubbleHeight = 70;

  return (
    <div className={`flex flex-col w-full ${isSender ? "items-end" : "items-start"}`}>
      {/* Dynamic width container */}
      <div className="relative" style={{ width: `${width}%` }}>
        {/* Bubble with sharp bottom corner */}
        <div
          className={`relative overflow-hidden px-4 py-3 flex flex-col gap-2
            ${isSender 
                ? "bg-blue-200 dark:bg-blue-800 rounded-t-2xl rounded-l-2xl rounded-br-none" // Sharp bottom-right
                : "bg-gray-200 dark:bg-gray-700 rounded-t-2xl rounded-r-2xl rounded-bl-none" // Sharp bottom-left
            }`}
          style={{ height: `${bubbleHeight}px` }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>

          {/* Message Text Placeholder (Darker/Higher Contrast) */}
          <div className={`h-2.5 w-full rounded-full relative z-10 
            ${isSender ? "bg-blue-400/60" : "bg-gray-400/60"}`}></div>
          <div className={`h-2.5 w-2/3 rounded-full relative z-10 
            ${isSender ? "bg-blue-400/60" : "bg-gray-400/60"}`}></div>

          {/* Time/Status Placeholder (Lighter/Subtle) */}
          <div className={`h-1.5 w-8 rounded-full self-end mt-auto relative z-10 
            ${isSender ? "bg-blue-300/40" : "bg-gray-300/40"}`}></div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SKELETON COMPONENT ---
export default function MessagesSkeleton({ count = 8 }) {
  // Generate random widths once to prevent flickering on re-renders
  const messageData = useMemo(() => {
    return Array.from({ length: count }).map((_, idx) => ({
      isSender: idx % 2 !== 0,
      // Random width between 35% and 65%
      width: Math.floor(Math.random() * (40 - 35 + 1) + 35),
    }));
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 0.5s linear infinite;
        }
      `}</style>

      <div className="flex flex-col w-full p-4 gap-3 bg-transparent">
        {messageData.map((msg, idx) => (
          <SkeletonMessage 
            key={idx} 
            isSender={msg.isSender} 
            width={msg.width}
          />
        ))}
      </div>
    </>
  );
}