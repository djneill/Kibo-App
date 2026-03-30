'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";
import { ROUTES } from "@/data/constants";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Kibo Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href={ROUTES.HOME}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Products
          </Link>

          <Link
            href={ROUTES.CART}
            className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <Badge count={totalItems} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
