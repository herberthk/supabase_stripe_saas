import { GetStaticProps } from "next";
import { stripe } from "../pricing/utils/stripe";
import { FC } from "react";
import { Plan } from "@/types";
import Plans from "../pricing/components/Plans";
import Benefits from "../pricing/components/Benefits";

type Props = {
  plans: Plan[];
};
const PricingPage: FC<Props> = ({ plans }) => {
  //   console.log("plans", plans);
  return (
    <div className="grid-halves h-screen-navbar">
      <Plans plans={plans} />
      <Benefits />
    </div>
  );
};

export default PricingPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data: prices } = await stripe.prices.list();
  const plans = [];
  for (const price of prices) {
    //@ts-ignore
    const product = await stripe.products.retrieve(price.product);
    plans.push({
      name: product.name,
      id: price.id,
      price: price?.unit_amount! / 100,
      interval: price.recurring?.interval,
    });
  }

  return { props: { plans } };
};
