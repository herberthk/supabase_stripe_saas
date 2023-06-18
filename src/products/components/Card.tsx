import { Product } from "@/types";
import Link from "next/link";
import { FC } from "react";

type Props = {
  product: Product;
};
const ProductCard: FC<Props> = ({ product }) => {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <img src={`/assets/${product.slug}.png`} alt={product.name} />
      </Link>
      <header>
        <p>{product.name}</p>
      </header>
      <footer>
        <Link href={`/products/${product.slug}`} className="more">
          See more
        </Link>
        <div>
          <span className="pill">{product.category}</span>
        </div>
      </footer>
    </article>
  );
};
export default ProductCard;
