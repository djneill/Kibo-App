const SkeletonCard = () => (
  <div className="flex flex-col rounded-lg border border-gray-200 overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-56 w-full" />
    <div className="flex flex-col gap-3 p-4">
      <div className="bg-gray-200 h-4 rounded w-3/4" />
      <div className="bg-gray-200 h-4 rounded w-1/2" />
      <div className="bg-gray-200 h-4 rounded w-1/4 mt-1" />
      <div className="bg-gray-200 h-9 rounded w-full mt-2" />
    </div>
  </div>
);

export default SkeletonCard;
