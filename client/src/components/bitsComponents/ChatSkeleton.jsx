const ChatItemSkeleton = ({ count = 2 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 p-3.5 rounded animate-pulse"
        >
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Name + Time */}
            <div className="flex justify-between items-center mb-1">
              <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-3 w-10 bg-slate-300 dark:bg-slate-700 rounded" />
            </div>

            {/* Message + Badge */}
            <div className="flex justify-between items-center mt-1">
              <div className="h-3 w-40 bg-slate-300 dark:bg-slate-700 rounded" />
              <div className="h-5 w-5 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatItemSkeleton;
