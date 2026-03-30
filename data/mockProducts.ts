import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials in the main compartment.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fAn1SQ4pL._AC_UX679_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Womens Cotton Jacket",
    price: 56.99,
    description:
      "Great outerwear jacket for Spring/Autumn/Winter, suitable for many occasions such as working, hiking, camping, mountain climbing.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg",
    rating: { rate: 2.6, count: 235 },
  },
];
