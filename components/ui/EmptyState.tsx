import Button from "@/components/ui/Button";
import styles from "@/app/cart/Cart.module.css";

interface EmptyStateCTA {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
  cta?: EmptyStateCTA;
}

const EmptyState = ({ icon, message, cta }: EmptyStateProps) => (
  <div className={styles.emptyState}>
    <span className={styles.emptyIcon}>{icon}</span>
    <p className={styles.emptyTitle}>{message}</p>
    {cta && (
      <Button variant="primary" size="lg" onClick={cta.onClick}>
        {cta.label}
      </Button>
    )}
  </div>
);

export default EmptyState;
