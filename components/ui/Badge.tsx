import styles from "../layout/Navbar.module.css";

interface BadgeProps {
  count: number;
}

const Badge = ({ count }: BadgeProps) => {
  if (count === 0) return null;

  return (
    <span key={count} className={styles.badge}>
      {count > 99 ? "99+" : count}
    </span>
  );
};

export default Badge;
