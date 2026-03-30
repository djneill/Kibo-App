interface BadgeProps {
  count: number;
}

const Badge = ({ count }: BadgeProps) => {
  if (count === 0) return null;

  return (
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default Badge;
