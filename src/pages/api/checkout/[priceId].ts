import { getURL } from "@/src/core/utils";
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
    line_items: [{ price, quantity: 1 }],
    success_url: `${getURL()}/success`,
    cancel_url: `${getURL()}/pricing`,
  });
  res.send({ id: session.id });
}
