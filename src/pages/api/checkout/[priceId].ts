import { SITE_URL } from "@/src/core/utils";
import { stripe } from "@/src/pricing/utils/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const price = req.query?.priceId as string;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    // @ts ignore
    line_items: [{ price, quantity: 1 }],
    success_url: `${SITE_URL}/success`,
    cancel_url: `${SITE_URL}/pricing`,
  });
  res.send({ id: session.id });
}
