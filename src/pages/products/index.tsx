import ProductCard from "@/src/products/components/Card";
import { supabase } from "@/supabase";
import { Product } from "@/types";
import { GetStaticProps } from "next";
import { FC } from "react";

type Props = {
  products: Product[];
};
const ProductsPage: FC<Props> = ({ products }) => {
  //   console.log(products);
  return (
    <>
      <div className="section bg-blue">
        <div className="container">
          <div className="section-intro">
            <h1>The latest products</h1>
          </div>
        </div>
      </div>
      <div className="section small">
        <div className="container">
          <ul className="product-card-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;

export const getStaticProps: GetStaticProps = async () => {
  let { data: products, error } = await supabase.from("products").select("*");
  return {
    props: { products },
  };
};
