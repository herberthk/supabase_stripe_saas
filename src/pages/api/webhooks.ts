/* eslint-disable indent */
import { stripe } from "@/src/pricing/utils/stripe";
import { supabase, supbaseAdmin } from "@/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event: Stripe.Event;
  try {
    const rawBody = await getRawBody(req, { limit: "2mb" });
    event = await stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      signingSecret
    );
  } catch (error) {
    console.log("webhook signature veryfication failed");
    return res.status(400).end();
  }
  // console.log(event);
  try {
    switch (event.type) {
      case "customer.subscription.updated":
        await updateSubscription(event);
        break;
      case "customer.subscription.deleted":
        await deleteSubscription(event);
        break;
      default:
        break;
    }
    res.send({ success: true });
  } catch (error) {
    //@ts-ignore
    console.log(error.message);
    res.send({ success: false });
  }
}

async function updateSubscription(event: Stripe.Event) {
  const subscription = event.data.object;
  //@ts-ignore
  const stripe_customer_id = subscription.customer;
  //@ts-ignore
  const subscription_status = subscription.status;
  //@ts-ignore
  const price = subscription.items.data[0].price.id;
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("stripe_customer_id", stripe_customer_id)
    .single();
  if (profile) {
    const updatedSubscription = {
      subscription_status,
      price,
    };
    await supabase
      .from("profile")
      .update(updatedSubscription)
      .eq("stripe_customer_id", stripe_customer_id);
  } else {
    const customer = await stripe.customers.retrieve(stripe_customer_id);
    //@ts-ignore
    const name = customer.name;
    //@ts-ignore
    const email = customer.email;
    const newProfile = {
      name,
      email,
      stripe_customer_id,
      subscription_status,
      price,
    };
    // console.log("new user", newProfile);
    await supbaseAdmin.auth.admin
      .createUser({
        email,
        email_confirm: true,
        user_metadata: newProfile,
      })
      .catch((err) => console.log("error creating user", err));
    // console.log("data returned", data);
    // console.log("err returned", error);
  }
}
async function deleteSubscription(event: Stripe.Event) {
  const subscription = event.data.object;
  //@ts-ignore
  const stripe_customer_id = subscription.customer;
  //@ts-ignore
  const subscription_status = subscription.status;

  const deletedSubscription = {
    subscription_status,
    price: null,
  };
  await supabase
    .from("profile")
    .update(deletedSubscription)
    .eq("stripe_customer_id", stripe_customer_id);
}
