import PromoCard from "@/src/products/components/PromoCard";
import SubscriberCard from "@/src/products/components/SubscriberCard";
import { supabase } from "@/supabase";
import { Product, ProductContent } from "@/types";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { GetStaticProps } from "next";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  product: Product;
};
const ProductPage: FC<Props> = ({ product }) => {
  const [productContent, setProductContent] = useState<ProductContent | null>(
    null
  );
  const supabaseClient = useSupabaseClient();
  const session = useSession();
  useEffect(() => {
    const getProductContent = async () => {
      const { data } = await supabaseClient
        .from("product_content")
        .select("*")
        .eq("id", product.product_content_id)
        .single();
      setProductContent(data);
    };

    getProductContent();
  }, [supabaseClient]);
  // console.log(productContent);
  return (
    <section className="product-section">
      <article className="product">
        <div className="product-wrap">
          {productContent?.download_url && (
            <a
              href={`/assets/${productContent.download_url}`}
              download
              className="download-link large-button"
            >
              <span className="large-button-text">Download</span>
            </a>
          )}
          {productContent?.video_url ? (
            <ReactPlayer controls url={productContent.video_url} />
          ) : (
            <Image
              width={1000}
              height={300}
              src={`/assets/${product.slug}.png`}
              alt={product.name}
            />
          )}
        </div>
        <section>
          <header>
            <h3>{product.name}</h3>
          </header>
          <section>
            <div>
              <p>{product.description}</p>
            </div>
          </section>
        </section>
        <section>{session ? <SubscriberCard /> : <PromoCard />}</section>
      </article>
    </section>
  );
};

export default ProductPage;

export const getStaticPaths = async () => {
  let { data: products, error } = await supabase
    .from("products")
    .select("slug");
  const paths = products?.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  let { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.log(error);
    return { props: {} };
  }
  return { props: { product } };
};
