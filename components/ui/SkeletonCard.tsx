import styles from "@/components/product/ProductListing.module.css";

const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage} />
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonLine} style={{ width: '75%' }} />
      <div className={styles.skeletonLine} style={{ width: '50%' }} />
      <div className={styles.skeletonLine} style={{ width: '40%', marginTop: 'auto' }} />
      <div className={styles.skeletonButton} />
    </div>
  </div>
);

export default SkeletonCard;
