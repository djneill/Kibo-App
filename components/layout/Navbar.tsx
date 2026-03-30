'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";
import { ROUTES } from "@/data/constants";
import styles from "./Navbar.module.css";
import { PiShoppingCartBold } from "react-icons/pi";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className={styles.navbar}>
      <Link href={ROUTES.HOME} className={styles.logo}>
        <div style={{
          backgroundColor: '#00b4d8',
          color: 'white',
          borderRadius: '12px',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}>
          K
        </div>
        Kibo App
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link
          href={ROUTES.CART}
          className={styles.cartButton}
          aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
        >
          <PiShoppingCartBold size={24} />
          <Badge count={totalItems} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
